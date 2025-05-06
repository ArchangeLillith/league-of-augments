import baseService from "./base";

export const fetchTags = async (
): Promise<any[]> => {
  try {
    const builds = await baseService.get("/api/tags");
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