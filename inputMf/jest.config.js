/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
	transform: {
		"^.+\\.(t|j)sx?$": "@swc/jest",
	},
	resetMocks: true,
	setupFilesAfterEnv: ['<rootDir>/testSetup.ts'],
	verbose: true,
};

module.exports = config;
