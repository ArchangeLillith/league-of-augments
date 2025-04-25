import baseService from "./base";

export const fetchBuilds = async (
	champion: string,
	user_id: number
): Promise<any[]> => {
	try {
		const dto = {
			champion_name: champion,
			user_id,
		};
		const builds = await baseService.post("/api/builds", {
			dto,
		});
		console.log(builds);
		return builds;
	} catch (error) {
		console.error(`ERROR in auth.ts in services:`, error);
		throw error;
	}
};
export const getLastId = async (
	user_id: number,
	champion: string
): Promise<{ build_id: number }[]> => {
	try {
		const dto = {
			champion_name: champion,
			user_id,
		};
		const id = await baseService.post("/api/builds/lastId", {
			dto,
		});
		console.log(id);
		return id;
	} catch (error) {
		console.error(`ERROR in auth.ts in services:`, error);
		throw error;
	}
};
