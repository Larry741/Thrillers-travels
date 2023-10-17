/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
		additionalData: `@import "mixins.scss"; @import "variables.scss";`,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.contexttravel.com",
				port: "",
				pathname: "/**",
			},
		],
		deviceSizes: [320, 420, 768, 1024, 1200],
		imageSizes: [16, 32, 48, 64, 96],
	},
};

module.exports = nextConfig;
