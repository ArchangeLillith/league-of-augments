const keywordClassMap: Record<string, string> = {
	AP: "keyword-ap",
	"Ability Power": "keyword-ap",
	"Magic Damage": "keyword-magicdmg",
	"Adaptive Force": "keyword-adaptive",
	AD: "keyword-ad",
	"Attack Damage": "keyword-ad",
	"Physical Damage": "keyword-physdmg",
	Heal: "keyword-health",
	Heals: "keyword-health",
	Health: "keyword-health",
	Healing: "keyword-health",
	Armor: "keyword-armor",
	"Magic Resist": "keyword-mr",
	"Magic Resistance": "keyword-mr",
	"Move Speed": "keyword-move",
	"Attack Speed": "keyword-as",
	Omnivamp: "keyword-vamp",
	Lifesteal: "keyword-vamp",
	"Ability Haste": "keyword-haste",
	Cooldowns: "keyword-haste",
	Cooldown: "keyword-haste",
	Crit: "keyword-crit",
	"Crit Strike": "keyword-crit",
	"Critical Strike": "keyword-crit",
	"Critically Strike": "keyword-crit",
	Mana: "keyword-mana",
	Shield: "keyword-shield",
	Shields: "keyword-shield",
	Shielding: "keyword-shield",
	"On-Hit": "keyword-onhit",
	Juice: "keyword-juice",
	Dragon: "keyword-dragon",
	Burn: "keyword-burn",
	"True Damage": "keyword-truedmg",
	Ultimate: "keyword-ultimate",
	Curse: "keyword-curse",
	Cursed: "keyword-curse",
	Automatically: "keyword-autocast",
	"Auto-Cast": "keyword-autocast",
	Range: "keyword-range",
	Anvil: "keyword-anvil",
	Anvils: "keyword-anvil",
	Lethality: "keyword-lethality",
	"Armor Penetration": "keyword-armourpen",
	"Magic Penetration": "keyword-magicpen",
};

export function formatDescription(text: string): string {
	const keywords = Object.keys(keywordClassMap)
		.sort((a, b) => b.length - a.length)
		.map((k) => k.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&"));

	const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");

	return text.replace(regex, (match) => {
		// Find the key in the original map, case-insensitively
		const originalKey = Object.keys(keywordClassMap).find(
			(key) => key.toLowerCase() === match.toLowerCase()
		);

		const className = originalKey ? keywordClassMap[originalKey] : "";
		return `<span class="${className}">${match}</span>`;
	});
}
