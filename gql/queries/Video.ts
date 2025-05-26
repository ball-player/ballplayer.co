import { gql } from 'graphql-request';

export const VIDEO_QUERY = gql`
	query clipQuery(
		$ids: [String]
		$languagePreference: LanguagePreference
		$idType: MediaPlaybackIdType
		$forgeInstance: ForgeType = MLB
		$userId: String!
		$withUser: Boolean!
		$withPlaybacksSegments: Boolean = false
	) {
		mediaPlayback(
			ids: $ids
			languagePreference: $languagePreference
			idType: $idType
			forgeInstance: $forgeInstance
		) {
			...MediaPlaybackFields
			__typename
		}
		userInfo(userId: $userId) @include(if: $withUser) {
			firstName
			nickName
			userId
			__typename
		}
	}
`;
