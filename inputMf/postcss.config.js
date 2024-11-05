/**
 * @type {import('postcss').ProcessOptions}
 */
const config = {
	plugins: [["postcss-preset-env", "autoprefixer"]],
};

module.exports = config;
