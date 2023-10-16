/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
		additionalData: `@import "mixins.scss"; @import "variables.scss";`,
	},
};

module.exports = nextConfig;
