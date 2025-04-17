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

	//First loop to loop over the selected augment's tags
	for (let i = 0; i < selectedAugment.tags.length; i++) {
		//Make it easier to call to the currently selected augment tag
		const selectedAugmentTag = selectedAugment.tags[i];
		//We'll also declare the item id here to make it easier as well
		const item_id = allItems[i].item_id;
		//Loop over the item tags now!
		for (let j = 0; j < allItems[i].tags.length; j++) {
			//Again, make it easier to call to the current item tag
			const itemTag = allItems[i].tags[j];
			//Compare, if they match we enter in, if not, we just continue
			if (itemTag === selectedAugmentTag) {
				//It matched, now we see if out map has the item entry
				if (itemMap[item_id]) {
					//The map has an entry! We'll add a count to the entry that's there
					itemMap[item_id]++;
				} else {
					//There's not an entry yet, we'll add one
					itemMap[item_id] = 1;
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

	console.log(sortedItems);
	//From there, we'll return an array of items with the additional key of score to have easy acess outside of thie function!
	const topItems = sortedItems.map(({ item_id, score }) => {
		const item = allItems.find((item) => item.item_id === item_id);
		return {
			...item!,
			score,
		};
	});
	console.log(topItems);
	return topItems;

	//This will ensure every tag is matching, will be used if a harsh comparison option is toggled in advanced settings
	// for (let tag of selectedAugment.tags) {
	// 	suggestedItems = suggestedItems.filter((item) => item.tags.includes(tag));
	// }
}
