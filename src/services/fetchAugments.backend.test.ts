import { fetchAugments } from "./fetchAugments";
describe("fetchAugments", () => {
	it("returns an array of valid augments", async () => {
		const augments = await fetchAugments();

		expect(Array.isArray(augments)).toBe(true);
		expect(augments.length).toBe(169);

		const aug = augments[0];
		expect(aug).toHaveProperty("name");
		expect(aug).toHaveProperty("tier");
		expect(aug).toHaveProperty("url");
		expect(aug).toHaveProperty("tags");
		expect(typeof aug.name).toBe("string");
		expect(typeof aug.tier).toBe("string");
		expect(typeof aug.url === "string" || aug.url === null).toBe(true);
		expect(Array.isArray(aug.tags)).toBe(true);
	});
});
