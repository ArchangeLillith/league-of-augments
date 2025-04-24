import { useState } from "react";
import {
	statTags,
	playstyleTags,
	effectsTags,
	scalingsTags,
	roleTags,
	miscTags,
	tagDescriptions,
	ETagNames,
} from "../utils/types";

export function gemGlossary(
	showModal: (content: React.ReactNode) => void,
	hideModal: () => void
) {
	const gems = ["effects", "misc", "playstyle", "role", "scalings", "stats"];
	showModal(
		<div className="modal">
			<h2 className="glossary-title">Gem Glossary</h2>
			<div className="gem-box">
				{gems.map((gem, index) => (
					<div className="gem-tile">
						<label htmlFor={`glossary-${gem}`}>{gems[index]}</label>
						<img id={`glossary-${gem}`} src={`/gems/${gem}.png`} />
					</div>
				))}
			</div>
			<button onClick={hideModal}>Close</button>
		</div>
	);
}

export function tagGlossary(
	showModal: (content: React.ReactNode) => void,
	hideModal: () => void
) {
	showModal(
		<div className="modal">
			<h2 className="glossary-title">Tag Glossary</h2>
			<div className="scrollable-container">
				<TagGlossaryDisplay />
			</div>
			<button onClick={hideModal}>Close</button>
		</div>
	);
}

export function advancedOptions(
	showModal: (content: React.ReactNode) => void,
	hideModal: () => void
) {
	showModal(
		<div className="modal">
			<h2>AdvancedOptions</h2>
			<div>Coming soon!</div>
			<button onClick={hideModal}>Close</button>
		</div>
	);
}

const TagGlossaryDisplay = () => {
	return (
		<div>
			<input placeholder="Search tags..." />
			<div>
				<h2 className="tag-title">Stats</h2>
				<div className="tag-category-description">Inherant stats that come with items</div>
				<br />
				{statTags.map((tag) => (
					<div key={tag}>{tag}</div>
				))}
			</div>
			<div>
				<h2 className="tag-title">Playstyle</h2>
				<div  className="tag-category-description">Descriptions of style of play</div>
				<br />
				{playstyleTags.map((tag) => (
					<div>{tag}</div>
				))}
			</div>
			<div>
				<div>Effects</div>
				<div className="tag-category-description">Describes the extra stuff done other than stats</div>
				<br />
				{effectsTags.map((tag) => (
					<div>{tag}</div>
				))}
			</div>
			<div>
				<h2 className="tag-title">Scalings</h2>
				<div className="tag-category-description">Denotes that there's a point to build more of something</div>
				<br />
				{scalingsTags.map((tag) => (
					<div>{tag}</div>
				))}
			</div>
			<div>
				<h2 className="tag-title">Role</h2>
				<div className="tag-category-description">Defined by the role of the champ</div>
				<br />
				{roleTags.map((tag) => (
					<div>{tag}</div>
				))}
			</div>
			<div>
				<h2 className="tag-title">Misc</h2>
				<div className="tag-category-description">Tags that don't fit other categories</div>
				<br />
				{miscTags.map((tag) => (
					<div>{tag}</div>
				))}
			</div>
		</div>
	);
};

const Accordion = () => {
	return (
		<div className="accordion">
			{playstyleTags.map((tag) => (
				<AccordionItem
					key={tag}
					tag={tag}
					description={tagDescriptions[tag as ETagNames]}
				/>
			))}
		</div>
	);
};

const AccordionItem = ({
	tag,
	description,
}: {
	tag: string;
	description: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={`accordion-item ${isOpen ? "open" : ""}`}>
			<button className="accordion-header" onClick={toggleAccordion}>
				{tag}
				<span className="accordion-icon">{isOpen ? "-" : "+"}</span>
			</button>
			<div
				className="accordion-content"
				style={{ maxHeight: isOpen ? "fit-content" : "0" }}
			>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default Accordion;
