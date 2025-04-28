import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Augment, ChampPageInitilizer, ChampPageState } from "../utils/types";
import { fetchAugments } from "../services/fetchAugments";
import { Build } from "../utils/types";
import { AuthContext } from "../context/AuthProvider";
import { fetchBuilds, writeNewBuild } from "../services/fetchBuilds";
import TooltipWrapper from "../componenets/TooltipWrapper";
import AugmentTile from "../componenets/AugmentTile";
import { RiQuillPenAiFill } from "react-icons/ri";
import SaveMessage from "./components/SaveMessage";
import {
	changeBuild,
	resetSelected,
	saveTitle,
	showSaveMessage,
} from "./champPage.utils";

const ChampPage = () => {
	// Context & routing
	const { authState } = useContext(AuthContext);
	const { state } = useLocation();
	const navigate = useNavigate();
	const titleRef = useRef<HTMLInputElement>(null);

	// Guard: return if state is invalid
	const championName = state?.name;
	const champImage = state?.image?.full;
	if (!championName || !champImage) {
		return <div>Error: Missing champion data</div>;
	}

	//We only use references, we never need this to change except for the initial set
	const [allAugs, setAllAugs] = useState<Augment[]>([]);
	//A state for the page, toggles for visibility and controls for the UI as well as houses the data behind the page
	const [champPageState, setChampPageState] =
		useState<ChampPageState>(ChampPageInitilizer);

	// Refs
	const hasFetched = useRef(false);

	// Derived aug lists
	const goldAugs = useMemo(
		() => allAugs.filter((aug) => aug.tier === "Gold"),
		[allAugs]
	);
	const silverAugs = useMemo(
		() => allAugs.filter((aug) => aug.tier === "Silver"),
		[allAugs]
	);
	const prismaticAugs = useMemo(
		() => allAugs.filter((aug) => aug.tier === "Prismatic"),
		[allAugs]
	);

	// Initial data fetch
	useEffect(() => {
		if (hasFetched.current || !authState.userData?.id) return;
		hasFetched.current = true;

		const getInitialData = async () => {
			//Get all the builds based on usuer id and champ name
			const builds: Build[] = await fetchBuilds(
				championName,
				authState.userData!.id
			);

			//Get all the augments
			const augments = await fetchAugments();

			//Set the states
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
		//call the function, we have to do this cause it's an await inside of a useEffect
		getInitialData();
	}, [authState.userData?.id, championName]);

	//Handles focusing the title input when it becomes avaliable on isEditing state change
	useEffect(() => {
		if (titleRef.current) {
			titleRef.current.focus();
		}
	}, [champPageState.isEditing]);

	//The save effect that runs when a current build changes or when the selected augs change. This was debounced but we had some issueed so I just pulled that off, knowing that there are going to be a LOT more db calls, but in the grand scheme of things not many people are going to be using this page. This ALSO notably runs after the title is updated as the currentBuild is updated with the new title, meaning this is the only place saveBuild is called other than creating a new build, where we call and save the build before  creating the new one
	useEffect(() => {
		saveBuild();
	}, [champPageState.currentBuild, champPageState.selectedAugs]);

	//build save function called fromt he above useeffect
	const saveBuild = async () => {
		//If we haven't fetched or we don't have a user don't run
		if (!hasFetched.current || !authState.userData?.id) return;

		const newDTO = {
			build_id: champPageState.currentBuild.build_id,
			user_id: authState.userData.id,
			champ_name: championName,
			name: champPageState.currentBuild.name,
			newAugs: champPageState.selectedAugs.map((a) => a.augment_id),
		};

		try {
			const res = await fetch(`/api/builds/save`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newDTO),
			});
			if (!res.ok) throw new Error("Save failed");
			showSaveMessage("✅ Saved!", setChampPageState);
			return true;
		} catch {
			showSaveMessage("❌ Auto save error", setChampPageState);
			return false;
		}
	};

	//The aug handler for adding an augment to the selectedAugs
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

	//Add build function that runs onclick
	const addBuild = async () => {
		//Save the current build
		const buildSave = await saveBuild();
		//If that failed, don't let them move forward
		if (!buildSave) {
			setChampPageState((prev) => ({
				...prev,
				saveMessage: "❌ Error: Something went wrong while saving!",
			}));
			return;
		}
		//This calls to a service, makes a new build and returns all builds for the current user and champion
		const newAllBuilds: Build[] = await writeNewBuild(
			championName,
			authState.userData!.id
		);

		//Get ahold of the last index that's the last build added, the one with the largedst build ID
		const newBuild = newAllBuilds[newAllBuilds.length - 1];
		//Set state to the new builds and make the new build the current one
		setChampPageState((prev) => ({
			...prev,
			allBuilds: newAllBuilds,
			currentBuild: newBuild,
			title: newBuild.name,
			selectedAugs: [],
		}));
	};

	if (champPageState.pageLoading) return <div>Loading...</div>;

	return (
		<div>
			<SaveMessage saveMessage={champPageState.saveMessage} />

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
					<div className="title-box">
						<h1>{champPageState.currentBuild.name}</h1>
						<button
							onClick={() => {
								setChampPageState((prev) => ({
									...prev,
									isEditing: true,
								}));
							}}
							className="quill-btn"
						>
							<RiQuillPenAiFill />
						</button>
					</div>
				) : (
					<form
						className="title-box"
						onSubmit={(e) => {
							e.preventDefault();
							saveTitle(champPageState, setChampPageState);
						}}
					>
						<input
							value={champPageState.title}
							ref={titleRef}
							className="title-input"
							onChange={(e) =>
								setChampPageState((prev) => ({
									...prev,
									title: e.target.value,
								}))
							}
						/>
						<button type="submit" className="quill-btn">
							<RiQuillPenAiFill />
						</button>
					</form>
				)}

				{champPageState.allBuilds.length > 1 && (
					<select
						onChange={(e) => changeBuild(e, champPageState, setChampPageState)}
					>
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
					<h3 className="selected-augs-title">Selected Augments:</h3>
					<button
						className="reset-btn"
						onClick={() => resetSelected(setChampPageState)}
					>
						Reset Augments
					</button>
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
