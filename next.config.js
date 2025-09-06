/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	reactStrictMode: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
