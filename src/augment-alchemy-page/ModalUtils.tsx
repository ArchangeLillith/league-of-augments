export function gemGlossary(
	showModal: (content: React.ReactNode) => void,
	hideModal: () => void
) {
	const gems = ["effects", "misc", "playstyle", "role", "scalings", "stats"];
	showModal(
		<div className="modal">
			<h2>Gem Glossary</h2>
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
			<h2>Tag Glossary</h2>
			<div>Coming soon!</div>
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
