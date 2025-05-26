import { gql } from 'graphql-request';

export const FEED_FRAGMENT = gql`
	fragment FeedFields on Feed {
		type
		duration
		closedCaptions
		playbacks {
			...PlaybackFields
			__typename
		}
		image {
			...ImageFields
			__typename
		}
	}
`;
