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

export type Augment = {
	name: string;
	augment_id: number;
	description: string;
	tier: "Silver" | "Gold" | "Prismatic";
	url: null | string;
	tags: string[];
};

export type ChampionName =
	| "Aatrox"
	| "Ahri"
	| "Akali"
	| "Akshan"
	| "Alistar"
	| "Ambessa"
	| "Amumu"
	| "Anivia"
	| "Annie"
	| "Aphelios"
	| "Ashe"
	| "Aurora"
	| "Aurelion Sol"
	| "Azir"
	| "Bard"
	| "Bel'Veth"
	| "Blitzcrank"
	| "Brand"
	| "Braum"
	| "Briar"
	| "Caitlyn"
	| "Camille"
	| "Cassiopeia"
	| "Cho'Gath"
	| "Corki"
	| "Darius"
	| "Diana"
	| "Dr. Mundo"
	| "Draven"
	| "Ekko"
	| "Elise"
	| "Evelynn"
	| "Ezreal"
	| "Fiddlesticks"
	| "Fiora"
	| "Fizz"
	| "Galio"
	| "Gangplank"
	| "Garen"
	| "Gnar"
	| "Gragas"
	| "Graves"
	| "Gwen"
	| "Hecarim"
	| "Heimerdinger"
	| "Hwei"
	| "Illaoi"
	| "Irelia"
	| "Ivern"
	| "Janna"
	| "Jarvan IV"
	| "Jax"
	| "Jayce"
	| "Jhin"
	| "Jinx"
	| "K'Sante"
	| "Kai'Sa"
	| "Kalista"
	| "Karma"
	| "Karthus"
	| "Kassadin"
	| "Katarina"
	| "Kayle"
	| "Kayn"
	| "Kennen"
	| "Kha'Zix"
	| "Kindred"
	| "Kled"
	| "Kog'Maw"
	| "LeBlanc"
	| "Lee Sin"
	| "Leona"
	| "Lillia"
	| "Lissandra"
	| "Lucian"
	| "Lulu"
	| "Lux"
	| "Malphite"
	| "Malzahar"
	| "Maokai"
	| "Master Yi"
	| "Mel"
	| "Milio"
	| "Miss Fortune"
	| "Mordekaiser"
	| "Morgana"
	| "Naafiri"
	| "Nami"
	| "Nasus"
	| "Nautilus"
	| "Neeko"
	| "Nidalee"
	| "Nilah"
	| "Nocturne"
	| "Nunu & Willump"
	| "Olaf"
	| "Orianna"
	| "Ornn"
	| "Pantheon"
	| "Poppy"
	| "Pyke"
	| "Qiyana"
	| "Quinn"
	| "Rakan"
	| "Rammus"
	| "Rek'Sai"
	| "Rell"
	| "Renata Glasc"
	| "Renekton"
	| "Rengar"
	| "Riven"
	| "Rumble"
	| "Ryze"
	| "Samira"
	| "Sejuani"
	| "Senna"
	| "Seraphine"
	| "Sett"
	| "Shaco"
	| "Shen"
	| "Shyvana"
	| "Singed"
	| "Sion"
	| "Sivir"
	| "Skarner"
	| "Smolder"
	| "Sona"
	| "Soraka"
	| "Swain"
	| "Sylas"
	| "Syndra"
	| "Tahm Kench"
	| "Taliyah"
	| "Talon"
	| "Taric"
	| "Teemo"
	| "Thresh"
	| "Tristana"
	| "Trundle"
	| "Tryndamere"
	| "Twisted Fate"
	| "Twitch"
	| "Udyr"
	| "Urgot"
	| "Varus"
	| "Vayne"
	| "Veigar"
	| "Vel'Koz"
	| "Vex"
	| "Vi"
	| "Viego"
	| "Viktor"
	| "Vladimir"
	| "Volibear"
	| "Warwick"
	| "Wukong"
	| "Xayah"
	| "Xerath"
	| "Xin Zhao"
	| "Yasuo"
	| "Yone"
	| "Yorick"
	| "Yuumi"
	| "Zac"
	| "Zed"
	| "Zeri"
	| "Ziggs"
	| "Zilean"
	| "Zoe"
	| "Zyra";

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
