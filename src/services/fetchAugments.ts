export const fetchAugments = async (): Promise<any[]> => {
	const res = await fetch("http://localhost:3001/api/augments/");
	const augments = await res.json();
	return augments;
};
