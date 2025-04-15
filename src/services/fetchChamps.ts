export type Champion = {
	id: string;
	name: string;
	title: string;
	image: {
		full: string;
	};
};

export const fetchChampions = async (): Promise<Champion[]> => {
	const version = "15.6.1"; // update this as needed
	const res = await fetch(
		`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
	);
	const json = await res.json();

	const champions: Champion[] = Object.values(json.data);
	return champions;
};
