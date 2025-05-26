import { gql } from 'graphql-request';

export const PLAYBACKS_FRAGMENT = gql`
	fragment PlaybackFields on Playback {
		name
		url
		mimetype
		segments @include(if: $withPlaybacksSegments)
	}
`;
