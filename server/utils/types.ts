import { ChampionName } from "../../types";

export {};

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		export interface Request {
			currentUser?: { user_id: number; username: string };
			payload?: { id: string };
		}
	}
}

export type BuildTable = {
	build_id: number;
	user_id: number;
	champion_name: ChampionName;
	name: string;
};

export type SettingsTable = {
	settings_id: number;
	user_id: number;
	settings: {};
};

export type UserTable = {
	username: string;
	user_id: number;
	champs_won: {};
	champs_first_place: {};
	champs_played: {};
	champs_wanted: {};
	created_at: any;
	password: string;
};
