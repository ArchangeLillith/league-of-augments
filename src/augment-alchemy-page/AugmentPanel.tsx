import { SetStateAction } from "react";
import AugSearchBar from "./AugSearchBar";
import { PageDataType } from "./augmentAlchemy.utils";

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
		<div className={`${childKey}`}>
			<div className="augment-selection">
				<AugSearchBar
					pageData={pageData}
					setPageData={setPageData}
					childKey={childKey}
				/>
				<img />
			</div>
			<div className="item-box">
				{/* We can reuse the component we'll make for the parent page here but sytle based on .item-box to differenciate */}
			</div>
		</div>
	);
};

export default AugmentPanel;
