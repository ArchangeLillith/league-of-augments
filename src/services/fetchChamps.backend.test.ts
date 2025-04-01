import { fetchChampions } from "./fetchChamps";
describe("fetchChampions", () => {
	it("returns an array of valid champions", async () => {
		const champions = await fetchChampions();

		expect(Array.isArray(champions)).toBe(true);
		expect(champions.length).toBeGreaterThan(167);

		const champ = champions[0];
		expect(champ).toHaveProperty("id");
		expect(champ).toHaveProperty("name");
		expect(champ).toHaveProperty("image");
		expect(typeof champ.name).toBe("string");
		expect(typeof champ.image.full).toBe("string");
	});
});
