import { useState, useEffect } from "react";
import AugmentPanel from "./AugmentPanel";
import { fetchAugments } from "../services/fetchAugments";
import { initializePageData, PageDataType } from "./augmentAlchemy.utils";

const AugmentAlchemy = () => {
	const [pageData, setPageData] = useState<PageDataType>(initializePageData);
	const panelArray = [1, 2, 3, 4, 5, 6];

	useEffect(() => {
		const fetchData = async () => {
			const augments = await fetchAugments(true);
			setPageData((prev) => ({ ...prev, augments }));
		};
		fetchData();
	}, []);

	return (
		<div className="augment-alchemy-page">
			<div className="top-container">
				{panelArray.map((index) => (
					<AugmentPanel
						key={`augment-panel-${index}`}
						pageData={pageData}
						setPageData={setPageData}
						childKey={`panel${index}` as keyof PageDataType["selectedAugments"]}
					/>
				))}
			</div>
			<div className="bottom-container">
				{/* We'll map over an item componenet here */}
			</div>
		</div>
	);
};
export default AugmentAlchemy;
