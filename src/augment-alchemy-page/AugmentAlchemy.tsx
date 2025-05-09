import { useState, useEffect } from "react";
import AugmentPanel from "./AugmentPanel";
import { fetchAugments } from "../services/fetchAugments";
import { filterItems } from "./augmentAlchemy.utils";

import { useNavigate } from "react-router-dom";
import { fetchItems } from "../services/fetchItems";

import { useModal } from "../modalContext/ModalContext";
import { gemGlossary, tagGlossary } from "./ModalUtils";
import { FaHome } from "react-icons/fa";
import AdvancedOptionsModal from "./AdvancedOptionsModal";
import { initializePageData, advancedOptionChoicesInitializer } from "../utils/initializers";
import { PageDataType, AdvancedOptionChoices, ItemType } from "../utils/types";

const AugmentAlchemy = () => {
	const [pageData, setPageData] = useState<PageDataType>(initializePageData);
	const [advancedOptionChoices, setAdvancedOptionsChoices] =
		useState<AdvancedOptionChoices>(advancedOptionChoicesInitializer);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [allItems, setAllItems] = useState<ItemType[]>([]);
	const panelArray = [1, 2, 3, 4, 5, 6];
	const navigate = useNavigate();
	const { showModal, hideModal } = useModal();

	/**
	 * Initial data load with the guard to ensure only users get to this page
	 */
	useEffect(() => {
		const fetchData = async () => {
			const items = await fetchItems(true);
			const augments = await fetchAugments(true);
			setPageData((prev) => ({ ...prev, augments }));
			setAllItems(items);
		};
		fetchData();
	}, []);

	/**
	 * Listens to the augment selection and the show prismatics and re-renders when one of them changes
	 */
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
			readOnlySuggItems: {
				...prev.readOnlySuggItems,
				...newSuggestedItems,
			},
		}));
		//This runs when we select augs and also when we change the prismatic selection state to ensure that on that click the items reflect the new selection
	}, [pageData.selectedAugments, pageData.showPrismatics]);

	/**
	 * Removes any chosen options from the advanced options state
	 */
	const removeAdvancedOptions = () => {
		setPageData((prev) => ({
			...prev,
			advancedOptions: false,
			suggestedItems: {
				...prev.readOnlySuggItems,
			},
		}));
		setAdvancedOptionsChoices(advancedOptionChoicesInitializer);
	};

	/**
	 * Changes the amount of items shown to the user, runs onChange on the select
	 * @param e - the select element that has the value the user wants
	 */
	const changeDisplayNumber = (e: React.ChangeEvent<HTMLSelectElement>) => {
		let chosenNumber = e.target.value;
		setPageData((prev) => ({ ...prev, displayNumber: Number(chosenNumber) }));
	};

	/**
	 * Govern the state of the modal
	 */
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	/**
	 * Handles the show prismatic input box
	 */
	function togglePrismatics() {
		setPageData((prev) => ({
			...prev,
			showPrismatics: !pageData.showPrismatics,
		}));
	}

	return (
		<div className="augment-alchemy-page">
			<div className="augment-alchemy-header">
				<button className="gold-button" onClick={() => navigate("/home")}>
					<FaHome className="home-btn-aa" />
				</button>
				<button className="gold-button" onClick={openModal}>
					Advanced Options
				</button>
				{pageData.advancedOptions && (
					<button className="clear-button" onClick={removeAdvancedOptions}>
						Clear Adv. Options
					</button>
				)}
				<div>
					<label htmlFor="prismatic-toggle">Hide Prismatics</label>
					<input
						id="prismatic-toggle"
						type="checkbox"
						onChange={togglePrismatics}
					/>
				</div>
				<h1 className="augment-alchemy-title">~Augment Alchemy~</h1>
				<select
					className="item-number-select"
					value={pageData.displayNumber}
					onChange={changeDisplayNumber}
				>
					<option>4</option>
					<option>8</option>
					<option>12</option>
					<option>100</option>
				</select>
				<button
					className="gold-button"
					onClick={() => gemGlossary(showModal, hideModal)}
				>
					Gem Glossary
				</button>
				<button
					className="gold-button"
					onClick={() => tagGlossary(showModal, hideModal)}
				>
					Tag Glossary
				</button>
				{/* Styling div */}
				<div></div>
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
			{isModalOpen && (
				<AdvancedOptionsModal
					pageData={pageData}
					setPageData={setPageData}
					advancedOptionChoices={advancedOptionChoices}
					setAdvancedOptionChoices={setAdvancedOptionsChoices}
					onClose={closeModal}
				/>
			)}
		</div>
	);
};
export default AugmentAlchemy;
