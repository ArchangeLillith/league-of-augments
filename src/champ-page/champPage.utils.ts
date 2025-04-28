import { SetStateAction } from "react";
import { Build, ChampPageState } from "../utils/types";
import { fetchOneBuild } from "../services/fetchBuilds";

//Resets handler for selected augs
export const resetSelected = (
	setChampPageState: React.Dispatch<SetStateAction<ChampPageState>>
) =>
	setChampPageState((prev) => ({
		...prev,
		selectedAugs: [],
	}));

//onclick save handler
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

//The onchange handler for swapping builds
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


