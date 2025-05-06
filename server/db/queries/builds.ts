import { Augment, BuildTable } from "../../utils/types";
import { Query } from "../query";

/**
 * Saves a build, updating associated augments and the name if applicable
 * @param build_id - the builld ID we're updating
 * @param name - the name of the build
 * @param augmentIds - an array of cooresponding augment IDs
 * @returns success of failure
 */
const saveExistingBuild = async (
	build_id: number,
	name: string,
	augmentIds: number[]
): Promise<{ success: boolean; error?: string }> => {
	try {
		//Update build name
		await Query<any>(`UPDATE loa_builds SET name = ? WHERE build_id = ?`, [
			name,
			build_id,
		]);

		//Delete old augments
		await Query<any>(`DELETE FROM loa_build_augments WHERE build_id = ?`, [
			build_id,
		]);

		//Insert new augments
		if (augmentIds.length > 0) {
			const values = augmentIds.map((id) => [build_id, id]); // [[build_id, augment_id], ...]

			// Flatten the array for query params
			const flatValues = values.flat(); // [build_id, id1, build_id, id2, ...]

			// Build the placeholders string: "(?, ?), (?, ?), ..."
			const placeholders = values.map(() => "(?, ?)").join(", ");

			//Now we write the placeholders into the build
			await Query<any>(
				`INSERT INTO loa_build_augments (build_id, augment_id) VALUES ${placeholders}`,
				flatValues
			);
		}
		//We succeeded!
		return { success: true };
	} catch (err) {
		//Oh no somehting went wrong
		console.error("Error saving build:", err);
		return { success: false, error: err };
	}
};

/**
 * Creates a new build for the champion by the user, no augments are written here. This is called when the user clicks the new build button, allowing us top set this new build as the current one and not having to do hackey workarounds.
 * @param user_id - the user that's making the build
 * @param champ_name - the champion the build is associated with
 * @param name - the name of the build
 * @returns - success and buildId or failure
 */
const insertNewBuild = async (
	user_id: number,
	champ_name: string,
	name: string
): Promise<{ success: boolean; buildId?: number; error?: string }> => {
	try {
		const result = await Query<any>(
			`INSERT INTO loa_builds (user_id, champion_name, name) VALUES (?, ?, ?)`,
			[user_id, champ_name, name]
		);

		const buildId = result.insertId;

		return { success: true, buildId };
	} catch (err: any) {
		console.error("Build insert error:", err);
		return { success: false, error: err.message };
	}
};

/**
 * Brings back a list of all the builds for the user that are for the specific champion, augments included
 * @param user_id - the user who's requesting the build
 * @param champ_name - the champ we're getting the build for
 * @returns an array of builds associated with the user and champion
 */
const returnBuilds = (
	user_id: number,
	champ_name: string
): Promise<(BuildTable & { augments: Augment[] })[]> =>
	Query<any>(
		`SELECT 
      b.build_id,
      b.user_id,
      b.champion_name,
      b.name,
    JSON_ARRAYAGG(
      JSON_OBJECT(
				'augment_id', a.augment_id,
				'name', a.name,
				'description', a.description,
				'url', a.url,
				'tier', a.tier
			)
    ) AS augments
    FROM 
			loa_builds b
    LEFT JOIN 
			loa_build_augments ba ON b.build_id = ba.build_id
    LEFT JOIN 
			loa_augments a ON ba.augment_id = a.augment_id
    WHERE 
			b.champion_name = ? AND b.user_id = ?
    GROUP BY 
			b.build_id
    `,
		[champ_name, user_id]
	);

/**
 * Returns a build based on the build ID
 * @param build_id - the build we're getting
 * @returns a build if one with buildId exists
 */
const returnOneBuild = (
	build_id: number
): Promise<(BuildTable & { augments: Augment[] })[]> =>
	Query<any>(
		`SELECT 
      b.build_id,
      b.user_id,
      b.champion_name,
      b.name,
    JSON_ARRAYAGG(
			JSON_OBJECT(
				'augment_id', a.augment_id,
				'name', a.name,
				'description', a.description,
				'url', a.url,
				'tier', a.tier
			)
		) AS augments
    FROM 
			loa_builds b
    LEFT JOIN 
			loa_build_augments ba ON b.build_id = ba.build_id
    LEFT JOIN 
			loa_augments a ON ba.augment_id = a.augment_id
    WHERE 
			b.build_id = ?
    GROUP BY 
			b.build_id
    `,
		[build_id]
	);

export default {
	returnBuilds,
	insertNewBuild,
	saveExistingBuild,
	returnOneBuild,
};
