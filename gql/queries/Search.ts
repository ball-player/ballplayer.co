import { gql } from 'graphql-request';

export const SEARCH_QUERY = gql`
	query NewSearchQuery(
		$queryType: QueryType!
		$query: String!
		$page: Int
		$limit: Int
		$feedPreference: FeedPreference
		$languagePreference: LanguagePreference
		$contentPreference: ContentPreference
		$withPlaybacksSegments: Boolean = false
	) {
		search(
			queryType: $queryType
			languagePreference: $languagePreference
			contentPreference: $contentPreference
			feedPreference: $feedPreference
			limit: $limit
			page: $page
			query: $query
		) {
			total
			plays {
				gameDate
				id
				gamePk
				mediaPlayback {
					...MediaPlaybackFields
					__typename
				}
				__typename
			}
			__typename
		}
	}
`;
