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
				<img />
			</div>
			<div className="item-box">
				<ItemIcon />
			</div>
		</div>
	);
};

export default AugmentPanel;
