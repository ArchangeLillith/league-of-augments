import baseService from "./base";

export const fetchOneBuild = async (buildId: number): Promise<any[]> => {
	console.log("Fetch one build,", buildId);
	try {
		const builds = await baseService.post("/api/builds/one", {
			build_id: buildId,
		});
		console.log(builds);
		for (let build of builds) {
			if (build.augments[0].augment_id === null) {
				build.augments = [];
			}
		}
		return builds;
	} catch (error) {
		console.error(`ERROR in auth.ts in services:`, error);
		throw error;
	}
};

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
		for (let build of builds) {
			if (build.augments[0].augment_id === null) {
				build.augments = [];
			}
		}
		return builds;
	} catch (error) {
		console.error(`ERROR in auth.ts in services:`, error);
		throw error;
	}
};
export const writeNewBuild = async (
	champion: string,
	user_id: number
): Promise<any[]> => {
	try {
		const dto = {
			champion_name: champion,
			user_id,
		};
		const builds = await baseService.post("/api/builds/new", {
			dto,
		});
		for (let build of builds) {
			if (build.augments[0].augment_id === null) {
				build.augments = [];
			}
		}

		return builds;
	} catch (error) {
		console.error(`ERROR in auth.ts in services:`, error);
		throw error;
	}
};
