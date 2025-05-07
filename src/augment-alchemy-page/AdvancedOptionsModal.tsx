import { ETagNames } from "../utils/enums";
import { advancedOptionChoicesInitializer } from "../utils/initializers";
import { AdvancedOptionsModalProps, AdvancedOptionChoices } from "../utils/types";
import { applyUserFilters } from "./augmentAlchemy.utils";

const AdvancedOptionsModal: React.FC<AdvancedOptionsModalProps> = ({
	pageData,
	setPageData,
	advancedOptionChoices,
	setAdvancedOptionChoices,
	onClose,
}) => {
	const tagSections = [
		"stats",
		"role",
		"playstyle",
		"effects",
		"scalings",
		"misc",
	] as const;
	//Resets the advanced options state to not contain anything
	const resetAdvancedOptions = () => {
		setAdvancedOptionChoices(advancedOptionChoicesInitializer);
	};

	/**
	 * Toggles the tags in state to be true or false
	 * @param e - the button the user clicked
	 */
	const toggleAdvancedTag = (e: React.ChangeEvent<HTMLInputElement>) => {
		const parentKey = e.target.getAttribute(
			"data-section"
		) as keyof AdvancedOptionChoices;
		const tag = e.target.value as ETagNames;

		setAdvancedOptionChoices((prev) => {
			const section = prev[parentKey] as Record<ETagNames, boolean>;
			return {
				...prev,
				[parentKey]: {
					...section,
					[tag]: !section[tag],
				},
			};
		});
	};

	/**
	 * Calls to the util function that filters all the items through the user selected filters, also closes the modal
	 * Run onClick from the modal close button
	 */
	const closeAndCalculate = () => {
		applyUserFilters(
			advancedOptionChoices,
			pageData,
			setPageData,
			setAdvancedOptionChoices
		);
		onClose();
	};


	return (
		<div className="advanced-options-modal">
			<div className="modal-content">
				<h2 className="advanced-modal-title">Include items with which tags?</h2>
				<div className="left-advanced-modal-box">
					{tagSections.flatMap((section) =>
						Object.entries(advancedOptionChoices[section]).map(
							([tag, isSelected]) =>
								isSelected ? (
									<div key={`${section}-${tag}`} className="tag-box">
										<label htmlFor={tag}>{tag}</label>
									</div>
								) : null
						)
					)}
				</div>
				<div className="scrollable-container">
					<div className="advanced-stat-box">
						<button onClick={resetAdvancedOptions}>Reset</button>
						{tagSections.map((section) => (
							<div key={section}>
								<h3>{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
								{Object.entries(advancedOptionChoices[section]).map(
									([tag, checked]) => (
										<div key={`${section}-${tag}`} className="tag-box">
											<input
												type="checkbox"
												value={tag}
												checked={checked}
												onChange={toggleAdvancedTag}
												data-section={section}
												id={`${section}-${tag}`}
											/>
											<label htmlFor={`${section}-${tag}`}>{tag}</label>
										</div>
									)
								)}
							</div>
						))}
					</div>
				</div>
				<button className="close-btn" onClick={closeAndCalculate}>
					Go!
				</button>
			</div>
		</div>
	);
};

export default AdvancedOptionsModal;