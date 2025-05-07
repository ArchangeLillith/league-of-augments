import React from "react";
import { toggleAug } from "../champPage.utils";
import TooltipWrapper from "../../components/TooltipWrapper";
import { SelectedAugmentPanelProps } from "../../utils/interfaces";

const SelectedAugmentPanel: React.FC<SelectedAugmentPanelProps> = ({
	state,
	setState,
}) => {
	return (
		<>
			{state.selectedAugs.length > 0 ? (
				<div className="selected-augs">
					{state.selectedAugs.map((aug) => (
						<div
							className={`selected-aug-background ${aug.tier}`}
							key={aug.augment_id}
						>
							<TooltipWrapper tooltipText={`${aug.description}`}>
								<button
									className="btn-aug selected"
									onClick={() => toggleAug(aug, state, setState)}
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
		</>
	);
};

export default SelectedAugmentPanel;
