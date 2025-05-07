import { SetStateAction } from "react";
import { Augment, Build, ChampPageState } from "../utils/types";
import { fetchOneBuild } from "../services/fetchBuilds";

/**
 * Resets the selected augments to an empty array
 * @param setChampPageState - the setter for the parent state
 * @returns 
 */
export const resetSelected = (
	setChampPageState: React.Dispatch<SetStateAction<ChampPageState>>
) =>
	setChampPageState((prev) => ({
		...prev,
		selectedAugs: [],
	}));

/**
 * Saves the title of the build, only does so in local memory, NOT db!
 * @param champPageState - the parent state
 * @param setChampPageState - the setter for the parent state
 */
export const saveTitle = (
	champPageState: ChampPageState,
	setChampPageState: React.Dispatch<SetStateAction<ChampPageState>>
) => {
	//update the all builds so that the new name is reflected where it should be
	const newAllBuilds = champPageState.allBuilds.map((build) =>
		build.build_id === champPageState.currentBuild.build_id
			? { ...build, name: champPageState.title }
			: build
	);
	//Set the state to reflect the changees made
	setChampPageState((prev) => ({
		...prev,
		allBuilds: newAllBuilds,
		currentBuild: { ...prev.currentBuild, name: prev.title },
		isEditing: false,
	}));
};

/**
 * Handles changing the build when the user chooses another build to edit from the select in a champ page. Fetches the build chosen from the database so it's fresh, updates state for the chosen build as well as overwrites the old data in allBuilds with the fresh DB copy - likely the same, but prevents stale data.
 * @param e - the option that has data tied to the build the user would like to edit
 * @param champPageState - parent state
 * @param setChampPageState - parent state setter
 */
export const changeBuild = async (
	e: React.ChangeEvent<HTMLSelectElement>,
	champPageState: ChampPageState,
	setChampPageState: React.Dispatch<SetStateAction<ChampPageState>>
) => {
	const buildId = Number(e.target.value);
	//destructure because it comes back as an array of one
	const [selectedBuild]: Build[] = await fetchOneBuild(buildId);

	//potential error handler
	if (!selectedBuild) {
		setChampPageState((prev) => ({
			...prev,
			saveMessage: "❌ Error: Something went wrong in selecting that build",
		}));
	}

	//update all builds since we have the fresh data from the database we can ensure data doesn't stale
	const newAllBuilds = champPageState.allBuilds.map((build) =>
		build.build_id === selectedBuild.build_id ? selectedBuild : build
	);

	//Set the chosen build as current and update all builds
	setChampPageState((prev) => {
		if (selectedBuild === undefined) return prev;
		return {
			...prev,
			currentBuild: selectedBuild,
			selectedAugs: selectedBuild.augments,
			allBuilds: newAllBuilds,
			title: selectedBuild.name,
		};
	});
};

/**
 * Adds or removes an augment from the selectedAugs based on if it's there already
 * @param aug - the selected augment we're toggling
 */
export const toggleAug = (
	aug: Augment,
	champPageState: ChampPageState,
	setChampPageState: React.Dispatch<SetStateAction<ChampPageState>>
) => {
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
