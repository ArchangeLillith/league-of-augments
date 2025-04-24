import { useEffect, useState } from "react";
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

// Section metadata

export function gemGlossary(
	showModal: (content: React.ReactNode) => void,
	hideModal: () => void
) {
	const sectionMeta = {
		stats: {
			tags: statTags,
			title: "Stats",
			subtitle: "Inherent stats that come with items",
			stats: true,
		},
		effects: {
			tags: effectsTags,
			title: "Effects",
			subtitle: "Describes the extra stuff done other than stats",
			stats: false,
		},
		misc: {
			tags: miscTags,
			title: "Misc",
			subtitle: "Tags that don't fit other categories",
			stats: false,
		},
		role: {
			tags: roleTags,
			title: "Role",
			subtitle: "Defined by the role of the champ",
			stats: false,
		},
		playstyle: {
			tags: playstyleTags,
			title: "Playstyle",
			subtitle: "Descriptions of style of play",
			stats: false,
		},
		scalings: {
			tags: scalingsTags,
			title: "Scalings",
			subtitle: "Denotes that there's a point to build more of something",
			stats: false,
		},
	};
	const gems = Object.keys(sectionMeta);

	showModal(
		<>
			<h2 className="glossary-title">Gem Glossary</h2>
			<div className="gem-box">
				{gems.map((gem) => (
					<div className="gem-tile" key={gem}>
						<label htmlFor={`glossary-${gem}`}>{gem}</label>
						<img id={`glossary-${gem}`} src={`/gems/${gem}.png`} />
					</div>
				))}
			</div>
			<button onClick={hideModal}>Close</button>
		</>
	);
}

export function advancedOptions(
	showModal: (content: React.ReactNode) => void,
	hideModal: () => void
) {
	showModal(
		<>
			<h2>Advanced Options</h2>
			<div>Coming soon!</div>
			<button onClick={hideModal}>Close</button>
		</>
	);
}

export function tagGlossary(
	showModal: (content: React.ReactNode) => void,
	hideModal: () => void
) {
	showModal(
		<>
			<h2 className="glossary-title">Tag Glossary</h2>
			<div className="scrollable-container">
				<TagGlossaryDisplay />
			</div>
			<button onClick={hideModal}>Close</button>
		</>
	);
}

const TagGlossaryDisplay = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filteredTags, setFilteredTags] = useState(() => ({
		stats: statTags,
		effects: effectsTags,
		misc: miscTags,
		role: roleTags,
		playstyle: playstyleTags,
		scalings: scalingsTags,
	}));

	useEffect(() => {
		if (!searchTerm) {
			// Reset if search is cleared
			setFilteredTags({
				stats: statTags,
				effects: effectsTags,
				misc: miscTags,
				role: roleTags,
				playstyle: playstyleTags,
				scalings: scalingsTags,
			});
			return;
		}

		const lowerSearch = searchTerm.toLowerCase();
		setFilteredTags({
			stats: statTags.filter((tag) => tag.toLowerCase().includes(lowerSearch)),
			effects: effectsTags.filter((tag) =>
				tag.toLowerCase().includes(lowerSearch)
			),
			misc: miscTags.filter((tag) => tag.toLowerCase().includes(lowerSearch)),
			role: roleTags.filter((tag) => tag.toLowerCase().includes(lowerSearch)),
			playstyle: playstyleTags.filter((tag) =>
				tag.toLowerCase().includes(lowerSearch)
			),
			scalings: scalingsTags.filter((tag) =>
				tag.toLowerCase().includes(lowerSearch)
			),
		});
	}, [searchTerm]);

	const sectionMeta = {
		stats: {
			tags: filteredTags.stats,
			title: "Stats",
			subtitle: "Inherent stats that come with items",
			stats: true,
		},
		effects: {
			tags: filteredTags.effects,
			title: "Effects",
			subtitle: "Describes the extra stuff done other than stats",
			stats: false,
		},
		misc: {
			tags: filteredTags.misc,
			title: "Misc",
			subtitle: "Tags that don't fit other categories",
			stats: false,
		},
		role: {
			tags: filteredTags.role,
			title: "Role",
			subtitle: "Defined by the role of the champ",
			stats: false,
		},
		playstyle: {
			tags: filteredTags.playstyle,
			title: "Playstyle",
			subtitle: "Descriptions of style of play",
			stats: false,
		},
		scalings: {
			tags: filteredTags.scalings,
			title: "Scalings",
			subtitle: "Denotes that there's a point to build more of something",
			stats: false,
		},
	};
	return (
		<>
			<input
				type="text"
				placeholder="Search a tag..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="champ-search-input"
			/>
			{Object.entries(sectionMeta).map(([key, meta]) => (
				<Accordion key={key} sectionName={key} meta={meta} />
			))}
		</>
	);
};

const Accordion = ({
	sectionName,
	meta,
}: {
	sectionName: string;
	meta: any;
}) => (
	<div className={`accordion ${sectionName}`}>
		<h2 className="tag-title">{meta.title}</h2>
		<div className="tag-subtitle">{meta.subtitle}</div>
		<div className={`${sectionName}-tiles`}>
			{meta.tags.map((tag: string) => (
				<AccordionItem
					key={tag}
					tag={tag}
					stats={meta.stats}
					description={tagDescriptions[tag as ETagNames]}
				/>
			))}
		</div>
	</div>
);

const AccordionItem = ({
	tag,
	description,
	stats = false,
}: {
	tag: string;
	description: string;
	stats?: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleAccordion = () => setIsOpen((prev) => !prev);

	return (
		<div
			className={`accordion-item ${stats ? "stats" : ""} ${
				isOpen ? "open" : ""
			}`}
		>
			<button className="accordion-header" onClick={toggleAccordion}>
				{tag}
				{!stats && <span className="accordion-icon">{isOpen ? "-" : "+"}</span>}
			</button>
			{!stats && (
				<div
					className="accordion-content"
					style={{ maxHeight: isOpen ? "fit-content" : "0" }}
				>
					<p>{description}</p>
				</div>
			)}
		</div>
	);
};
