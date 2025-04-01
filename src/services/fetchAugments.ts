export const fetchAugments = async (): Promise<any[]> => {
	const res = await fetch("/api/augments/");
	const augments = await res.json();
	return augments;
};
