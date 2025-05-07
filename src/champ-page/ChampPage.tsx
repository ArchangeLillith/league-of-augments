import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Augment, ChampPageInitilizer, ChampPageState } from "../utils/types";
import { fetchAugments } from "../services/fetchAugments";
import { Build } from "../utils/types";
import { AuthContext } from "../context/AuthProvider";
import { fetchBuilds, writeNewBuild } from "../services/fetchBuilds";

import SaveMessage from "../componenets/SaveMessage";
import { changeBuild, resetSelected } from "./champPage.utils";
import { showSaveMessage } from "../utils/saveMessage";
import { AugmentHTML } from "./componenets/AugmentHtml";
import { TitleBox } from "./componenets/TitleBox";
import SelectedAugmentPanel from "./componenets/SelectedAugmentPanel";

const ChampPage = () => {
	// Context & routing
	const { authState } = useContext(AuthContext);
	const { state } = useLocation();
	const navigate = useNavigate();

	// Refs and constants
	const titleRef = useRef<HTMLInputElement>(null);
	const hasFetched = useRef(false);
	const championName = state?.name;
	const champImage = state?.image?.full;

	//States
	//We only use references, we never need this to change except for the initial set
	const [allAugs, setAllAugs] = useState<Augment[]>([]);
	//A state for the page, toggles for visibility and controls for the UI as well as houses the data behind the page
	const [champPageState, setChampPageState] =
		useState<ChampPageState>(ChampPageInitilizer);

	// Guards for non user and if we're missing data
	useEffect(() => {
		if (authState.userData === null || !authState.authenticated) {
			<div>You need to be logged in to see this page~</div>;
		}
	}, [authState]);
	//We're missing info
	if (!championName || !champImage) {
		return <div>Error: Missing champion data</div>;
	}

	// Initial data fetch
	useEffect(() => {
		//If we have fetched or if we don't have a userId we don't run this
		if (hasFetched.current || !authState.userData?.id) return;
		//Set the fetch ref to true so we dknow we don't need to run this again
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

	//The save effect that runs when a current build changes or when the selected augs change. This was debounced but we had some issueed so I just pulled that off, knowing that there are going to be a LOT more db calls, but in the grand scheme of things not many people are going to be using this page. This ALSO notably runs after the title is updated as the currentBuild is updated with the new title, meaning this is the only place saveBuild is called other than creating a new build, where we call and save the build before creating the new one
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
			showSaveMessage("❌Error: Auto save error", setChampPageState);
			return false;
		}
	};

	/**
	 * Runs onclick and creates a new build in the database
	 * @returns the new build object for the user to modify
	 */
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
	//We're loading
	if (champPageState.pageLoading) return <div>Loading...</div>;
	return (
		<div className="champ-page">
			<SaveMessage saveMessage={champPageState.saveMessage} />

			{/* Champion & Build UI */}
			<div className="top-champ-container">
				<div className="flex-row">
					<button
						className="gold-button champ-page"
						onClick={() => navigate("/home")}
					>
						<FaHome className="btn-icon" />
					</button>
					<img
						src={`https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/${champImage}`}
						alt={championName}
						className="champ-icon"
					/>
				</div>
				<TitleBox
					titleRef={titleRef}
					state={champPageState}
					setState={setChampPageState}
				/>

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
					<button className="gold-button" onClick={addBuild}>
						Add Build
					</button>
				</div>
			</div>

			{/* Selected Augments */}
			<div className="container-selected-aug">
				<div className="selected-augs-top">
					<h3 className="selected-augs-title">Selected Augments:</h3>
					<button
						className="reset-btn gold-button"
						onClick={() => resetSelected(setChampPageState)}
					>
						Reset Augments
					</button>
				</div>
				<SelectedAugmentPanel
					state={champPageState}
					setState={setChampPageState}
				/>
			</div>

			{/* Available Augments */}
			<AugmentHTML
				allAugs={allAugs}
				state={champPageState}
				setState={setChampPageState}
			/>
		</div>
	);
};

export default ChampPage;
