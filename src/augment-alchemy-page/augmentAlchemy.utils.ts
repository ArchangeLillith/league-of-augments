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
