import { SetStateAction, useMemo } from "react";
import AugmentTile from "../../components/AugmentTile";
import { Augment, ChampPageState } from "../../utils/types";

export const AugmentHTML = ({
	allAugs,
	state,
	setState,
}: {
	allAugs: Augment[];
	state: ChampPageState;
	setState: React.Dispatch<SetStateAction<ChampPageState>>;
}) => {
	// Filtered aug lists
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

	const augmentTiers = {
		silver: silverAugs,
		gold: goldAugs,
		prismatric: prismaticAugs,
	};

	return (
		<div>
			{Object.entries(augmentTiers).map(([key, augArr]) => (
				<div className={`container-${key}`}>
					{augArr.map((aug: Augment) => (
						<AugmentTile aug={aug} state={state} setState={setState} />
					))}
				</div>
			))}
		</div>
	);
};
