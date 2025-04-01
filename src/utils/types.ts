import { Augment } from "../../types";

export type user = {
	id: number;
	username: string;
};

export type Build = {
	name: string;
	augments: Augment[];
	items: number[];
};

export type UserLoginObject = {
	userData: {
		username: string;
		id: number;
	};
	champsWon: string[];
	champsFirstPlace: string[];
	champsPlayed: string[];
	champsWanted: string[];
	settings: any;
};

export type AuthState = {
	authenticated: boolean;
	userData: user | null;
	champsWon: string[];
	champsFirstPlace: string[];
	champsPlayed: string[];
	champsWanted: string[];
	settings: {};
};

export interface WrapperProps {
	children: React.ReactNode;
}
