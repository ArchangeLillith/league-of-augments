import { useContext, useEffect, useState } from "react";
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
	const { authState, setAuthState, logoutFromAuthState } =
		useContext(AuthContext);

	const navigate = useNavigate();
	const [ready, setReady] = useState(false);
	const [firstPlace, setFirstPlace] = useState<Champion[]>([]);
	const [wonWith, setWonWith] = useState<Champion[]>([]);
	const [played, setPlayed] = useState<Champion[]>([]);
	const [wantToPlay, setWantToPlay] = useState<Champion[]>([]);
	const [uncategorized, setUncategorized] = useState<Champion[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [hasSavedOnce, setHasSavedOnce] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);

	//A hackey way to make sure we don't accidentally overwrite the database with the initilization blank values
	useEffect(() => {
		if (ready && !hasSavedOnce) {
			setHasSavedOnce(true);
		}
	}, [ready]);
	//Second half of that hackey solution
	useEffect(() => {
		if (!ready || hasSavedOnce === false) return;
		saveChamps();
	}, [firstPlace, wonWith, played, wantToPlay, uncategorized, ready]);

	//The useEffect that filters the champs into the correct places. Filters the champ return from external API by the saved data from the user
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
	}, [authState.userData]);

	//Function to save the champs to the database
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
		} catch {
			console.error("Something went wrong saving your champs :(");
		}
	};

	//Onclick to redirect to the champion's page
	const toChampPage = (champ: Champion) => {
		navigate(`/champ/${champ.name}/`, { state: champ });
	};

	//Drag handler, moves a champ from one place to another and updates authState as well so that data doesn't go stale
	const handleDragEnd = (result: DropResult) => {
		if (!result.destination || searchTerm) return;
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

		// Sync updated values to authState
		setAuthState((prev) => ({
			...prev,
			champsFirstPlace:
				destination.droppableId === "firstPlace" ||
				source.droppableId === "firstPlace"
					? lists.firstPlace.map((c) => c.name)
					: prev.champsFirstPlace,
			champsWon:
				destination.droppableId === "wonWith" ||
				source.droppableId === "wonWith"
					? lists.wonWith.map((c) => c.name)
					: prev.champsWon,
			champsPlayed:
				destination.droppableId === "played" || source.droppableId === "played"
					? lists.played.map((c) => c.name)
					: prev.champsPlayed,
			champsWanted:
				destination.droppableId === "wantToPlay" ||
				source.droppableId === "wantToPlay"
					? lists.wantToPlay.map((c) => c.name)
					: prev.champsWanted,
		}));
	};

	const filterChamps = (champs: Champion[]) =>
		champs.filter((champ) =>
			champ.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

	//Logs out the user and wipes their token from local storage
	const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		logoutFromAuthState();
		navigate("/");
	};

	const sortChamps = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		setFirstPlace((prev) =>
			[...prev].sort((a, b) => a.name.localeCompare(b.name))
		);
		setWonWith((prev) =>
			[...prev].sort((a, b) => a.name.localeCompare(b.name))
		);
		setPlayed((prev) => [...prev].sort((a, b) => a.name.localeCompare(b.name)));
		setWantToPlay((prev) =>
			[...prev].sort((a, b) => a.name.localeCompare(b.name))
		);
		setUncategorized((prev) =>
			[...prev].sort((a, b) => a.name.localeCompare(b.name))
		);
	};
	//Helper to reduce amount of code, renders the boxes
	const renderCategory = (
		title: string,
		droppableId: string,
		champs: Champion[]
	) => {
		return (
			<Droppable droppableId={droppableId}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className="droppable-container"
					>
						<p className="home-page-subtitle">{title}</p>
						<div className="champ-container">
							{champs.map((champ, index) => (
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

	//Our body of the page!
	return (
		<div className={`home-page-container ${searchTerm ? "no-drag" : ""}`}>
			{ready && (
				<DragDropContext onDragEnd={handleDragEnd}>
					<div className="home-top-section">
						<div className="search-with-tooltip">
							<input
								type="text"
								placeholder="Search a champ..."
								value={searchTerm}
								onChange={(e) => {
									const val = e.target.value;
									setSearchTerm(val);
									if (val) {
										setShowTooltip(true);
										setTimeout(() => setShowTooltip(false), 4500);
									}
								}}
								className="search-input"
							/>
							{searchTerm && showTooltip && (
								<div className="search-tooltip">
									Dragging and dropping breaks when searching, sorry!
								</div>
							)}
						</div>
						<button className="gold-button" onClick={sortChamps}>
							Alphebetize!
						</button>
						<button className="gold-button" onClick={() => navigate("/items")}>
							Item Search
						</button>
						<button
							className="gold-button"
							onClick={() => navigate("/augment-alchemy")}
						>
							Build Helper
						</button>
						<div className="home-page-subtitle">
							First Place: <span className="margin-2">{firstPlace.length}</span>
						</div>
						<button className="gold-button" onClick={logout}>
							Log Out
						</button>
					</div>
					{renderCategory(
						"~First Place~",
						"firstPlace",
						filterChamps(firstPlace)
					)}
					{renderCategory(
						"Champions Won With",
						"wonWith",
						filterChamps(wonWith)
					)}
					{renderCategory("Champions Played", "played", filterChamps(played))}
					{renderCategory(
						"Want to Win With",
						"wantToPlay",
						filterChamps(wantToPlay)
					)}
					{renderCategory(
						"Uncategorized",
						"uncategorized",
						filterChamps(uncategorized)
					)}
				</DragDropContext>
			)}
		</div>
	);
};

export default HomePage;
