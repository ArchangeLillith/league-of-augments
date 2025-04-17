export type user = {
	id: number;
	username: string;
};

export type Build = {
	name: string;
	augments: Augment[];
	items: number[];
};

export type ItemType = {
	item_id: number;
	name: string;
	tier: "starting" | "prismatic" | "legendary" | "boot";
	cost: number;
	sell: number;
	ability_power: number;
	ability_haste: number;
	omnivamp: number;
	adaptive_force: number;
	attack_damage: number;
	crit_chance: number;
	crit_damage: number;
	attack_speed: number;
	lethality: number;
	lifesteal: number;
	move_speed: number;
	armour_pen: number;
	magic_pen: number;
	health: number;
	mana: number;
	mana_regen: number;
	health_regen: number;
	heal_and_shield_power: number;
	armour: number;
	magic_resist: number;
	tenacity: number;
	url: string;
	// Refactor we're gunna have a Tag type that only allows the tag names eventually when we have all the tags added to the db
	tags: string[];
};

export type Augment = {
	name: string;
	augment_id: number;
	description: string;
	tier: "Silver" | "Gold" | "Prismatic";
	url: null | string;
	tags: string[];
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
