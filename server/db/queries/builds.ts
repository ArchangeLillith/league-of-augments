import { FieldPacket, ResultSetHeader } from "mysql2";
import { BuildTable } from "../../utils/types";
import pool from "../pool";
import { Query } from "../query";

//Creates a build tied to a champ and a user allowing us to then tie augments and items to the build in another table
const upsertFullBuild = async (
	user_id: number,
	champ_name: string,
	name: string,
	augmentIds: number[],
	itemIds: number[]
): Promise<{ success: boolean; buildId?: number; error?: string }> => {
	const conn = await pool.getConnection();
	await conn.beginTransaction();

	try {
		// Step 1: Insert or find build
		//HARDCODED HERE
		const result: [ResultSetHeader, FieldPacket[]] = await conn.query(
			`INSERT INTO loa_builds (user_id, champion_name, name)
			 VALUES (?, ?, ?)
			 ON DUPLICATE KEY UPDATE user_id = user_id`,
			[user_id, champ_name, "TEST"]
		);
		let buildId: number;
		const insertId = result[0].insertId;
		console.log("Result that's erroring:", result[0]);
		if (insertId && insertId !== 0) {
			// A new row was created
			buildId = insertId;
		} else {
			// No new row — fetch the existing one
			const [rows] = (await conn.query(
				`SELECT build_id FROM loa_builds WHERE user_id = ? AND champion_name = ?`,
				[user_id, champ_name]
			)) as [Array<{ build_id: number }>, any];

			buildId = rows[0].build_id;
		}

		// Step 2: Replace augments
		await conn.query(`DELETE FROM loa_build_augments WHERE build_id = ?`, [
			buildId,
		]);

		if (augmentIds.length > 0) {
			const augPlaceholders = augmentIds.map(() => `(?, ?)`).join(", ");
			const augValues = augmentIds.flatMap((id) => [buildId, id]);

			await conn.query(
				`INSERT INTO loa_build_augments (build_id, augment_id)
		 VALUES ${augPlaceholders}`,
				augValues
			);
		}
		//!Turn this on when we impliment item saving in builds
		// // Step 3: Replace items
		// await conn.query(`DELETE FROM loa_build_items WHERE build_id = ?`, [
		// 	buildId,
		// ]);

		// if (itemIds.length > 0) {
		// 	const itemPlaceholders = itemIds.map(() => `(?, ?)`).join(", ");
		// 	const itemValues = itemIds.flatMap((id) => [buildId, id]);

		// 	await conn.query(
		// 		`INSERT INTO loa_build_items (build_id, item_id)
		//  VALUES ${itemPlaceholders}`,
		// 		itemValues
		// 	);
		// }

		await conn.commit();
		conn.release();
		return { success: true, buildId };
	} catch (err: any) {
		await conn.rollback();
		conn.release();
		console.error("Build upsert error:", err);
		return { success: false, error: err.message };
	}
};

const returnBuild = (user_id: number, champ_name: string): Promise<any[]> =>
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

export default { upsertFullBuild, returnBuild };
