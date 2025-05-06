import AugSearchBar from "./AugSearchBar";
import ItemIcon from "../componenets/ItemIcon";
import { AugmentPanelProps } from "../utils/types";

const AugmentPanel: React.FC<AugmentPanelProps> = ({
	pageData,
	setPageData,
	childKey,
}) => {
	return (
		<div className="augment-panel-border">
			<div className={`${childKey} augment-panel`}>
				<div className="augment-selection">
					<AugSearchBar
						pageData={pageData}
						setPageData={setPageData}
						childKey={childKey}
					/>
				</div>
				{pageData.suggestedItems[childKey] && (
					<div className="item-container">
						<>
							{pageData.suggestedItems[childKey].map((item, index) => {
								while (index < pageData.displayNumber) {
									return (
										<ItemIcon
											item={item}
											key={item.item_id}
											augment={pageData.selectedAugments[childKey]}
											itemPage={false}
										/>
									);
								}
							})}
						</>
					</div>
				)}
			</div>
		</div>
	);
};

export default AugmentPanel;
