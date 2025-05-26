import { gql } from 'graphql-request';

export const KEYWORDS_DISPLAY_FRAGMENT = gql`
	fragment KeywordsDisplayFields on KeywordDisplay {
		slug
		displayName
	}
`;
