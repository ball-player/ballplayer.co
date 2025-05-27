import '../config';

import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: process.env.NEXT_PUBLIC_MLB_API_URL,
	documents: ['gql/{fragments,queries,mutations}/*.ts'],
	config: {
		reactQueryVersion: 5,
		addInfiniteQuery: true,
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
