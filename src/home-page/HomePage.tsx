import { useContext, useEffect, useRef, useState } from "react";
import { Champion, fetchChampions } from "../services/fetchChamps";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from "@hello-pangea/dnd";

const HomePage = () => {
	const [ready, setReady] = useState(false);

	const { authState } = useContext(AuthContext);
	const navigate = useNavigate();
	const [firstPlace, setFirstPlace] = useState<Champion[]>([]);
	const [wonWith, setWonWith] = useState<Champion[]>([]);
	const [played, setPlayed] = useState<Champion[]>([]);
	const [wantToPlay, setWantToPlay] = useState<Champion[]>([]);
	const [uncategorized, setUncategorized] = useState<Champion[]>([]);
	const [saveMessage, setSaveMessage] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");

	const saveTimeout = useRef<number | null>(null);

	useEffect(() => {
		if (saveTimeout.current) clearTimeout(saveTimeout.current);
		saveTimeout.current = setTimeout(() => {
			saveChamps();
		}, 2000);
	}, [firstPlace, wonWith, played, wantToPlay, uncategorized]);

	useEffect(() => {
		const setup = async () => {
			const champReturn = await fetchChampions();
			if (!authState.userData) return;

			const { champsFirstPlace, champsWon, champsPlayed, champsWanted } =
				authState;

			setFirstPlace(
				champReturn.filter((c) => champsFirstPlace.includes(c.name))
			);
			setWonWith(champReturn.filter((c) => champsWon.includes(c.name)));
			setPlayed(champReturn.filter((c) => champsPlayed.includes(c.name)));
			setWantToPlay(champReturn.filter((c) => champsWanted.includes(c.name)));

			const allTracked = new Set([
				...champsFirstPlace,
				...champsWon,
				...champsPlayed,
				...champsWanted,
			]);
			setUncategorized(champReturn.filter((c) => !allTracked.has(c.name)));
			setReady(true);
		};
		setup();
	}, [authState]);

	const showSaveMessage = (message: string) => {
		setSaveMessage(message);
		setTimeout(() => {
			setSaveMessage(null);
		}, 3000); // disappear after 3 seconds
	};

	const saveChamps = async () => {
		const dto = {
			user_id: authState.userData?.id,
			champs_won: wonWith.map((a) => a.name),
			champs_first_place: firstPlace.map((a) => a.name),
			champs_wanted: wantToPlay.map((a) => a.name),
			champs_played: played.map((a) => a.name),
		};

		try {
			const res = await fetch(`/api/users/save`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(dto),
			});
			if (!res.ok) throw new Error("Failed to save augments");
			showSaveMessage("✅ Saved!");
		} catch {
			showSaveMessage("❌ Auto save error");
		}
	};

	const toChampPage = (champ: Champion) => {
		navigate(`/${champ.name}/`, { state: champ });
	};

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const { source, destination } = result;

		const lists = {
			firstPlace: [...firstPlace],
			wonWith: [...wonWith],
			played: [...played],
			wantToPlay: [...wantToPlay],
			uncategorized: [...uncategorized],
		};

		const sourceList = lists[source.droppableId as keyof typeof lists];
		const destList = lists[destination.droppableId as keyof typeof lists];

		const [movedChamp] = sourceList.splice(source.index, 1);
		destList.splice(destination.index, 0, movedChamp);

		const setters = {
			firstPlace: setFirstPlace,
			wonWith: setWonWith,
			played: setPlayed,
			wantToPlay: setWantToPlay,
			uncategorized: setUncategorized,
		};

		setters[source.droppableId as keyof typeof setters](sourceList);
		setters[destination.droppableId as keyof typeof setters](destList);
	};

	const renderCategory = (
		title: string,
		droppableId: string,
		champs: Champion[]
	) => {
		const filteredChamps = champs.filter((champ) =>
			champ.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		return (
			<Droppable droppableId={droppableId}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className="droppable-container"
					>
						<p className="home-title">{title}</p>
						<div className="champ-container">
							{filteredChamps.map((champ, index) => (
								<Draggable
									draggableId={`champ-${champ.name}`}
									index={index}
									key={champ.name}
								>
									{(provided) => (
										<div
											onClick={() => toChampPage(champ)}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className="draggable-champ"
										>
											<img
												src={`https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/${champ.image.full}`}
												alt={champ.name}
												width={50}
												height={50}
											/>
										</div>
									)}
								</Draggable>
							))}
						</div>
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		);
	};

	return (
		<div className="page-container">
			<div
				className={`
					save-message
					${saveMessage ? "save-message--visible" : "save-message--hidden"}
					${
						saveMessage?.includes("error")
							? "save-message--error"
							: "save-message--success"
					}
				`}
			>
				{saveMessage}
			</div>
			{ready ? (
				<DragDropContext onDragEnd={handleDragEnd}>
					<input
						type="text"
						placeholder="Search a champ..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="champ-search-input"
					/>
					{renderCategory("First Place", "firstPlace", firstPlace)}
					{renderCategory("Champions Won With", "wonWith", wonWith)}
					{renderCategory("Champions Played", "played", played)}
					{renderCategory("Want to Win With", "wantToPlay", wantToPlay)}
					{renderCategory("Uncategorized", "uncategorized", uncategorized)}
				</DragDropContext>
			) : (
				<p>Loading champs...</p>
			)}
		</div>
	);
};

export default HomePage;
