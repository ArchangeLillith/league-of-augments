import { SetStateAction } from "react";
import AugSearchBar from "./AugSearchBar";
import { PageDataType } from "./augmentAlchemy.utils";
import ItemIcon from "./ItemIcon";

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
		<div className={`${childKey} augment-panel`}>
			<div className="augment-selection">
				<AugSearchBar
					pageData={pageData}
					setPageData={setPageData}
					childKey={childKey}
				/>
			</div>
			<div className="item-box">
				{pageData.suggestedItems[childKey] && (
					<>
						{pageData.suggestedItems[childKey].map((item) => (
							<ItemIcon item={item} />
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default AugmentPanel;
