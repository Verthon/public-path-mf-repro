import { loadEnvs } from "./config/env";

beforeAll(() => {
	process.env.NODE_ENV = "test";

	loadEnvs();
});
