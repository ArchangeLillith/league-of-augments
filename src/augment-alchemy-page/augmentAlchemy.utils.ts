import { SetStateAction } from "react";
import {
	AdvancedOptionChoices,
	Augment,
	ETagNames,
	ItemType,
	PageDataType,
	statPropertyMap,
	statTags,
} from "../utils/types";

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
	const cleanAugTags = selectedAugment.tags as ETagNames[];
	const itemMap: Record<number, number> = {};

	//We'll also ensure that the showPrismatics is on because we don't want to add these if it isn't
	if (showPrismatics) {
		//Then we can see if it's a burn or autocast, in which case there are specific items for these
		if (selectedAugment.tags.includes("Autocast")) {
			//We add Lightning Rod
			itemMap[13] = 9000;
			cleanAugTags.filter((tag) => tag !== "Autocast");
		}
		if (selectedAugment.tags.includes("Burn")) {
			//We add Pyro Cloak
			itemMap[17] = 9000;
			cleanAugTags.filter((tag) => tag !== "Burn");
		}
		//THE BOISSSS
		if (selectedAugment.tags.includes("Lil Guys")) {
			//We add Reality Fracture
			itemMap[19] = 9000;
			cleanAugTags.filter((tag) => tag !== "Lil Guys");
		}
	} else {
		//Here we know that showPrismatics is false, so we remove them
		allItems = allItems.filter((item) => item.tier !== "prismatic");
	}

	//Refactor - let's move this somewhere else, like a little floating thing so we don't bog down the 4 slots
	//Then we can look at quests and add the items to the map
	if (selectedAugment.augment_id === 285) {
		//Adds heatsteel for heartsteel
		itemMap[216] = 9000;
	}
	if (selectedAugment.augment_id === 287) {
		//Adds rabadons and zhonya's for wooglets
		itemMap[90] = 9000;
		itemMap[97] = 9000;
	}

	//Here we can reverse the order so we sort everything by what's least important first, meaning we don't need to filter a second time. We'll use the cleaned tags so we don't need to filter over any of the one off tags that are dedicated to an augment
	const reversedTags = [...cleanAugTags].reverse() as ETagNames[];

	//Loop over the items to get ahold of each item!
	for (let i = 0; i < allItems.length; i++) {
		//Make it easier to reference the current item we're testing
		const currentItem = allItems[i];
		//Now we loop through the augments tags
		for (let j = 0; j < reversedTags.length; j++) {
			//make it easier to refer back to the current augment tag
			const currentAugmentTag = reversedTags[j];
			//Now we see if the item has the tag!
			if (currentItem.tags.includes(currentAugmentTag)) {
				//It matched, now we see if out map has the item entry
				const id = Number(currentItem.item_id);
				if (id in itemMap) {
					itemMap[id] = itemMap[id] + 1 + j;
				} else {
					itemMap[id] = 1 + j;
				}
			}
		}
	}

	//Now we convert the map into an object that gives us an array of objects cooresponding to the id of the item and the number of tags that matched between the item and augment
	const scoredItems = Object.entries(itemMap).map(([item_id, score]) => ({
		item_id: Number(item_id),
		score,
	}));

	//Here's where things get interesting. We're finding the highest priority stat so we can then use that for the tie breaker
	const topStatTag: ETagNames | undefined = (
		selectedAugment.tags as ETagNames[]
	).find((tag) => statTags.includes(tag));
	console.log("Top stat tag for tie-breaker:", topStatTag);
	console.log("Wer're sorting for:", selectedAugment.name);

	//Now we sort based on that tie breaker
	const sortedItems = scoredItems.sort((a, b) => {
		//If the scores aren't equal, a tie breaker isn't needed, we return them in the order of highest to lowest
		if (b.score !== a.score) return b.score - a.score;

		//When we get here, the scores are the same, so we need to see who wins the tie breaker
		//If we have a top stat tag (cause some won't) and we have that in the property map, proceed
		if (topStatTag && statPropertyMap[topStatTag]) {
			//Easier to grab this
			const statKey = statPropertyMap[topStatTag];
			//Get a handle on the items from the allItems array as we only have their id and score from the map thus far
			const itemA = allItems.find((item) => item.item_id === a.item_id);
			const itemB = allItems.find((item) => item.item_id === b.item_id);
			//We set the values of the most important stat here
			//We need to Number it cause they're strings currently
			const itemAStatValue = Number(itemA?.[statKey]) ?? 0;
			const itemBStatValue = Number(itemB?.[statKey]) ?? 0;

			//Kinda hackey, we'll prioritize Rabadon's as the passive is better than flat AP
			//This only works if the tie breaker is AP and the item in question is Rabadons
			//We NEED to keep the 5000 under 9000. Doesn't matter the value, but we cannot eclipse the hard set items at the top (like lightning rod and reality fracture)
			if (itemA?.item_id === 90 && topStatTag === "AP") {
				return itemBStatValue - (itemAStatValue + 5000);
			}
			if (itemB?.item_id === 90 && topStatTag === "AP") {
				return itemBStatValue + 5000 - itemAStatValue;
			}

			//Then we see which item has the better stats and return the one that wins
			if (itemBStatValue !== itemAStatValue) {
				return itemBStatValue - itemAStatValue;
			}
		}

		// No stat to tie break by, typically this is because the augment doesn't care about raw stats, keep the order cause it doesn't matter
		return 0;
	});

	//From there, we'll return an array of items with the additional key of score to have easy acess outside of thie function!
	const topItems = sortedItems.map(({ item_id, score }) => {
		const item = allItems.find((item) => item.item_id === item_id);
		return {
			...item!,
			score,
		};
	});

	console.log("Top items:", topItems);
	return topItems;

	//This will ensure every tag is matching, will be used if a harsh comparison option is toggled in advanced settings
	// for (let tag of selectedAugment.tags) {
	// 	suggestedItems = suggestedItems.filter((item) => item.tags.includes(tag));
	// }
}

