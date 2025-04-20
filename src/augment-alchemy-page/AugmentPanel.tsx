import { SetStateAction } from "react";
import AugSearchBar from "./AugSearchBar";
import { PageDataType } from "./augmentAlchemy.utils";
import ItemIcon from "../componenets/ItemIcon";

interface AugmentPanelProps {
	pageData: PageDataType;
	setPageData: React.Dispatch<SetStateAction<PageDataType>>;
	childKey: keyof PageDataType["selectedAugments"];
}

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
				<div className="item-container">
					{pageData.suggestedItems[childKey] && (
						<>
							{pageData.suggestedItems[childKey].map((item) => (
								<ItemIcon
									item={item}
									key={item.item_id}
									augment={pageData.selectedAugments[childKey]}
								/>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default AugmentPanel;
