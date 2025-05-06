import baseService from "./base";

export const fetchTags = async (dev = false): Promise<any[]> => {
	if (dev) return mockTags;
	try {
		const tags = await baseService.get("/api/tags");
		return tags;
	} catch (error) {
		console.error(`ERROR in tags.ts in services:`, error);
		throw error;
	}
};

const mockTags = [
	{ tag_id: 1, tag_name: "AP" },
	{ tag_id: 2, tag_name: "AD" },
	{ tag_id: 3, tag_name: "Ability Haste" },
	{ tag_id: 4, tag_name: "Win More" },
	{ tag_id: 5, tag_name: "Lifesteal" },
	{ tag_id: 6, tag_name: "ADC" },
];
