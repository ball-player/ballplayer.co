import type { CodegenConfig } from '@graphql-codegen/cli';

const API_URL = 'https://fastball-gateway.mlb.com/graphql';

const config: CodegenConfig = {
	schema: API_URL,
	documents: ['gql/{fragments,queries,mutations}/*.ts'],
	config: {
		reactQueryVersion: 5,
		addInfiniteQuery: true,
		fetcher: {
			endpoint: API_URL,
			fetchParams: {
				method: 'POST',
				headers: {
					accept: '*/*',
					'accept-language': 'en-US,en;q=0.9',
					'content-type': 'text/plain;charset=UTF-8',
				},
			},
		},
	},
	generates: {
		'./gql/generated/index.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
		},
		'./gql/generated/schema.json': {
			plugins: ['introspection'],
		},
	},
};

export default config;
