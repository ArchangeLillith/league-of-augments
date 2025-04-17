export const fetchItems = async (dev = false): Promise<any[]> => {
	if (dev) {
		return mockItems;
	}
	const res = await fetch("/api/items/");
	console.log(`res`, res);
	const augments = await res.json();
	return augments;
};

const mockItems = [
	{
		name: "Rift Reaper",
		tier: "legendary",
		cost: 3100,
		sell: 2170,
		ability_power: 80,
		ability_haste: 25,
		health: 250,
		magic_pen: 15,
		heal_and_shield_power: 0,
		tags: ["AP", "Ability Haste", "Max Health Scaling"],
		url: "https://league-of-augments.s3.ca-central-1.amazonaws.com/item-icons/Kinkou_Jitte_item.webp",
	},
	{
		name: "Crimson Executioner",
		tier: "legendary",
		cost: 3000,
		sell: 2100,
		attack_damage: 55,
		grievous: 1,
		ability_haste: 15,
		health: 200,
		tags: ["AD", "Grievous", "Bruiser"],
		url: "https://league-of-augments.s3.ca-central-1.amazonaws.com/item-icons/Spectral_Cutlass_item.webp",
	},
	{
		name: "Titan’s Vigor",
		tier: "legendary",
		cost: 3200,
		sell: 2240,
		attack_damage: 40,
		health: 450,
		armour: 30,
		ability_haste: 20,
		tags: ["AD", "Bruiser", "Max Health Scaling"],
		url: "https://league-of-augments.s3.ca-central-1.amazonaws.com/item-icons/Wordless_Promise_item.png",
	},
	{
		name: "Soulrend Censer",
		tier: "prismatic",
		cost: 3400,
		sell: 2380,
		ability_power: 100,
		ability_haste: 30,
		mana: 400,
		tags: ["AP", "Ability Haste"],
		url: "https://league-of-augments.s3.ca-central-1.amazonaws.com/item-icons/Guardian_Angel_item.webp",
	},
];
