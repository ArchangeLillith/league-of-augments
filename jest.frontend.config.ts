import base from "./jest.config";

export default {
	...base,
	testEnvironment: "jsdom",
	testMatch: ["**/*.frontend.test.tsx"],
};
