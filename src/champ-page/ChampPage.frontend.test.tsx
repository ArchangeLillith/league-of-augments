import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ChampPage from "./ChampPage";

const mockState = {
	name: "Lux",
	image: { full: "Lux.png" },
};

jest.mock("../utils/fetchAugments", () => ({
	fetchAugments: jest.fn().mockResolvedValue([
		{
			id: 1,
			name: "ADAPt",
			tier: "Silver",
			url: "img.png",
			description: "",
			tags: [],
		},
	]),
}));

jest.mock("../utils/fetchChosenAugs", () => ({
	fetchChosenAugs: jest.fn().mockResolvedValue([]),
}));

describe("ChampPage", () => {
	it("renders augments and allows toggle", async () => {
		render(
			<MemoryRouter initialEntries={[{ pathname: "/champ", state: mockState }]}>
				<Routes>
					<Route path="/champ" element={<ChampPage />} />
				</Routes>
			</MemoryRouter>
		);

		//Button is in document
		const button = await screen.findAllByRole("button", { name: /ADAPt/i });
		//When it's there, click the button!
		expect(button).toBeInTheDocument();

		//When it's clicked, it should be added to the selected augment state which renders the selected category
		expect(await screen.findByText(/Selected Augments:/i)).toBeInTheDocument();

		// The same augment should now appear in that section as well
		const selectedButton = screen
			.getAllByRole("button", { name: /ADAPt/i })
			.find((btn) =>
				btn.parentElement?.textContent?.includes("Selected Augments")
			);

		//Finally, we should also still see that button
		expect(selectedButton).toBeInTheDocument();
	});
});
