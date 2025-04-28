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


	// State
	export type ChampPageState = {
		saveMessage: string | null;
		currentBuild: Build;
		allBuilds: Build[];
		pageLoading: boolean;
		isEditing: boolean;
		title: string;
		selectedAugs: Augment[];
	};

	export const ChampPageInitilizer = {
		saveMessage: null,
		currentBuild: { name: "", augments: [], items: [], build_id: 0 },
		allBuilds: [],
		pageLoading: true,
		isEditing: false,
		title: "",
		selectedAugs: [],
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

export interface WrapperProps {
	children: React.ReactNode;
}

export type PageDataType = {
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
	showPrismatics: boolean;
};

export const initializePageData = {
	augments: [],
	selectedAugments: {
		panel1: null,
		panel2: null,
		panel3: null,
		panel4: null,
		panel5: null,
		panel6: null,
	},
	suggestedItems: {
		panel1: null,
		panel2: null,
		panel3: null,
		panel4: null,
		panel5: null,
		panel6: null,
		itemSet: new Set<ItemType>(),
	},
	showPrismatics: true,
};

export enum ETagNames {
	AP = "AP",
	AD = "AD",
	AbilityHaste = "Ability Haste",
	AttackSpeed = "Attack Speed",
	Crit = "Crit",
	CritDamage = "Crit Damage",
	Lethality = "Lethality",
	ArmourPen = "Armour Pen",
	MagicPen = "Magic Pen",
	Health = "Health",
	Armour = "Armour",
	MagicResist = "Magic Resist",
	AdaptiveForce = "Adaptive Force",
	TrueDamage = "True Damage",
	MaxHealthDamage = "Max Health Damage",
	Mana = "Mana",
	ManaRegen = "Mana Regen",
	HealthRegen = "Health Regen",
	Lifesteal = "Lifesteal",
	Omnivamp = "Omnivamp",
	Heal = "Heal",
	Shield = "Shield",
	HealAndShieldPower = "Heal and Shield Power",
	Income = "Income",
	Quest = "Quest",
	MoveSpeed = "Move Speed",
	Movement = "Movement",
	Kiting = "Kiting",
	PositioningPattern = "Positioning Pattern",
	RangeIncrease = "Range Increase",
	Slow = "Slow",
	Immobilize = "Immobilize",
	ArmourShred = "Armour Shred",
	Bleed = "Bleed",
	Block = "Block",
	AOE = "AOE",
	Tenacity = "Tenacity",
	Aggressive = "Aggressive",
	Defensive = "Defensive",
	Burn = "Burn",
	OnHit = "On-Hit",
	Energized = "Energized",
	Stacking = "Stacking",
	Active = "Active",
	EnhancedAutoAttack = "Enhanced Auto Attack",
	AutoReset = "Auto Reset",
	AutoAttacking = "Auto Attacking",
	Twinning = "Twinning",
	Targeted = "Targeted",
	Untargetability = "Untargetability",
	Gambling = "Gambling",
	LilGuys = "Lil Guys",
	ApexInventorSynergy = "Apex Inventor Synergy",
	Dragon = "Dragon",
	UltimateScaling = "Ultimate Scaling",
	WinMore = "Win More",
	ImmobilizeEnhancer = "Immobilize Enhancer",
	ADC = "ADC",
	Mage = "Mage",
	Bruiser = "Bruiser",
	Tank = "Tank",
	Support = "Support",
	Assassin = "Assassin",
	Hybrid = "Hybrid",
	MaxHealthScaling = "Max Health Scaling",
	ArmourScaling = "Armour Scaling",
	MissingHealthScaling = "Missing Health Scaling",
	Execute = "Execute",
	OnTakedownEffect = "On Takedown Effect",
	CurrentHealthDamage = "Current Health Damage",
	MissingHealthDamage = "Missing Health Damage",
	LongRange = "Long Range",
	CritScaling = "Crit Scaling",
	CooldownReduction = "Cooldown Reduction",
	DamageSteroid = "Damage Steroid",
	Threshold = "Threshold",
	SpellHeavy = "Spell Heavy",
	Sniper = "Sniper",
	AutoWeaving = "Auto Weaving",
	Grievous = "Grievous",
	ManaScaling = "Mana Scaling",
	RangeOnly = "Range Only",
	Projectile = "Projectile",
	Burst = "Burst",
	SpellWeaving = "Spell Weaving",
	MagicResistShred = "Magic Resist Shred",
	MagicResistScaling = "Magic Resist Scaling",
	Autocast = "Autocast",
	SummonerSpellCooldown = "Summoner Spell Cooldown",
	OnlyChild = "Only Child",
	Sticky = "Sticky",
	Juice = "Juice",
	Curse = "Curse",
}

export enum EGemType {
	stats = "stats",
	playstyle = "playstyle",
	role = "role",
	misc = "misc",
	effects = "effects",
	scalings = "scalings",
}

export const gemMap: Record<ETagNames, EGemType> = {
	[ETagNames.AbilityHaste]: EGemType.stats,
	[ETagNames.Active]: EGemType.misc,
	[ETagNames.AD]: EGemType.stats,
	[ETagNames.AdaptiveForce]: EGemType.stats,
	[ETagNames.ADC]: EGemType.role,
	[ETagNames.Aggressive]: EGemType.playstyle,
	[ETagNames.AOE]: EGemType.effects,
	[ETagNames.AP]: EGemType.stats,
	[ETagNames.ApexInventorSynergy]: EGemType.misc,
	[ETagNames.Armour]: EGemType.stats,
	[ETagNames.ArmourPen]: EGemType.stats,
	[ETagNames.ArmourScaling]: EGemType.scalings,
	[ETagNames.ArmourShred]: EGemType.stats,
	[ETagNames.Assassin]: EGemType.role,
	[ETagNames.AttackSpeed]: EGemType.stats,
	[ETagNames.AutoAttacking]: EGemType.playstyle,
	[ETagNames.AutoReset]: EGemType.effects,
	[ETagNames.AutoWeaving]: EGemType.playstyle,
	[ETagNames.Autocast]: EGemType.misc,
	[ETagNames.Bleed]: EGemType.effects,
	[ETagNames.Block]: EGemType.effects,
	[ETagNames.Bruiser]: EGemType.role,
	[ETagNames.Burn]: EGemType.effects,
	[ETagNames.Burst]: EGemType.playstyle,
	[ETagNames.CooldownReduction]: EGemType.effects,
	[ETagNames.Crit]: EGemType.stats,
	[ETagNames.CritDamage]: EGemType.stats,
	[ETagNames.CritScaling]: EGemType.scalings,
	[ETagNames.CurrentHealthDamage]: EGemType.effects,
	[ETagNames.DamageSteroid]: EGemType.effects,
	[ETagNames.Defensive]: EGemType.playstyle,
	[ETagNames.Dragon]: EGemType.misc,
	[ETagNames.Energized]: EGemType.effects,
	[ETagNames.EnhancedAutoAttack]: EGemType.effects,
	[ETagNames.Execute]: EGemType.effects,
	[ETagNames.Gambling]: EGemType.misc,
	[ETagNames.Grievous]: EGemType.effects,
	[ETagNames.Heal]: EGemType.effects,
	[ETagNames.HealAndShieldPower]: EGemType.stats,
	[ETagNames.Health]: EGemType.stats,
	[ETagNames.HealthRegen]: EGemType.stats,
	[ETagNames.Hybrid]: EGemType.role,
	[ETagNames.Immobilize]: EGemType.effects,
	[ETagNames.ImmobilizeEnhancer]: EGemType.effects,
	[ETagNames.Income]: EGemType.misc,
	[ETagNames.Kiting]: EGemType.playstyle,
	[ETagNames.Lethality]: EGemType.stats,
	[ETagNames.Lifesteal]: EGemType.stats,
	[ETagNames.LilGuys]: EGemType.misc,
	[ETagNames.Mage]: EGemType.role,
	[ETagNames.MagicPen]: EGemType.stats,
	[ETagNames.MagicResist]: EGemType.stats,
	[ETagNames.MagicResistScaling]: EGemType.scalings,
	[ETagNames.MagicResistShred]: EGemType.stats,
	[ETagNames.Mana]: EGemType.stats,
	[ETagNames.ManaRegen]: EGemType.stats,
	[ETagNames.ManaScaling]: EGemType.scalings,
	[ETagNames.MaxHealthDamage]: EGemType.scalings,
	[ETagNames.MaxHealthScaling]: EGemType.scalings,
	[ETagNames.MissingHealthDamage]: EGemType.scalings,
	[ETagNames.MissingHealthScaling]: EGemType.scalings,
	[ETagNames.MoveSpeed]: EGemType.stats,
	[ETagNames.Movement]: EGemType.effects,
	[ETagNames.Omnivamp]: EGemType.stats,
	[ETagNames.OnTakedownEffect]: EGemType.effects,
	[ETagNames.OnHit]: EGemType.effects,
	[ETagNames.OnlyChild]: EGemType.playstyle,
	[ETagNames.PositioningPattern]: EGemType.playstyle,
	[ETagNames.Projectile]: EGemType.effects,
	[ETagNames.Quest]: EGemType.misc,
	[ETagNames.RangeIncrease]: EGemType.stats,
	[ETagNames.RangeOnly]: EGemType.misc,
	[ETagNames.Shield]: EGemType.effects,
	[ETagNames.Slow]: EGemType.effects,
	[ETagNames.Sniper]: EGemType.role,
	[ETagNames.SpellHeavy]: EGemType.playstyle,
	[ETagNames.SpellWeaving]: EGemType.playstyle,
	[ETagNames.Stacking]: EGemType.playstyle,
	[ETagNames.Sticky]: EGemType.playstyle,
	[ETagNames.SummonerSpellCooldown]: EGemType.stats,
	[ETagNames.Support]: EGemType.role,
	[ETagNames.Tank]: EGemType.role,
	[ETagNames.Targeted]: EGemType.misc,
	[ETagNames.Tenacity]: EGemType.stats,
	[ETagNames.Threshold]: EGemType.misc,
	[ETagNames.TrueDamage]: EGemType.misc,
	[ETagNames.Twinning]: EGemType.misc,
	[ETagNames.UltimateScaling]: EGemType.effects,
	[ETagNames.Untargetability]: EGemType.misc,
	[ETagNames.WinMore]: EGemType.misc,
	[ETagNames.LongRange]: EGemType.misc,
	[ETagNames.Juice]: EGemType.misc,
	[ETagNames.Curse]: EGemType.misc,
};

export const statPropertyMap: Partial<Record<ETagNames, keyof ItemType>> = {
	[ETagNames.AP]: "ability_power",
	[ETagNames.AbilityHaste]: "ability_haste",
	[ETagNames.Omnivamp]: "omnivamp",
	[ETagNames.AdaptiveForce]: "adaptive_force",
	[ETagNames.AD]: "attack_damage",
	[ETagNames.Crit]: "crit_chance",
	[ETagNames.CritDamage]: "crit_damage",
	[ETagNames.AttackSpeed]: "attack_speed",
	[ETagNames.Lethality]: "lethality",
	[ETagNames.Lifesteal]: "lifesteal",
	[ETagNames.MoveSpeed]: "move_speed",
	[ETagNames.ArmourPen]: "armour_pen",
	[ETagNames.MagicPen]: "magic_pen",
	[ETagNames.Health]: "health",
	[ETagNames.Mana]: "mana",
	[ETagNames.ManaRegen]: "mana_regen",
	[ETagNames.HealthRegen]: "health_regen",
	[ETagNames.HealAndShieldPower]: "heal_and_shield_power",
	[ETagNames.Armour]: "armour",
	[ETagNames.MagicResist]: "magic_resist",
	[ETagNames.Tenacity]: "tenacity",
};

const filterByValue = (value: EGemType): string[] => {
	return (Object.keys(gemMap) as ETagNames[]).filter(
		(key: ETagNames) => gemMap[key] === value
	);
};

export const statTags = filterByValue(EGemType.stats);
export const playstyleTags = filterByValue(EGemType.playstyle);
export const miscTags = filterByValue(EGemType.misc);
export const roleTags = filterByValue(EGemType.role);
export const effectsTags = filterByValue(EGemType.effects);
export const scalingsTags = filterByValue(EGemType.scalings);

export const tagDescriptions: Record<ETagNames, string> = {
	[ETagNames.AD]: "",
	[ETagNames.ADC]:
		"The role of attack damage carry, typically classified by high attack speed and crit",
	[ETagNames.AOE]: "The item has an area of effect or helps spells that do",
	[ETagNames.AP]: "",
	[ETagNames.AbilityHaste]: "",
	[ETagNames.Active]:
		"The item is activatable. The player has to press a button to use the item's effect, not like Sterak's that's an auto activate",
	[ETagNames.AdaptiveForce]: "",
	[ETagNames.Aggressive]:
		"Helps with or does more when the player plays aggressivley",
	[ETagNames.ApexInventorSynergy]: "Benefits from the Apex Inventor augment",
	[ETagNames.Armour]: "",
	[ETagNames.ArmourPen]: "",
	[ETagNames.ArmourScaling]: "The item scales off of armour",
	[ETagNames.ArmourShred]: "The item shreds an enemy's armour",
	[ETagNames.Assassin]:
		"The role Assassin, typically defined by burst champions who want to dive in and kill the lowest health memeber of the enemy team",
	[ETagNames.AttackSpeed]: "",
	[ETagNames.AutoAttacking]:
		"The item helps with or does better when the player auto attacks a lot",
	[ETagNames.AutoReset]: "The item has an auto attack reset",
	[ETagNames.AutoWeaving]:
		"The item does better when a player weaves autos bettween spells, like spell -> auto -> spell",
	[ETagNames.Autocast]:
		"Lightning Rod enables an autocast build, therefore it's the only item tagged as such. See it's passive for more information",
	[ETagNames.Bleed]:
		"The item applies a damage over time bleed effect to enemies",
	[ETagNames.Block]:
		"The item blocks damage. This can either be a true block chance like Shield of Molten stone or a one time like Banshee's Veil. This is a more loosley defined tag, but the heart of it is to reduce a good percent of damage taken",
	[ETagNames.Bruiser]:
		"The role bruiser, typically defined by meelee brawlers who are tankier than carries but do less damage, and less tanky than true tanks but do more damage than them",
	[ETagNames.Burn]:
		"The item burns, this is a tag to help with Pyromancer's Cloak which gets much more powerful for every burn source the player has",
	[ETagNames.Burst]:
		"Items that help with champs who want to deal massive amounts of damage their target very quickly",
	[ETagNames.CooldownReduction]:
		"Items that help with or refund cooldowns as an effect, not to be confused with the static stat of Ability Haste",
	[ETagNames.Crit]: "",
	[ETagNames.CritDamage]: "",
	[ETagNames.CritScaling]:
		"Items that scale off of critical strike chance or damage",
	[ETagNames.CurrentHealthDamage]:
		"The item deals a percent amount of an enemy's current health",
	[ETagNames.Curse]:
		"A deliniation of augment, curses stack together between you and a teammate. These scale through the game, and can lead to some of the most overpowered builds Reddit has ever seen",
	[ETagNames.DamageSteroid]:
		"The item gives the player a percent more damage on some condition",
	[ETagNames.Defensive]:
		"Items that either assist in playing defensivley or reward the player for playing in a more careful way",
	[ETagNames.Dragon]:
		"Specifically for Dragonheart, see that item for the effect",
	[ETagNames.Energized]:
		"Items that have energized effects. NOTE: all items that apply an effect to an energized attack stack. Therefore, if a player has two energized items, BOTH unique effects apply on the one energized attack (range from Rapid Firecannon and the movement from Stormsurge are triggered on the one energized auto)",
	[ETagNames.EnhancedAutoAttack]:
		"Items that give the users auto attacks an enhancement, typically after some condition has been met",
	[ETagNames.Execute]: "Items that execute an enemy after some condition",
	[ETagNames.Gambling]:
		"Items that reward the player for taking a risk, typically on the item itself and the purchase thereof",
	[ETagNames.Grievous]:
		"Items that apply grievous wounds, an effect that decreases healing on the enemy. NOTE: Serpent's Fang is also tagged under this; while it's not greivous wounds, it does have the shield cut passive that's similar",
	[ETagNames.Heal]:
		"Items that heal. This is not for items that assist with healing, rather the item iteslf HAS to heal as an effect",
	[ETagNames.HealAndShieldPower]: "",
	[ETagNames.Health]: "",
	[ETagNames.HealthRegen]: "",
	[ETagNames.Hybrid]: "A role that can scale well off of both AP and AD",
	[ETagNames.Immobilize]: "Items that immobilize an enemy",
	[ETagNames.ImmobilizeEnhancer]:
		"Items that have an effect or assist with player's's immobilizations on the enemy",
	[ETagNames.Income]:
		"Items that give money to the playter, typically on a condition being met",
	[ETagNames.Kiting]:
		"Items that help a player kite (the act of moving away from an enemy while attacking) or does better when the player is kiting",
	[ETagNames.Lethality]: "",
	[ETagNames.Lifesteal]: "",
	[ETagNames.LilGuys]:
		"Specifically for Reality Fracture, this tag ties that and the Minionmancer augment together",
	[ETagNames.Mage]:
		"The role of mage, typically defined by scaling best or only off of ability power and the damager output coming from spells rather than auto attacks",
	[ETagNames.MagicPen]: "",
	[ETagNames.MagicResist]: "",
	[ETagNames.MagicResistScaling]:
		"The item scales off of the amount of Magic Resist the player has",
	[ETagNames.MagicResistShred]: "",
	[ETagNames.Mana]: "",
	[ETagNames.ManaRegen]: "",
	[ETagNames.ManaScaling]:
		"The item scales off of the amount of Mana the player has",
	[ETagNames.MaxHealthDamage]:
		"An item that applies damage based on the enemy's max health. NOTE: Max health is calculated by base + bonus health, so the enemy's whole health bar",
	[ETagNames.MaxHealthScaling]:
		"The item scales off of the amount of max health the player has. NOTE: This also encompasses bonus health scaling, as users who want health scaling typically don't care is it'f bonus of max (bonus is anything a player has above the static value that's determined by champion and level and cannot be changed; all items that give health as a stat give bonus health)",
	[ETagNames.MissingHealthDamage]:
		"An item that does damage based on the enemy's missing health. The more health the enemy is missing, the more damage this will deal. This could be called a soft execute",
	[ETagNames.MissingHealthScaling]:
		"An item that does more when the user is missing health; the more health the user is missing, the greater effect",
	[ETagNames.MoveSpeed]: "",
	[ETagNames.Movement]:
		"The item has an active effect that will move the user in some way be it a dash, a blink or a teleport. NOTE: This is not to be confused with Movement Speed, the stat",
	[ETagNames.Omnivamp]: "",
	[ETagNames.OnTakedownEffect]:
		"This item has an effect that triggers on a player participating in killing an enemy. NOTE: The player only needs to assist, but needs an assist credit for this effect to happen. If the player doesn't get an assist credit, the effect does not happen",
	[ETagNames.OnHit]:
		"The item has or helps with on-hits, a classification of items that do something on auto attacks",
	[ETagNames.OnlyChild]:
		"Thie item either wants you to be the last one standing of your team or wants you to die first",
	[ETagNames.PositioningPattern]:
		"Two items live here with wildly different identities. They both work better if the player plays around them in very specific ways",
	[ETagNames.Projectile]: "The item spawns a projectile",
	[ETagNames.Quest]: "The item is involved in a wuest given by an augemnt",
	[ETagNames.RangeIncrease]: "",
	[ETagNames.RangeOnly]:
		"Only ranged users can purchase this item, and this is NOT effected by range increases by augments or otherwise",
	[ETagNames.Shield]: "The item gives a shield to the player or their ally",
	[ETagNames.Slow]: "The item has a slowing effect",
	[ETagNames.Sniper]:
		"A role, sniper is for champions of any class that want to be far away from their enemies and can stil deal damage. Think Jhin and Xerath",
	[ETagNames.SpellHeavy]:
		"Items that do better or assist with a playstyle of throwing a lot of spells",
	[ETagNames.SpellWeaving]:
		"The playstyle of pressing a spell then another spell or auto attacking. NOTE: This is different than auto weaving as that is spell -> auto -> spell, while this is about spell -> different spell -> auto, maybe, prioritizing different spells with or without auto attacks. Think Samira",
	[ETagNames.Stacking]: "An item that has a stacking mechanic",
	[ETagNames.Sticky]:
		"An item that assists the player on staying on or near the enemy",
	[ETagNames.SummonerSpellCooldown]: "",
	[ETagNames.Support]:
		"The role of a support, classified by their job being to protect their teammate",
	[ETagNames.Tank]:
		"The role of tank, typically seen to have not much damage but can survive based on high health or other defensive stats",
	[ETagNames.Targeted]:
		"The item that encourages the player to or helps the player target one specific enemy",
	[ETagNames.Tenacity]: "",
	[ETagNames.Threshold]:
		"The item has a threshold to be met before 'turning on'",
	[ETagNames.TrueDamage]:
		"The item deals true damage, damage that ignores all resistances and lowers the targets health by the exact amount that was done",
	[ETagNames.Twinning]:
		"Items that work better or promote a playstyle of working with a player's teammate",
	[ETagNames.UltimateScaling]:
		"The item has some positive interraction with the player casting their ultimate ability or helps the ultimate deal more damage",
	[ETagNames.Untargetability]:
		"A very loose tag, but all items have some way of making the player untargetable. Examples include Zhonya's stasis, Emperyean's dash to ally, Spectral Cutlass' dash back to anchor point",
	[ETagNames.WinMore]: "Get gud lol",
	[ETagNames.LongRange]:
		"Items that do better or promote a longer range playtsyle",
	[ETagNames.Juice]: "Juices! A tag for augments to group juice augs together",
};
