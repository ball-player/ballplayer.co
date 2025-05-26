import { gql } from 'graphql-request';

export const MEDIA_PLAYBACK_FRAGMENT = gql`
	fragment MediaPlaybackFields on MediaPlayback {
		id
		slug
		title
		blurb
		description
		date
		canAddToReel
		feeds {
			...FeedFields
			__typename
		}
		keywordsDisplay {
			...KeywordsDisplayFields
			__typename
		}
		translationId
		playInfo {
			...MediaPlayInfoFields
			__typename
		}
		__typename
	}
`;
