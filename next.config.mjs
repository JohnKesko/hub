import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.wikimedia.org",
				port: "443",
				pathname: "*",
			},
			{
				protocol: "https",
				hostname: "*.geeksforgeeks.org",
				port: "443",
				pathname: "*",
			},
		],
	},
	output: "export",
};

export default withMDX(nextConfig);
