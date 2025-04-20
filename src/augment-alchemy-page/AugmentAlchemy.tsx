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
import { useModal } from "../modalContext/ModalContext";

const AugmentAlchemy = () => {
	const [pageData, setPageData] = useState<PageDataType>(initializePageData);
	const [allItems, setAllItems] = useState<ItemType[]>([]);
	const panelArray = [1, 2, 3, 4, 5, 6];
	const navigate = useNavigate();
	const { showModal, hideModal } = useModal();

	useEffect(() => {
		const fetchData = async () => {
			const items = await fetchItems(true);
			const augments = await fetchAugments(true);
			setPageData((prev) => ({ ...prev, augments }));
			setAllItems(items);
		};
		fetchData();
	}, []);

	useEffect(() => {
		//We'll make a copy of the current items to modify
		const newSuggestedItems = { ...pageData.suggestedItems };

		//Loop to see which panel we're doing
		for (let i = 1; i <= 6; i++) {
			//Get the key for the panel
			const key = `panel${i}` as keyof typeof pageData.selectedAugments;
			//Easy handle on the selected augments
			const selected = pageData.selectedAugments[key];

			//Now we can filter for the panel we're on if everything is defined and there
			if (selected && selected.tags && selected.tags.length > 0) {
				newSuggestedItems[key] = filterItems(selected, allItems, pageData.showPrismatics);
			} else {
				newSuggestedItems[key];
			}
		}

		//Set the state with the copy we modified!
		setPageData((prev) => ({
			...prev,
			suggestedItems: {
				...prev.suggestedItems,
				...newSuggestedItems,
			},
		}));
	}, [pageData.selectedAugments]);

	function advancedOptions() {
		showModal(
			<div className="modal">
				<h2>AdvancedOptions</h2>
				<button onClick={hideModal}>Close</button>
			</div>
		);
	}
	function togglePrismatics() {
		setPageData((prev) => ({
			...prev,
			showPrismatics: !pageData.showPrismatics,
		}));
	}
	function gemGlossary() {
		showModal(
			<div className="modal">
				<h2>Gem Glossary</h2>
				<button onClick={hideModal}>Close</button>
			</div>
		);
	}
	function tagGlossary() {
		showModal(
			<div className="modal">
				<h2>Tag Glossary</h2>
				<button onClick={hideModal}>Close</button>
			</div>
		);
	}

	return (
		<div className="augment-alchemy-page">
			<div className="augment-alchemy-header">
				<button className="home-button" onClick={() => navigate("/home")}>
					Home
				</button>
				<button className="modal-button" onClick={gemGlossary}>
					Gem Glossary
				</button>
				<div>
					<label htmlFor="prismatic-toggle">Hide Prismatics</label>
					<input
						id="prismatic-toggle"
						type="checkbox"
						onChange={togglePrismatics}
					/>
				</div>
				<div>{/*Styling div*/}</div>
				<h1 className="augment-alchemy-title">~Augment Alchemy~</h1>
				<button className="modal-button" onClick={advancedOptions}>
					Advanced Options
				</button>
				<button className="modal-button" onClick={tagGlossary}>
					Tag Glossary
				</button>
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
