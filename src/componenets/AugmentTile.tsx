import { SetStateAction } from "react";
import { toggleAug } from "../champ-page/champPage.utils";
import { Augment, ChampPageState } from "../utils/types";
import TooltipWrapper from "./TooltipWrapper";

interface AugmentTileProps {
	aug: Augment;
	state: ChampPageState | null;
	setState: React.Dispatch<SetStateAction<ChampPageState>> | null;
}

const AugmentTile: React.FC<AugmentTileProps> = ({ aug, state, setState }) => {
	return (
		<div className={`btn-aug-background ${aug.tier}`} key={aug.augment_id}>
			<TooltipWrapper tooltipText={`${aug.description}`}>
				<button
					className="btn-aug"
					// We don't need the onClick from one of the two parents so this assigns it if needed and doesn't for the other
					onClick={() =>
						state && setState ? toggleAug(aug, state, setState) : undefined
					}
					id={aug.name}
				>
					<img src={aug.url!} width={35} height={35} />
					{aug.name}
				</button>
			</TooltipWrapper>
		</div>
	);
};

export default AugmentTile;
