import { Query } from "../query";

const saveExistingBuild = async (
	build_id: number,
	name: string,
	augmentIds: number[]
): Promise<any> => {
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

			await Query<any>(
				`INSERT INTO loa_build_augments (build_id, augment_id) VALUES ${placeholders}`,
				flatValues
			);
		}

		return { success: true };
	} catch (err) {
		console.error("Error saving build:", err);
		return { success: false, error: err };
	}
};

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

const returnBuilds = (user_id: number, champ_name: string): Promise<any[]> =>
	Query<any>(
		`
    SELECT 
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
    FROM loa_builds b
    LEFT JOIN loa_build_augments ba ON b.build_id = ba.build_id
    LEFT JOIN loa_augments a ON ba.augment_id = a.augment_id
    WHERE b.champion_name = ? AND b.user_id = ?
    GROUP BY b.build_id
    `,
		[champ_name, user_id]
	);

export default {
	returnBuilds,
	insertNewBuild,
	saveExistingBuild,
};
