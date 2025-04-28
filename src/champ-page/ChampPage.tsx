import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Augment } from "../utils/types";
import { fetchAugments } from "../services/fetchAugments";
import { Build } from "../utils/types";
import { AuthContext } from "../context/AuthProvider";
import { fetchBuilds, writeNewBuild } from "../services/fetchBuilds";
import TooltipWrapper from "../componenets/TooltipWrapper";
import AugmentTile from "../componenets/AugmentTile";
import { RiQuillPenAiFill } from "react-icons/ri";

const ChampPage = () => {
	// Context & routing
	const { authState } = useContext(AuthContext);
	const { state } = useLocation();
	const navigate = useNavigate();

	const championName = state?.name;
	const champImage = state?.image?.full;

	// Guard: return if state is invalid
	if (!championName || !champImage) {
		return <div>Error: Missing champion data</div>;
	}

	// State
	type ChampPageState = {
		saveMessage: string | null;
		currentBuild: Build;
		allBuilds: Build[];
		pageLoading: boolean;
		isEditing: boolean;
		title: string;
		selectedAugs: Augment[];
	};

	const ChampPageInitilizer = {
		saveMessage: null,
		currentBuild: { name: "", augments: [], items: [], build_id: 0 },
		allBuilds: [],
		pageLoading: true,
		isEditing: false,
		title: "",
		selectedAugs: [],
	};
	//We only use references, we never need this to change except for the initial set
	const [allAugs, setAllAugs] = useState<Augment[]>([]);
	//A state for the page, toggles for visibility and controls for the UI as well as houses the data behind the page
	const [champPageState, setChampPageState] =
		useState<ChampPageState>(ChampPageInitilizer);

	// Refs
	const hasFetched = useRef(false);

	// Derived aug lists
	const goldAugs = allAugs.filter((aug) => aug.tier === "Gold");
	const silverAugs = allAugs.filter((aug) => aug.tier === "Silver");
	const prismaticAugs = allAugs.filter((aug) => aug.tier === "Prismatic");

	// Initial data fetch
	useEffect(() => {
		if (hasFetched.current || !authState.userData?.id) return;
		hasFetched.current = true;

		const getInitialData = async () => {
			const builds: Build[] = await fetchBuilds(
				championName,
				authState.userData!.id
			);

			const augments = await fetchAugments();
			setAllAugs(augments);
			setChampPageState((prev: ChampPageState) => ({
				...prev,
				currentBuild: builds[0],
				allBuilds: builds,
				pageLoading: false,
				title: builds[0].name,
				selectedAugs: builds[0].augments,
			}));
		};

		getInitialData();
	}, [authState.userData?.id, championName]);

	useEffect(() => {
		saveBuild();
	}, [champPageState.currentBuild, champPageState.selectedAugs]);

	const saveBuild = async () => {
		if (!authState.userData?.id) return;

		const newDTO = {
			build_id: champPageState.currentBuild.build_id,
			user_id: authState.userData.id,
			champ_name: championName,
			name: champPageState.title,
			newAugs: champPageState.selectedAugs.map((a) => a.augment_id),
		};

		console.log(`Trying to save with this DTO:`, newDTO);

		try {
			const res = await fetch(`/api/builds/save`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newDTO),
			});
			if (!res.ok) throw new Error("Save failed");
			showSaveMessage("✅ Saved!");
			return true;
		} catch {
			showSaveMessage("❌ Auto save error");
			return false;
		}
	};

	const showSaveMessage = (message: string) => {
		setChampPageState((prev) => ({ ...prev, saveMessage: message }));
		setTimeout(
			() => setChampPageState((prev) => ({ ...prev, saveMessage: null })),
			3000
		);
	};

	const toggleAug = (aug: Augment) => {
		//Get a handle on the old augs if there are any
		const oldAugs = champPageState.selectedAugs;
		//Filter through and either remove or add the aug depending on if it's there
		const newAugs = oldAugs.some((a) => a.augment_id === aug.augment_id)
			? oldAugs.filter((a) => a.augment_id !== aug.augment_id)
			: [...oldAugs, aug];

		//Set the new augs to the currently selected build
		setChampPageState((prev) => ({
			...prev,
			selectedAugs: newAugs,
		}));
	};

	const resetSelected = () =>
		setChampPageState((prev) => ({
			...prev,
			selectedAugs: [],
		}));

	const addBuild = async () => {
		const buildSave = await saveBuild();
		if (!buildSave) {
			setChampPageState((prev) => ({
				...prev,
				saveMessage: "❌ Error: Something went wrong while saving!",
			}));
			return;
		}
		const newAllBuilds: Build[] = await writeNewBuild(
			championName,
			authState.userData!.id
		);
		//This could be an issue if you're looking for one
		const newBuild = [...newAllBuilds].pop()!;
		setChampPageState((prev) => ({
			...prev,
			allBuilds: newAllBuilds,
			currentBuild: newBuild,
			title: newBuild.name,
			selectedAugs: [],
		}));
	};

	const changeBuild = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const buildId = e.target.value;
		const selectedBuild = champPageState.allBuilds.find(
			(build) => build.build_id === Number(buildId)
		);
		console.log(selectedBuild);
		if (!selectedBuild || selectedBuild === undefined) {
			setChampPageState((prev) => ({
				...prev,
				saveMessage: "❌ Error: Something went wrong in selecting that build",
			}));
		}
		setChampPageState((prev) => {
			if (selectedBuild === undefined) return prev;
			return {
				...prev,
				currentBuild: selectedBuild,
				selectedAugs: selectedBuild.augments,
			};
		});
	};

	const saveTitle = () => {
		console.log("title");
	};

	if (champPageState.pageLoading) return <div>Loading...</div>;

	return (
		<div>
			{/* Save message popup */}
			<div
				className={`save-message
					${champPageState.saveMessage ? "save-message--visible" : "save-message--hidden"}
					${
						champPageState.saveMessage?.includes("error")
							? "save-message--error"
							: "save-message--success"
					}`}
			>
				{champPageState.saveMessage}
			</div>

			{/* Champion & Build UI */}
			<div className="top-champ-container">
				<div className="flex-row">
					<button className="btn-home" onClick={() => navigate("/home")}>
						<FaHome className="btn-icon" />
					</button>
					<img
						src={`https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/${champImage}`}
						alt={championName}
						className="champ-icon"
					/>
				</div>
				{champPageState.currentBuild && !champPageState.isEditing ? (
					<>
						<h1>{champPageState.currentBuild.name}</h1>
						<p>{champPageState.currentBuild.build_id}</p>
						<p>{JSON.stringify(champPageState.currentBuild.augments)}</p>
						<p>{JSON.stringify(champPageState.selectedAugs)}</p>
						<button
							onClick={() =>
								setChampPageState((prev) => ({
									...prev,
									isEditing: true,
								}))
							}
							className="quill-btn"
						>
							<RiQuillPenAiFill />
						</button>
					</>
				) : (
					<>
						<input
							value={champPageState.title}
							onChange={(e) =>
								setChampPageState((prev) => ({
									...prev,
									title: e.currentTarget.value,
								}))
							}
						></input>
						<button onClick={saveTitle} className="quill-btn">
							<RiQuillPenAiFill />
						</button>
					</>
				)}

				{champPageState.allBuilds.length > 1 && (
					<select onChange={(e) => changeBuild(e)}>
						{champPageState.allBuilds.map((build) => (
							<option key={build.build_id} value={build.build_id!.toString()}>
								{build.name}
							</option>
						))}
					</select>
				)}
				<div>
					<button onClick={addBuild}>Add Build</button>
				</div>
			</div>

			{/* Selected Augments */}
			<div className="container-selected-aug">
				<div className="selected-augs-top">
					{/* Styling divs for space */}
					<div></div>
					<div></div>
					<h3 className="selected-augs-title">Selected Augments:</h3>
					<button onClick={resetSelected}>Reset Augments</button>
				</div>
				{champPageState.selectedAugs.length > 0 ? (
					<div className="selected-augs">
						{champPageState.selectedAugs.map((aug) => (
							<div
								className={`selected-aug-background ${aug.tier}`}
								key={aug.augment_id}
							>
								<TooltipWrapper tooltipText={`${aug.description}`}>
									<button
										className="btn-aug-selected"
										onClick={() => toggleAug(aug)}
										id={aug.name}
									>
										<img
											className="aug-icon"
											src={aug.url!}
											alt={aug.name}
											width={20}
											height={20}
										/>
										{aug.name}
									</button>
								</TooltipWrapper>
							</div>
						))}
					</div>
				) : (
					<div className="selected-augs color-muted">
						Click an augment to add it!
					</div>
				)}
			</div>

			{/* Available Augments */}
			<div>
				<div className="container-prismatic">
					{prismaticAugs.map((aug) => (
						<AugmentTile aug={aug} toggleAug={toggleAug} />
					))}
				</div>

				<div className="container-gold">
					{goldAugs.map((aug) => (
						<AugmentTile aug={aug} toggleAug={toggleAug} />
					))}
				</div>

				<div className="container-silver">
					{silverAugs.map((aug) => (
						<AugmentTile aug={aug} toggleAug={toggleAug} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ChampPage;
