import { SetStateAction } from "react";
import {
	AdvancedOptionChoices,
	advancedOptionChoicesInitializer,
	ETagNames,
	PageDataType,
} from "../utils/types";
import { applyUserFilters } from "./augmentAlchemy.utils";

type Props = {
	advancedOptionChoices: AdvancedOptionChoices;
	setAdvancedOptionChoices: React.Dispatch<
		React.SetStateAction<AdvancedOptionChoices>
	>;
	pageData: PageDataType;
	setPageData: React.Dispatch<SetStateAction<PageDataType>>;
	onClose: () => void;

};

const AdvancedOptionsModal: React.FC<Props> = ({
	pageData,
	setPageData,
	advancedOptionChoices,
	setAdvancedOptionChoices,
	onClose,
	
}) => {
	const resetAdvancedOptions = () => {
		setAdvancedOptionChoices(advancedOptionChoicesInitializer);
	};
	const toggleAdvancedTag = (e: React.ChangeEvent<HTMLInputElement>) => {
		const parentKey = e.target.getAttribute(
			"data-section"
		) as keyof AdvancedOptionChoices;
		const tag = e.target.value as ETagNames;

		setAdvancedOptionChoices((prev) => ({
			...prev,
			[parentKey]: {
				...prev[parentKey],
				[tag]: !prev[parentKey][tag],
			},
		}));
	};

	const closeAndCalculate = () => {
		onClose();
		applyUserFilters(advancedOptionChoices, pageData, setPageData);
	};
	return (
		<div className="advanced-options-modal">
			<div className="modal-content">
				<h2 className="advanced-modal-title">Include items with which tags?</h2>
				<div className="left-advanced-modal-box">
					{Object.keys(advancedOptionChoices.stats).map((tag) => (
						<>
							{advancedOptionChoices.stats[
								tag as keyof typeof advancedOptionChoices.stats
							] === true && (
								<div key={tag} className="tag-box">
									<label htmlFor={tag}>{tag}</label>
								</div>
							)}
						</>
					))}
					{Object.keys(advancedOptionChoices.role).map((tag) => (
						<>
							{advancedOptionChoices.stats[
								tag as keyof typeof advancedOptionChoices.stats
							] === true && (
								<div key={tag} className="tag-box">
									<label htmlFor={tag}>{tag}</label>
								</div>
							)}
						</>
					))}
					{Object.keys(advancedOptionChoices.playstyle).map((tag) => (
						<>
							{advancedOptionChoices.stats[
								tag as keyof typeof advancedOptionChoices.stats
							] === true && (
								<div key={tag} className="tag-box">
									<label htmlFor={tag}>{tag}</label>
								</div>
							)}
						</>
					))}
					{Object.keys(advancedOptionChoices.effects).map((tag) => (
						<>
							{advancedOptionChoices.stats[
								tag as keyof typeof advancedOptionChoices.stats
							] === true && (
								<div key={tag} className="tag-box">
									<label htmlFor={tag}>{tag}</label>
								</div>
							)}
						</>
					))}
					{Object.keys(advancedOptionChoices.scalings).map((tag) => (
						<>
							{advancedOptionChoices.stats[
								tag as keyof typeof advancedOptionChoices.stats
							] === true && (
								<div key={tag} className="tag-box">
									<label htmlFor={tag}>{tag}</label>
								</div>
							)}
						</>
					))}
					{Object.keys(advancedOptionChoices.misc).map((tag) => (
						<>
							{advancedOptionChoices.stats[
								tag as keyof typeof advancedOptionChoices.stats
							] === true && (
								<div key={tag} className="tag-box">
									<label htmlFor={tag}>{tag}</label>
								</div>
							)}
						</>
					))}
				</div>
				<div className="scrollable-container">
					<div className="advanced-stat-box">
						{/* Your dynamic tagSections logic here */}
						{/* Sample example */}
						<button onClick={resetAdvancedOptions}>Reset</button>
						<h3>Stats</h3>
						{Object.keys(advancedOptionChoices.stats).map((tag) => (
							<div key={tag} className="tag-box">
								<input
									type="checkbox"
									value={tag}
									checked={
										advancedOptionChoices.stats[
											tag as keyof typeof advancedOptionChoices.stats
										]
									}
									onChange={toggleAdvancedTag}
									data-section="stats"
									id={tag}
								/>
								<label htmlFor={tag}>{tag}</label>
							</div>
						))}
						<h3>Role</h3>
						{Object.keys(advancedOptionChoices.role).map((tag) => (
							<div key={tag} className="tag-box">
								<input
									type="checkbox"
									value={tag}
									checked={
										advancedOptionChoices.role[
											tag as keyof typeof advancedOptionChoices.role
										]
									}
									onChange={toggleAdvancedTag}
									data-section="role"
									id={tag}
								/>
								<label htmlFor={tag}>{tag}</label>
							</div>
						))}
						<h3>Playstyle</h3>
						{Object.keys(advancedOptionChoices.playstyle).map((tag) => (
							<div key={tag} className="tag-box">
								<input
									type="checkbox"
									value={tag}
									checked={
										advancedOptionChoices.playstyle[
											tag as keyof typeof advancedOptionChoices.playstyle
										]
									}
									onChange={toggleAdvancedTag}
									data-section="playstyle"
									id={tag}
								/>
								<label htmlFor={tag}>{tag}</label>
							</div>
						))}
						<h3>Scalings</h3>
						{Object.keys(advancedOptionChoices.scalings).map((tag) => (
							<div key={tag} className="tag-box">
								<input
									type="checkbox"
									value={tag}
									checked={
										advancedOptionChoices.scalings[
											tag as keyof typeof advancedOptionChoices.scalings
										]
									}
									onChange={toggleAdvancedTag}
									data-section="scalings"
									id={tag}
								/>
								<label htmlFor={tag}>{tag}</label>
							</div>
						))}
						<h3>Effects</h3>
						{Object.keys(advancedOptionChoices.effects).map((tag) => (
							<div key={tag} className="tag-box">
								<input
									type="checkbox"
									value={tag}
									checked={
										advancedOptionChoices.effects[
											tag as keyof typeof advancedOptionChoices.effects
										]
									}
									onChange={toggleAdvancedTag}
									data-section="effects"
									id={tag}
								/>
								<label htmlFor={tag}>{tag}</label>
							</div>
						))}
						<h3>Misc</h3>
						{Object.keys(advancedOptionChoices.misc).map((tag) => (
							<div key={tag} className="tag-box">
								<input
									type="checkbox"
									value={tag}
									checked={
										advancedOptionChoices.misc[
											tag as keyof typeof advancedOptionChoices.misc
										]
									}
									onChange={toggleAdvancedTag}
									data-section="misc"
									id={tag}
								/>
								<label htmlFor={tag}>{tag}</label>
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

// export function advancedOptions(
//   showModal: (content: React.ReactNode) => void,
//   hideModal: () => void,
//   advancedOptionChoices: AdvancedOptionChoices,
//   setAdvancedOptionsChoices: React.Dispatch<
//     SetStateAction<AdvancedOptionChoices>
//   >
// ) {
//   const tagSections = [
//     statTags,
//     playstyleTags,
//     miscTags,
//     roleTags,
//     effectsTags,
//     scalingsTags,
//   ];

//   const tagTitle = [
//     "Stats",
//     "Playstyle",
//     "Misc",
//     "Role",
//     "Effects",
//     "Scalings",
//   ];
//   const parentArray = [
//     "stats",
//     "playstyle",
//     "misc",
//     "role",
//     "effects",
//     "scalings",
//   ];
//   const toggleAdvancedTag = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const parentKey = e.target.getAttribute(
//       "data-section"
//     ) as keyof AdvancedOptionChoices;
//     const tag = e.target.value as ETagNames;

//     setAdvancedOptionsChoices((prev) => {
//       console.log("Toggling:", { parentKey, tag });
//       console.log("Current value:", prev[parentKey][tag]);
//       return {
//         ...prev,
//         [parentKey]: {
//           ...prev[parentKey],
//           [tag]: !prev[parentKey][tag],
//         },
//       };
//     });
//   };

//   showModal(
//     <div>
//       <div>
//         <h3>Tags chosen:</h3>
//         <div>{JSON.stringify(advancedOptionChoices.stats)}</div>
//         <br />
//         <div>
//           {JSON.stringify(advancedOptionChoices.stats[ETagNames.AbilityHaste])}
//         </div>
//       </div>
//       <div className="scrollable-container">
//         <h2>Advanced Options</h2>
//         <div className="advanced-stat-box">
//           {tagSections.map((section, index) => (
//             <>
//               <h3>{tagTitle[index]}:</h3>
//               {section.map((tag: string) => {
//                 console.log(`tag:`, tag);
//                 return (
//                   <div className="tag-box">
//                     <input
//                       onChange={toggleAdvancedTag}
//                       id={tag}
//                       type="checkbox"
//                       data-section={parentArray[index]}
//                       value={tag}
//                     ></input>
//                     <label htmlFor={tag}>{tag}</label>
//                   </div>
//                 );
//               })}
//             </>
//           ))}
//         </div>
//         <button onClick={hideModal}>Close</button>
//       </div>
//     </div>
//   );
