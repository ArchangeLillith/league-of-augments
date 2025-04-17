import { useState, useEffect } from "react";
import AugmentPanel from "./AugmentPanel";
import { fetchAugments } from "../services/fetchAugments";
import {
	filterItems,
	initializePageData,
	PageDataType,
} from "./augmentAlchemy.utils";
import ItemIcon from "./ItemIcon";
import { useNavigate } from "react-router-dom";
import { fetchItems } from "../services/items";
import { ItemType } from "../utils/types";

const AugmentAlchemy = () => {
	const [pageData, setPageData] = useState<PageDataType>(initializePageData);
	const [allItems, setAllItems] = useState<ItemType[]>([]);
	const panelArray = [1, 2, 3, 4, 5, 6];
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const items = await fetchItems(true, true);
			const augments = await fetchAugments(true, true);
			setPageData((prev) => ({ ...prev, augments }));
			setAllItems(items);
		};
		fetchData();
	}, []);

	useEffect(() => {
		//This is where we're gunna put the "something changed, refilter!" logic
		const selected = pageData.selectedAugments.panel1;
		if (
			selected === null ||
			selected.tags.length < 1 ||
			selected.tags[0] === undefined
		) {
			return;
		}
		const suggestedItems = filterItems(selected, allItems);
		setPageData((prev) => ({
			...prev,
			suggestedItems: {
				...prev.suggestedItems,
				panel1: suggestedItems,
			},
		}));
	}, [
		//can we shorthand this? I imagine so, but like, does that work...? and should we be doing it...?
		pageData.selectedAugments.panel1,
		pageData.selectedAugments.panel2,
		pageData.selectedAugments.panel3,
		pageData.selectedAugments.panel4,
		pageData.selectedAugments.panel5,
		pageData.selectedAugments.panel6,
	]);

	function showModal() {
		console.log("MODAL");
	}

	return (
		<div className="augment-alchemy-page">
			{/* <div>{JSON.stringify(pageData.suggestedItems.panel1)}</div>
			<div>{JSON.stringify(allItems)}</div> */}
			<div className="augment-alchemy-header">
				<button onClick={() => navigate("/home")}>Home</button>
				<h1>~AugmentAlchemy~</h1>
				<button onClick={showModal}>Advanced Options</button>
			</div>
			<div className="augment-panel-container">
				{panelArray.map((index) => (
					<AugmentPanel
						key={`augment-panel-${index}`}
						pageData={pageData}
						setPageData={setPageData}
						childKey={`panel${index}` as keyof PageDataType["selectedAugments"]}
					/>
				))}
			</div>
			<div className="bottom-container">{/* <ItemIcon /> */}</div>
		</div>
	);
};
export default AugmentAlchemy;
