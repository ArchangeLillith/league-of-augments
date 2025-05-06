import baseService from "./base";

export const fetchTags = async (): Promise<any[]> => {
	try {
		const tags = await baseService.get("/api/tags");
		return tags;
	} catch (error) {
		console.error(`ERROR in auth.ts in services:`, error);
		throw error;
	}
};
