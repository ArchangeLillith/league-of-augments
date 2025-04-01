import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
	preset: "ts-jest",
	testEnvironment: "node", // default, frontend overrides to jsdom
	transform: {
		"^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
	},
	setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
	moduleFileExtensions: ["ts", "tsx", "js"],
};

export default config;
