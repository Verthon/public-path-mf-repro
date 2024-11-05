import dotenv from "dotenv";
import path from "path";

type EnvironmentVariable = Record<string, string>;

export const loadEnvs = (): EnvironmentVariable => {
	const environment = process.env.NODE_ENV || "prod";
	const envPath = path.resolve(process.cwd(), `.env.${environment}`);
	const result = dotenv.config({ path: envPath });

	if (result.error) {
		console.error(`Failed to load .env file: ${envPath}`, result.error);
		throw result.error;
	}

	return result.parsed || {};
};

export const mapEnvsToConfig = (envs: EnvironmentVariable): EnvironmentVariable => {
	return Object.keys(envs).reduce<EnvironmentVariable>((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(envs[next]);
		return prev;
	}, {});
};
