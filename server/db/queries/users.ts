import { Query, QueryMetadata } from "../query";
import { SettingsTable, UserTable } from "../../utils/types";
import { ResultSetHeader } from "mysql2";

/**
 * Returns a user by their username
 * @param username - the user's chosen name
 * @returns a user by their name
 */
const oneByUsername = (username: string): Promise<UserTable[]> =>
	Query<UserTable[]>(
		`SELECT *
		FROM
			loa_users
		WHERE
			username = ?
		`,
		[username]
	);

//Refactor: When we introduce settings this is a piece of it
// const userSettings = (user_id: number): Promise<SettingsTable[]> =>
// 	Query<SettingsTable[]>(
// 		`SELECT *
// 		FROM
// 			loa_settings
// 		WHERE
// 			user_id = ?
// 		`,
// 		[user_id]
// 	);

// const updateSettings = (
// 	id: number,
// 	settings: any
// ): Promise<ResultSetHeader> => {
// 	return QueryMetadata(
// 		/* sql */ `
// 			INSERT INTO loa_settings (user_id, settings)
// 			VALUES (?, ?)
// 			ON DUPLICATE KEY UPDATE settings = VALUES(settings);
// 		`,
// 		[id, settings]
// 	);
// };

/**
 * Adds a new user to the database
 * @param username - the user's chosen name
 * @param password - the user's password
 * @returns an insert id containing the user's ID
 */
const insertUser = async (
	username: string,
	password: string
): Promise<number> => {
	const result = await Query(
		`INSERT INTO 
				loa_users 
					(username, 
					password, 
					champs_won,
					champs_first_place,
					champs_played,
					champs_wanted) 
			VALUES 
				(?,?,?,?,?,?);`,
		[
			username,
			password,
			JSON.stringify([]),
			JSON.stringify([]),
			JSON.stringify([]),
			JSON.stringify([]),
		]
	);

	// `insertId` contains the new user's ID
	return result.insertId;
};

/**
 * Takes the user's filtered champions and updates the database with them
 * @param user_id - the user we're updating
 * @param champs_won - a string[] of champion names associated to this tag by the user
 * @param champs_first_place - a string[] of champion names associated to this tag by the user
 * @param champs_played - a string[] of champion names associated to this tag by the user
 * @param champs_wanted - a string[] of champion names associated to this tag by the user
 * @returns ResultSetHeader
 */
const updateUser = (
	user_id: number,
	champs_won: string[],
	champs_first_place: string[],
	champs_played: string[],
	champs_wanted: string[]
): Promise<ResultSetHeader> =>
	Query<ResultSetHeader>(
		/* sql */ `
				UPDATE loa_users
				SET 
					champs_won = ?,
					champs_first_place = ?,
					champs_played = ?,
					champs_wanted = ?
				WHERE user_id = ?
			`,
		[
			JSON.stringify(champs_won),
			JSON.stringify(champs_first_place),
			JSON.stringify(champs_played),
			JSON.stringify(champs_wanted),
			user_id,
		]
	);
export default {
	updateUser,
	// userSettings,
	insertUser,
	oneByUsername,
	// updateSettings,
};
