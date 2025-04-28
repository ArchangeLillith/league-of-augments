import { useState, useEffect, useContext } from "react";
import AugmentPanel from "./AugmentPanel";
import { fetchAugments } from "../services/fetchAugments";
import { filterItems } from "./augmentAlchemy.utils";

import { useNavigate } from "react-router-dom";
import { fetchItems } from "../services/items";
import { initializePageData, ItemType, PageDataType } from "../utils/types";
import { useModal } from "../modalContext/ModalContext";
import { gemGlossary, tagGlossary, advancedOptions } from "./ModalUtils";
import { AuthContext } from "../context/AuthProvider";

const AugmentAlchemy = () => {
	const { authState } = useContext(AuthContext);
	const [pageData, setPageData] = useState<PageDataType>(initializePageData);
	const [allItems, setAllItems] = useState<ItemType[]>([]);
	const panelArray = [1, 2, 3, 4, 5, 6];
	const navigate = useNavigate();
	const { showModal, hideModal } = useModal();

	useEffect(() => {
		//Guard to ensure no one gets here that shouldn't, even though it wont' break anyhting I'd rather a user register to use this service
		if (authState.userData === null || !authState.authenticated) {
			navigate("/");
		}

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
				newSuggestedItems[key] = filterItems(
					selected,
					allItems,
					pageData.showPrismatics
				);
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
		//This runs when we select augs and also when we change the prismatic selection state to ensure that on that click the items reflect the new selection
	}, [pageData.selectedAugments, pageData.showPrismatics]);

	function togglePrismatics() {
		setPageData((prev) => ({
			...prev,
			showPrismatics: !pageData.showPrismatics,
		}));
	}

	return (
		<div className="augment-alchemy-page">
			<div className="augment-alchemy-header">
				<button className="home-button" onClick={() => navigate("/home")}>
					Home
				</button>
				<button
					className="modal-button"
					onClick={() => gemGlossary(showModal, hideModal)}
				>
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
				<button
					className="modal-button"
					onClick={() => advancedOptions(showModal, hideModal)}
				>
					Advanced Options
				</button>
				<button
					className="modal-button"
					onClick={() => tagGlossary(showModal, hideModal)}
				>
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

			<div className="bottom-container"></div>
		</div>
	);
};
export default AugmentAlchemy;
