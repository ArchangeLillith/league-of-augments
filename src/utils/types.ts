import { SetStateAction } from "react";
import { ETagNames } from "./enums";

export type user = {
	id: number;
	username: string;
};

export type Build = {
	name: string;
	augments: Augment[];
	items: number[];
	build_id: number;
};

export type ChampPageState = {
	saveMessage: string | null;
	currentBuild: Build;
	allBuilds: Build[];
	pageLoading: boolean;
	isEditing: boolean;
	title: string;
	selectedAugs: Augment[];
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
	tags: ETagNames[];
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

export type AdvancedOptionChoices = {
	stats: {
		[ETagNames.AbilityHaste]: boolean;
		[ETagNames.AD]: boolean;
		[ETagNames.AdaptiveForce]: boolean;
		[ETagNames.AP]: boolean;
		[ETagNames.Armour]: boolean;
		[ETagNames.ArmourPen]: boolean;
		[ETagNames.ArmourShred]: boolean;
		[ETagNames.AttackSpeed]: boolean;
		[ETagNames.Crit]: boolean;
		[ETagNames.CritDamage]: boolean;
		[ETagNames.HealAndShieldPower]: boolean;
		[ETagNames.Health]: boolean;
		[ETagNames.HealthRegen]: boolean;
		[ETagNames.Lethality]: boolean;
		[ETagNames.Lifesteal]: boolean;
		[ETagNames.MagicPen]: boolean;
		[ETagNames.MagicResist]: boolean;
		[ETagNames.MagicResistShred]: boolean;
		[ETagNames.Mana]: boolean;
		[ETagNames.ManaRegen]: boolean;
		[ETagNames.MoveSpeed]: boolean;
		[ETagNames.Omnivamp]: boolean;
		[ETagNames.RangeIncrease]: boolean;
		[ETagNames.SummonerSpellCooldown]: boolean;
		[ETagNames.Tenacity]: boolean;
	};
	scalings: {
		[ETagNames.ArmourScaling]: boolean;
		[ETagNames.CritScaling]: boolean;
		[ETagNames.MagicResistScaling]: boolean;
		[ETagNames.ManaScaling]: boolean;
		[ETagNames.MaxHealthScaling]: boolean;
		[ETagNames.MissingHealthScaling]: boolean;
	};
	effects: {
		[ETagNames.AOE]: boolean;
		[ETagNames.AutoReset]: boolean;
		[ETagNames.Bleed]: boolean;
		[ETagNames.Block]: boolean;
		[ETagNames.Burn]: boolean;
		[ETagNames.CooldownReduction]: boolean;
		[ETagNames.CurrentHealthDamage]: boolean;
		[ETagNames.DamageSteroid]: boolean;
		[ETagNames.Energized]: boolean;
		[ETagNames.EnhancedAutoAttack]: boolean;
		[ETagNames.Execute]: boolean;
		[ETagNames.Grievous]: boolean;
		[ETagNames.Heal]: boolean;
		[ETagNames.Immobilize]: boolean;
		[ETagNames.ImmobilizeEnhancer]: boolean;
		[ETagNames.MaxHealthDamage]: boolean;
		[ETagNames.MissingHealthDamage]: boolean;
		[ETagNames.Movement]: boolean;
		[ETagNames.OnTakedownEffect]: boolean;
		[ETagNames.OnHit]: boolean;
		[ETagNames.Projectile]: boolean;
		[ETagNames.Shield]: boolean;
		[ETagNames.Slow]: boolean;
		[ETagNames.UltimateScaling]: boolean;
	};
	role: {
		[ETagNames.ADC]: boolean;
		[ETagNames.Assassin]: boolean;
		[ETagNames.Bruiser]: boolean;
		[ETagNames.Hybrid]: boolean;
		[ETagNames.Mage]: boolean;
		[ETagNames.Sniper]: boolean;
		[ETagNames.Support]: boolean;
		[ETagNames.Tank]: boolean;
	};
	playstyle: {
		[ETagNames.Aggressive]: boolean;
		[ETagNames.AutoAttacking]: boolean;
		[ETagNames.AutoWeaving]: boolean;
		[ETagNames.Burst]: boolean;
		[ETagNames.Defensive]: boolean;
		[ETagNames.Kiting]: boolean;
		[ETagNames.OnlyChild]: boolean;
		[ETagNames.PositioningPattern]: boolean;
		[ETagNames.SpellHeavy]: boolean;
		[ETagNames.SpellWeaving]: boolean;
		[ETagNames.Stacking]: boolean;
		[ETagNames.Sticky]: boolean;
	};
	misc: {
		[ETagNames.Active]: boolean;
		[ETagNames.Targeted]: boolean;
		[ETagNames.TrueDamage]: boolean;
		[ETagNames.Untargetability]: boolean;
		[ETagNames.LongRange]: boolean;
		[ETagNames.Twinning]: boolean;
	};
};

export type PageDataType = {
	advancedOptions: boolean;
	displayNumber: number;
	augments: Augment[];
	selectedAugments: {
		panel1: Augment | null;
		panel2: Augment | null;
		panel3: Augment | null;
		panel4: Augment | null;
		panel5: Augment | null;
		panel6: Augment | null;
	};
	suggestedItems: {
		panel1: ItemType[] | null;
		panel2: ItemType[] | null;
		panel3: ItemType[] | null;
		panel4: ItemType[] | null;
		panel5: ItemType[] | null;
		panel6: ItemType[] | null;
		itemSet: Set<ItemType>;
	};
	readOnlySuggItems: {
		panel1: ItemType[] | null;
		panel2: ItemType[] | null;
		panel3: ItemType[] | null;
		panel4: ItemType[] | null;
		panel5: ItemType[] | null;
		panel6: ItemType[] | null;
		itemSet: Set<ItemType>;
	};
	showPrismatics: boolean;
};

export type AdvancedOptionsModalProps = {
	advancedOptionChoices: AdvancedOptionChoices;
	setAdvancedOptionChoices: React.Dispatch<
		React.SetStateAction<AdvancedOptionChoices>
	>;
	pageData: PageDataType;
	setPageData: React.Dispatch<SetStateAction<PageDataType>>;
	onClose: () => void;
};