export const applyUserFilters = (
	advancedOptionChoices: AdvancedOptionChoices,
	pageData: PageDataType,
	setPageData: React.Dispatch<SetStateAction<PageDataType>>,
	removeAdvancedOptions: () => void
) => {
	const chosenOptions: string[] = [];
	const advancedKey = [
		"stats",
		"playstyle",
		"role",
		"scalings",
		"effects",
		"misc",
	] as const;
	for (let i = 0; i < advancedKey.length; i++) {
		let key = advancedKey[i];
		let optionGroup = advancedOptionChoices[key];

		for (let [tag, isSelected] of Object.entries(optionGroup)) {
			if (isSelected) {
				chosenOptions.push(tag);
			}
		}
	}
	if (chosenOptions.length === 0) {
		removeAdvancedOptions();
	}

	//Loop to see which panel we're doing
	for (let i = 1; i <= 6; i++) {
		//Get the key for the panel
		const key = `panel${i}` as keyof typeof pageData.selectedAugments;

		//Easy handle on the selected augments
		const selected = pageData.selectedAugments[key];
		//This is just for the null check but gives us a nice handle in the current panel too I guess
		let currentPanelItems = pageData.suggestedItems[key];
		console.log(`Curent panel items`, currentPanelItems);
		//If we don't have an augment selected, or if we don't have tags for the selected augment, or if we don't have any advanced options this won't continue
		if (selected && selected.tags && currentPanelItems) {
			//Now we can filter for the panel we're on since everything is defined and there

			//Loop over the array of advanced option tags
			for (let j = 0; j < chosenOptions.length; j++) {
				//Set current panel items to a filtered version
				currentPanelItems = currentPanelItems.filter((item) => {
					//Filter the ones that have that tag
					return item.tags.includes(chosenOptions[j] as ETagNames);
				});
			}
			console.log(`current panle items after for filter:`, currentPanelItems);
		}
		//Set the state!
		console.log(
			`current panel items right before setstate:`,
			currentPanelItems
		);
		setPageData((prev) => ({
			...prev,
			advancedOptions: true,
			suggestedItems: {
				...prev.suggestedItems,
				[key]: currentPanelItems,
			},
		}));
	}
};
