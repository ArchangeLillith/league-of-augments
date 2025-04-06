export const fetchItems = async (): Promise<any[]> => {
	const res = await fetch("/api/items/");
	console.log(`res`, res);
	const augments = await res.json();
	return augments;
};
