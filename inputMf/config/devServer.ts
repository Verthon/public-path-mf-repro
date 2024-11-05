import path from "path";
import { WebpackConfiguration } from "webpack-dev-server";

const defaultPort = Number(process.env.PORT) || 8082;

export const createDevServerConfig = (): WebpackConfiguration["devServer"] => ({
	historyApiFallback: {
		disableDotRule: true,
		index: "/",
	},
	client: {
		overlay: false,
		logging: "info",
	},
	static: {
		directory: path.resolve(process.cwd(), "public"),
		serveIndex: true,
		watch: true,
	},
	liveReload: false,
	hot: true,
	open: false,
  port: defaultPort,
});
