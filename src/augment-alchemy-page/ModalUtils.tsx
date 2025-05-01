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

//Tag glossary parent
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
	//States
	const [searchTerm, setSearchTerm] = useState<string>("");
	//Object state to keep track of the tags
	const [filteredTags, setFilteredTags] = useState(() => ({
		stats: statTags,
		effects: effectsTags,
		role: roleTags,
		playstyle: playstyleTags,
		scalings: scalingsTags,
		misc: miscTags,
	}));

	//Our useeffcet that runs onchange for the search
	useEffect(() => {
		if (!searchTerm) {
			// Reset if search is cleared
			setFilteredTags({
				stats: statTags,
				effects: effectsTags,
				role: roleTags,
				playstyle: playstyleTags,
				scalings: scalingsTags,
				misc: miscTags,
			});
			return;
		}

		//Make the search lowercase
		const lowerSearch = searchTerm.toLowerCase();
		//We the set the states in the state object to a filtered list based on the search params that were captured onchange
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

	//This is the magic, we have the state here so when the filter runs this state will tell the component to rerender
	const sectionMeta = {
		stats: {
			tags: filteredTags.stats,
			title: "Stats",
			subtitle: "Inherent stats that come with items",
			stats: true,
		},
		scalings: {
			tags: filteredTags.scalings,
			title: "Scalings",
			subtitle: "Denotes that there's a point to build more of something",
			stats: false,
		},
		effects: {
			tags: filteredTags.effects,
			title: "Effects",
			subtitle: "Describes the extra stuff done other than stats",
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
		misc: {
			tags: filteredTags.misc,
			title: "Misc",
			subtitle: "Tags that don't fit other categories",
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
				className="search-input"
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

	//Seprate return cause we want the stats to look different as they don't have descriptions
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
