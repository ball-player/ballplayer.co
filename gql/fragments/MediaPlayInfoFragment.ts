import { gql } from 'graphql-request';

export const PLAY_INFO_FRAGMENT = gql`
	fragment MediaPlayInfoFields on MediaPlayInfo {
		isSinglePlay
		balls
		strikes
		outs
		inning
		inningHalf
		pitchSpeed
		pitchType
		exitVelocity
		hitDistance
		launchAngle
		spinRate
		scoreDifferential
		gamePk
		runners {
			...RunnersFields
			__typename
		}
		teams {
			away {
				...TeamInfoFields
				__typename
			}
			home {
				...TeamInfoFields
				__typename
			}
			batting {
				...TeamInfoFields
				__typename
			}
			pitching {
				...TeamInfoFields
				__typename
			}
			__typename
		}
		players {
			pitcher {
				...PlayerInfoFields
				__typename
			}
			batter {
				...PlayerInfoFields
				__typename
			}
			__typename
		}
	}
`;
