import { Augment } from "../utils/types";
import TooltipWrapper from "./TooltipWrapper";

interface AugmentTileProps {
	aug: Augment;
	toggleAug: (aug: Augment) => void;
}

const AugmentTile: React.FC<AugmentTileProps> = ({ aug, toggleAug }) => {
	return (
		<div className={`btn-aug-background ${aug.tier}`} key={aug.augment_id}>
			<TooltipWrapper tooltipText={`${aug.description}`}>
				<button
					className="btn-aug"
					onClick={() => toggleAug(aug)}
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
