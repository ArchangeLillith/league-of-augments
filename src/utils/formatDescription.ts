const keywordClassMap: Record<string, string> = {
	AP: "keyword-ap",
	"Ability Power": "keyword-ap",
	AD: "keyword-ad",
	"Attack Damage": "keyword-ad",
	Health: "keyword-health",
	Heal: "keyword-health",
	Armor: "keyword-armor",
	"Magic Resist": "keyword-mr",
	"Move Speed": "keyword-move",
	"Attack Speed": "keyword-as",
	Omnivamp: "keyword-vamp",
	Lifesteal: "keyword-vamp",
	"Ability Haste": "keyword-haste",
	Cooldowns: "keyword-haste",
	Cooldown: "keyword-haste",
	Crit: "keyword-crit",
	Tenacity: "keyword-tenacity",
	Mana: "keyword-mana",
	Shield: "keyword-shield",
	Shields: "keyword-shield",
	Healing: "keyword-heal",
	"On-Hit": "keyword-onhit",
	Juice: "keyword-juice",
	Dragon: "keyword-dragon",
	"True Damage": "keyword-truedmg",
	Ultimate: "keyword-ultimate",
	Curse: "keyword-curse",
	Automatically: "keyword-autocast",
	Range: "keyword-range",
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
