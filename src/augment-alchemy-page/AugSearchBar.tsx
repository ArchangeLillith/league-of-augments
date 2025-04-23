import { SetStateAction, useState } from "react";
import { Augment } from "../utils/types";
import { gemMap, PageDataType } from "./augmentAlchemy.utils";
import AugmentTile from "../componenets/AugmentTile";
import TooltipWrapper from "../componenets/TooltipWrapper";

interface AugSearchBarProps {
	pageData: PageDataType;
	setPageData: React.Dispatch<SetStateAction<PageDataType>>;
	childKey: keyof PageDataType["selectedAugments"];
}

const AugSearchBar: React.FC<AugSearchBarProps> = ({
	pageData,
	setPageData,
	childKey,
}) => {
	const [inputValue, setInputValue] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);

	const augments = pageData.augments;

	const filteredAugments = augments.filter((augment: Augment) =>
		augment.name.toLowerCase().includes(inputValue.toLowerCase())
	);

	const handleSelect = (augment: Augment) => {
		setInputValue(augment.name);
		setPageData((prev) => ({
			...prev,
			selectedAugments: { ...prev.selectedAugments, [childKey]: augment },
		}));
		setShowDropdown(false);
	};

	if (pageData.selectedAugments[childKey]?.name) {
		const augment = pageData.selectedAugments[childKey];
		const reversedTags = augment.tags.reverse();
		return (
			<div className="selected-augment-panel">
				<button
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
					<AugmentTile aug={augment} toggleAug={() => {}} />
					<div className="aug-gem-box">
						{reversedTags.map((tag) => (
							<>
								<div className={`settings ${gemMap[tag]}`}>
									{tag && (
										<div className={`tinted-gem ${tag.replace(/\s+/g, "-")}`}>
											<TooltipWrapper tooltipText={tag} gem={true}>
												<img
													src={`/gems/${gemMap[tag]}.png`}
													className={`base-gem ${gemMap[tag]}`}
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
							className="augment-input-li"
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
