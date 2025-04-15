export const fetchAugments = async (tags = false): Promise<any[]> => {
	if (tags) {
		const res = await fetch("/api/augments/includeTags");
		const augments = await res.json();
		return augments;
	} else {
		const res = await fetch("/api/augments/");
		const augments = await res.json();
		return augments;
	}
};
