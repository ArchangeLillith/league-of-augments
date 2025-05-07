import { useState } from "react";
import AugmentTile from "../components/AugmentTile";
import TooltipWrapper from "../components/TooltipWrapper";
import { gemMap } from "../utils/constants";
import { ETagNames } from "../utils/enums";
import { AugSearchBarProps } from "../utils/interfaces";
import { Augment } from "../utils/types";

const AugSearchBar: React.FC<AugSearchBarProps> = ({
	pageData,
	setPageData,
	childKey,
}) => {
	//Search bar handle
	const [inputValue, setInputValue] = useState("");
	//Dropdown of augments handle
	const [showDropdown, setShowDropdown] = useState(false);

	//Handle on all the augments for ssimplicity
	const augments = pageData.augments;

	/**
	 * Filters the augments in the dropdown list as the user is typing
	 */
	const filteredAugments = augments.filter((augment: Augment) =>
		augment.name.toLowerCase().includes(inputValue.toLowerCase())
	);

	/**
	 * Sets the chosen augment to state and flips the panel from search to show the augment therefore
	 * @param augment - the augment that's being chosen
	 */
	const handleSelect = (augment: Augment) => {
		setInputValue(augment.name);
		setPageData((prev) => ({
			...prev,
			selectedAugments: { ...prev.selectedAugments, [childKey]: augment },
		}));
		setShowDropdown(false);
	};

	/**
	 * This is our return if we have a selected autgment. It shows the augment and the items in the panel
	 */
	if (pageData.selectedAugments[childKey]?.name) {
		//Augment handle for simplicity
		const augment = pageData.selectedAugments[childKey];

		return (
			<div className="selected-augment-panel">
				<button
					className="deselect-aug-button"
					onClick={() => {
						setInputValue("");
						setPageData((prev) => ({
							...prev,
							selectedAugments: { ...prev.selectedAugments, [childKey]: null },
							suggestedItems: { ...prev.suggestedItems, [childKey]: null },
						}));
					}}
				>
					X
				</button>
				<div className="augment-alchemy-tile">
					<AugmentTile aug={augment} state={null} setState={null} />
					<div className="aug-gem-box">
						{augment.tags.map((tag) => (
							<>
								<div className={`settings ${gemMap[tag as ETagNames]}`}>
									{tag && (
										<div className={`tinted-gem ${tag.replace(/\s+/g, "-")}`}>
											<TooltipWrapper tooltipText={tag} gem={true}>
												<img
													src={`/gems/${gemMap[tag as ETagNames]}.png`}
													className={`base-gem ${gemMap[tag as ETagNames]}`}
												/>
											</TooltipWrapper>
										</div>
									)}
								</div>
							</>
						))}
					</div>
				</div>
				{augment.tags.map((tag, i) => {
					if (typeof tag !== "string") {
						if (tag === null) {
						}
						console.warn("Unexpected tag value at index", i, tag);
						return null;
					}
					return <div className={`${tag.replace(/\s+/g, "-")}`}></div>;
				})}
			</div>
		);
	}

	/**
	 * Our return if there's no augment selected, we display the input box for the user to search for an augment to select
	 */
	return (
		<div className="augment-selector-panel">
			<input
				className="augment-input"
				type="text"
				value={inputValue}
				placeholder="Type an augment name..."
				onChange={(e) => {
					setInputValue(e.currentTarget.value);
					setShowDropdown(true);
				}}
				onFocus={() => setShowDropdown(true)}
			/>

			{showDropdown && filteredAugments.length > 0 && (
				<ul className="augment-input-ul">
					{filteredAugments.map((augment: Augment) => (
						<li
							className={`augment-input-li ${augment.tier}`}
							key={augment.augment_id}
							onClick={() => handleSelect(augment)}
						>
							{augment.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default AugSearchBar;
