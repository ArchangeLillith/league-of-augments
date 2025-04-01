const backendBase = require("./jest.config.js");

module.exports = {
	...backendBase,
	testEnvironment: "node",
	testMatch: ["**/*.backend.test.ts", "**/*.api.test.ts"],
};
