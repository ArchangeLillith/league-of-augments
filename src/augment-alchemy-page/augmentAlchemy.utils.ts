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
	showPrismatics: boolean;
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
	showPrismatics: true,
};

/*

We need to filter by the highest number we cna pull out first!
-excluded list gets kicked
-prismatics go
-then we can see if it;s a sort by champ, that will be it's own util
-run the loop
-We'll increase the weight to 1+index, that'll track the weight of the tags with no omre logic!!
-then we'll grab the top 4 and return~

*/

export function filterItems(
	selectedAugment: Augment,
	allItems: ItemType[],
	showPrismatics: boolean
) {
	//Declare the map we'll use to see how many tags something has in common
	const itemMap: Record<number, number> = {};
	if (!showPrismatics) {
		allItems = allItems.filter((item) => item.tier !== "prismatic");
	}

	//Let's see what order the tags are in, this should be by weight!
	console.log("Selected aug tags:", selectedAugment.tags);
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
				const id = Number(selectedItem.item_id);
				if (id in itemMap) {
					itemMap[id] = itemMap[id] + 1 + j;
				} else {
					itemMap[id] = 1 + j;
				}
			}
		}
	}

	//Now we conver the map into an object that gives us an array of objects cooresponding to the id of the item and the number of tags that matched between the item and augment
	const scoredItems = Object.entries(itemMap).map(([item_id, score]) => ({
		item_id: Number(item_id),
		score,
	}));

	//Here's where things get interesting. We're leveraging our gemMap to see what the highest stat is if there is one, and this should then filter the highest of the scored with that to break ties!
	// Find the highest priority stat tag from the augment
	const topStatTag = selectedAugment.tags.find((tag) => statTags.includes(tag));
	console.log("Top stat tag for tie-breaker:", topStatTag);

	//Now we sort based on that tie breaker
	const sortedItems = scoredItems.sort((a, b) => {
		console.log("A:", a.score, "B:", b.score);
		//If the scores aren't equal, a tie breaker isn't needed, we return them in the order of highest to lowest
		if (b.score !== a.score) return b.score - a.score;

		// Here the scores are the same, so we need to see who wins the tie breaker
		//If we have a top stat tag (cause some won't) and we have that in the property map, proceed
		if (topStatTag && statPropertyMap[topStatTag]) {
			console.log(`We're now tie breaking! :D`)
			//Easier to grab this
			const statKey = statPropertyMap[topStatTag];
			//Get a handle on the items from the allITems array as we only have their id and scor from the map thus far
			const itemA = allItems.find((item) => item.item_id === a.item_id);
			const itemB = allItems.find((item) => item.item_id === b.item_id);
			console.log(itemA);
			console.log(itemB);
			//We set the values of the most important stat here
			//We need to Number it cause they're strings currently
			const itemAStatValue = Number(itemA?.[statKey]) ?? 0;
			const itemBStatValue = Number(itemB?.[statKey]) ?? 0;

			console.log(itemAStatValue);
			console.log(itemBStatValue);

			//Then we see which item has the better stats and return the one that wins
			if (itemBStatValue !== itemAStatValue) {
				return itemBStatValue - itemAStatValue;
			}
		}

		// No tie-breaker applicable, keep the order
		return 0;
	});

	console.log("Sorted:", sortedItems);
	//From there, we'll return an array of items with the additional key of score to have easy acess outside of thie function!
	const topItems = sortedItems.map(({ item_id, score }) => {
		const item = allItems.find((item) => item.item_id === item_id);
		return {
			...item!,
			score,
		};
	});
	console.log("Top 4:", topItems[0], topItems[1], topItems[2], topItems[3]);
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
	AOE: "effects",
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
	Autocast: "misc",
	Bleed: "effects",
	Block: "effects",
	Bruiser: "role",
	Burn: "effects",
	Burst: "playstyle",
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
	Projectile: "effect",
	Quest: "misc",
	"Range Increase": "stats",
	"Range Only": "misc",
	Shield: "effects",
	Slow: "effects",
	Sniper: "role",
	"Spell Heavy": "playstyle",
	"Spell Weaving": "playstyle",
	Stacking: "playstyle",
	Sticky: "playstyle",
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

const statPropertyMap: Record<string, keyof ItemType> = {
	"AP": "ability_power",
	"Ability Haste": "ability_haste",
	Omnivamp: "omnivamp",
	"Adaptive Force": "adaptive_force",
	"AD": "attack_damage",
	"Crit Chance": "crit_chance",
	"Crit Damage": "crit_damage",
	"Attack Speed": "attack_speed",
	Lethality: "lethality",
	Lifesteal: "lifesteal",
	"Move Speed": "move_speed",
	"Armour Pen": "armour_pen",
	"Magic Pen": "magic_pen",
	Health: "health",
	Mana: "mana",
	"Mana Regen": "mana_regen",
	"Health Regen": "health_regen",
	"Heal and Shield Power": "heal_and_shield_power",
	Armour: "armour",
	"Magic Resist": "magic_resist",
	Tenacity: "tenacity",
};

const statTags = [
	"AP",
	"Ability Haste",
	"Omnivamp",
	"Adaptive Force",
	"AD",
	"Crit",
	"Crit Damage",
	"Attack Speed",
	"Lethality",
	"Lifesteal",
	"Move Speed",
	"Armour Pen",
	"Magic Pen",
	"Health",
	"Mana",
	"Mana Regen",
	"Health Regen",
	"Heal and Shield Power",
	"Armour",
	"Magic Resist",
	"Tenacity",
];
