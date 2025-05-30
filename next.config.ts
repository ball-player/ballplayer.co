import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.mlbstatic.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'content.mlb.com',
				port: '',
				pathname: '/**',
			},
		],
	},
	experimental: {
		inlineCss: true,
	},
};

export default nextConfig;
