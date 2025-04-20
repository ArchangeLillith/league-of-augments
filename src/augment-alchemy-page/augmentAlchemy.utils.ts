import { Augment, ItemType } from "../utils/types";

export type PageDataType = {
	augments: Augment[];
	selectedAugments: {
		panel1: Augment | null;
		panel2: Augment | null;
		panel3: Augment | null;
		panel4: Augment | null;
		panel5: Augment | null;
		panel6: Augment | null;
	};
	suggestedItems: {
		panel1: ItemType[] | null;
		panel2: ItemType[] | null;
		panel3: ItemType[] | null;
		panel4: ItemType[] | null;
		panel5: ItemType[] | null;
		panel6: ItemType[] | null;
		itemSet: Set<ItemType>;
	};
};

export const initializePageData = {
	augments: [],
	selectedAugments: {
		panel1: null,
		panel2: null,
		panel3: null,
		panel4: null,
		panel5: null,
		panel6: null,
	},
	suggestedItems: {
		panel1: null,
		panel2: null,
		panel3: null,
		panel4: null,
		panel5: null,
		panel6: null,
		itemSet: new Set<ItemType>(),
	},
};

export function filterItems(selectedAugment: Augment, allItems: ItemType[]) {
	//Declare the map we'll use to see how many tags something has in common
	const itemMap: Record<number, number> = {};

	//Loop over the items to get ahold of each item!
	for (let i = 0; i < allItems.length; i++) {
		//Make it easier to reference the current item we're testing
		const selectedItem = allItems[i];
		//Now we loop through the augments tags
		for (let j = 0; j < selectedAugment.tags.length; j++) {
			//make it easier to refer back to the current augment tag
			const currentAugmentTag = selectedAugment.tags[j];
			//Now we see if the item has the tag!
			if (selectedItem.tags.includes(currentAugmentTag)) {
				//It matched, now we see if out map has the item entry
				if (itemMap[selectedItem.item_id]) {
					//The map has an entry! We'll add a count to the entry that's there
					itemMap[selectedItem.item_id]++;
				} else {
					//There's not an entry yet, we'll add one
					itemMap[selectedItem.item_id] = 1;
				}
			}
		}
	}

	//Now we conver the map into an object that gives us an array of objects cooresponding to the id of the item and the number of tags that matched between the item and augment
	const scoredItems = Object.entries(itemMap).map(([item_id, score]) => ({
		item_id: Number(item_id),
		score,
	}));

	//We'll then sort that to give us the highest at the top
	const sortedItems = scoredItems.sort((a, b) => b.score - a.score);

	console.log("sorted:", sortedItems);
	//From there, we'll return an array of items with the additional key of score to have easy acess outside of thie function!
	const topItems = sortedItems.map(({ item_id, score }) => {
		const item = allItems.find((item) => item.item_id === item_id);
		return {
			...item!,
			score,
		};
	});
	console.log("top", topItems);
	return [
		topItems[0] ?? {},
		topItems[1] ?? {},
		topItems[2] ?? {},
		topItems[3] ?? {},
	];

	//This will ensure every tag is matching, will be used if a harsh comparison option is toggled in advanced settings
	// for (let tag of selectedAugment.tags) {
	// 	suggestedItems = suggestedItems.filter((item) => item.tags.includes(tag));
	// }
}

export const gemMap: Record<string, string> = {
	"Ability Haste": "stats",
	Active: "misc",
	AD: "stats",
	"Adaptive Force": "stats",
	ADC: "role",
	Aggressive: "playstyle",
	"AOE": "effects",
	AP: "stats",
	"Apex Inventor Synergy": "misc",
	Armour: "stats",
	"Armour Pen": "stats",
	"Armour Scaling": "scalings",
	"Armour Shred": "stats",
	Assassin: "role",
	"Attack Speed": "stats",
	"Auto Attacking": "playstyle",
	"Auto Reset": "effects",
	"Auto Weaving": "playstyle",
	"Autocast": "misc",
	Bleed: "effects",
	Block: "effects",
	Bruiser: "role",
	Burn: "effects",
	"Burst": "playstyle",
	"Cooldown Reduction": "effects",
	Crit: "stats",
	"Crit Damage": "stats",
	"Crit Scaling": "scalings",
	"Current Health Damage": "scalings",
	"Damage Steroid": "effects",
	Defensive: "playstyle",
	Dragon: "misc",
	Energized: "effects",
	"Enhanced Auto Attack": "effects",
	Execute: "effects",
	Gambling: "misc",
	Grievous: "effects",
	Heal: "effects",
	"Heal and Shield Power": "stats",
	Health: "stats",
	"Health Regen": "stats",
	Hybrid: "role",
	Immobilize: "effects",
	"Immobilize Enhancer": "effects",
	Income: "misc",
	Kiting: "playstyle",
	Lethality: "stats",
	Lifesteal: "stats",
	"Lil Guys": "misc",
	Mage: "role",
	"Magic Pen": "stats",
	"Magic Resist": "stats",
	"Magic Resist Scaling": "scalings",
	"Magic Resist Shred": "stats",
	Mana: "stats",
	"Mana Regen": "stats",
	"Mana Scaling": "scalings",
	"Max Health Damage": "scalings",
	"Max Health Scaling": "scalings",
	"Missing Health Damage": "scalings",
	"Missing Health Scaling": "scalings",
	"Move Speed": "stats",
	Movement: "effects",
	Omnivamp: "stats",
	"On Takedown Effect": "effects",
	"On-Hit": "effects",
	"Only Child": "playstyle",
	"Positioning Pattern": "playstyle",
	"Projectile": "effect",
	Quest: "misc",
	"Range Increase": "stats",
	"Range Only": "misc",
	Shield: "effects",
	Slow: "effects",
	Sniper: "role",
	"Spell Heavy": "playstyle",
	"Spell Weaving": "playstyle",
	Stacking: "playstyle",
	"Sticky": "playstyle",
	"Summoner Spell Cooldown": "stats",
	Support: "role",
	Tank: "role",
	Targeted: "misc",
	Tenacity: "stats",
	Threshold: "misc",
	"True Damage": "misc",
	Twinning: "misc",
	"Ultimate Scaling": "effects",
	Untargetability: "misc",
	"Win More": "misc",
};
