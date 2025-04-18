export const fetchAugments = async (
	tags = false,
	dev = false
): Promise<any[]> => {
	if (tags && dev) {
		return mockAugments;
	}
	if (tags) {
		const res = await fetch("/api/augments/includeTags");
		const augments = await res.json();
		console.log("Augments and tags in frontend:", augments);
		return augments;
	} else {
		const res = await fetch("/api/augments/");
		const augments = await res.json();
		return augments;
	}
};
const mockAugments = [
	{
		name: "Mind Over Matter",
		augment_id: 1,
		description: "Gain bonus mana and ability haste. Restore mana on takedown.",
		url: "https://league-of-augments.s3.ca-central-1.amazonaws.com/It's_Critical.png",
		tier: "Silver",
		tags: ["Ability Haste", "AP", "On Takedown Effect"],
	},
	{
		name: "Brutal Force",
		augment_id: 2,
		description:
			"Gain attack damage and a burst of movement speed after damaging an enemy champion.",
		url: "https://league-of-augments.s3.ca-central-1.amazonaws.com/Hold_Very_Still.png",
		tier: "Gold",
		tags: ["AD", "Bruiser", "Movement"],
	},
	{
		name: "Cursed Wounds",
		augment_id: 3,
		description:
			"Your damage inflicts Grievous Wounds for 3 seconds. Gain bonus damage against healing enemies.",
		url: "https://league-of-augments.s3.ca-central-1.amazonaws.com/Don't_Chase.png",
		tier: "Silver",
		tags: [],
	},
	{
		name: "Arcane Might",
		augment_id: 4,
		description:
			"Gain a burst of Ability Power every time you cast an ability, stacking up to 10 times.",
		url: "https://league-of-augments.s3.ca-central-1.amazonaws.com/Combo_Master.png",
		tier: "Prismatic",
		tags: ["AP", "Stacking", "Spell Heavy"],
	},
	{
		name: "Colossus Pact",
		augment_id: 5,
		description:
			"Gain a massive amount of health. Deal bonus damage based on max HP.",
		url: "https://league-of-augments.s3.ca-central-1.amazonaws.com/Blood_Brother.png",
		tier: "Gold",
		tags: ["Max Health Scaling", "Bruiser", "Defensive"],
	},
];
