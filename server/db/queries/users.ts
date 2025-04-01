import { Query, QueryMetadata } from "../query";
import { SettingsTable, UserTable } from "../../utils/types";
import { ResultSetHeader } from "mysql2";

const oneByUsername = (username: string): Promise<UserTable[]> =>
	Query<UserTable[]>(
		/* sql */ `
			SELECT *
			FROM
				loa_users
			WHERE
				username = ?
		`,
		[username]
	);

const userSettings = (user_id: number): Promise<SettingsTable[]> =>
	Query<SettingsTable[]>(
		/* sql */ `
			SELECT *
			FROM
				loa_settings
			WHERE
				user_id = ?
		`,
		[user_id]
	);

	const insertUser = async (username: string, password: string): Promise<number> => {
		const result = await Query(
			/* sql */ `
			INSERT INTO 
				loa_users 
					(username, 
					password, 
					champs_won,
					champs_first_place,
					champs_played,
					champs_wanted) 
			VALUES 
				(?,?,?,?,?,?);`,
			[username, password, JSON.stringify([]), JSON.stringify([]), JSON.stringify([]), JSON.stringify([])]
		);
	
		// `insertId` contains the new user's ID
		return result.insertId;
	};

	const updateSettings = (
		id: number,
		settings: any
	): Promise<ResultSetHeader> => {
		return QueryMetadata(
			/* sql */ `
			INSERT INTO loa_settings (user_id, settings)
			VALUES (?, ?)
			ON DUPLICATE KEY UPDATE settings = VALUES(settings);
		`,
			[id, settings]
		);
	};

const updateUser = (
	user_id: number,
	champs_won: string[],
	champs_first_place: string[],
	champs_played: string[],
	champs_wanted: string[]
): Promise<any> =>
	Query<any>(
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
export default { updateUser, userSettings, insertUser, oneByUsername, updateSettings };
