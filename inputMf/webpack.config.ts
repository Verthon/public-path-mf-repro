import path from "path";
import { type Configuration, DefinePlugin, container } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import { loadEnvs, mapEnvsToConfig } from "./config/env";
import { createDevServerConfig } from "./config/devServer";

import pkg from "./package.json";

const createBundleAnalyzerConfig = () => {
	const isAnalyzeMode = process.env.ANALYZE_BUILD;
	const config: BundleAnalyzerPlugin["opts"] = isAnalyzeMode
		? { analyzerMode: "server" }
		: { analyzerMode: "disabled" };

	return config;
};

const createWebpackConfig = (mode: Configuration["mode"]): Configuration => {
	const envs = loadEnvs();
	const envsConfig = mapEnvsToConfig(envs);
	const bundleAnalyzerConfig = createBundleAnalyzerConfig();

	return {
		mode: mode,
		entry: path.resolve(process.cwd(), "src/Input.tsx"),
		module: {
			rules: [
				{
					test: /\.(js|mjs|ts|tsx)$/,
					include: path.resolve(process.cwd(), "src"),
					loader: "babel-loader",
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: "asset/resource",
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: "asset/resource",
				},
				{
					test: /\.css$/i,
					use: [
						mode === "production"
							? MiniCssExtractPlugin.loader
							: "style-loader",
						"css-loader",
						"postcss-loader",
					],
				},
			],
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js"],
		},
		...(mode === "development"
			? {
					devServer: createDevServerConfig(),
			  }
			: {}),
		output: {
			path: path.resolve(process.cwd(), "dist"),
			publicPath: "auto",
			clean: true,
		},
		plugins: [
			new DefinePlugin(envsConfig),
			new HtmlWebpackPlugin({
				inject: true,
				template: path.resolve(process.cwd(), "public/index.html"),
			}),
			mode === "production" && new MiniCssExtractPlugin(),
			mode === "production" && new CssMinimizerPlugin(),
			mode === "production" && new BundleAnalyzerPlugin(bundleAnalyzerConfig),

			new container.ModuleFederationPlugin({
				name: "input",
				filename: "remoteEntry.js",
				exposes: {
					"./Input": "./src/Input.tsx",
				},
				shared: {
					react: {
						singleton: true,
						requiredVersion: pkg.dependencies["react"],
					},
					"react-dom": {
						singleton: true,
						requiredVersion: pkg.dependencies["react-dom"],
					},
				},
			}),
		],
	};
};

export default createWebpackConfig;
