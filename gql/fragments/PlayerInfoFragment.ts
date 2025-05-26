import { gql } from 'graphql-request';

export const PLAYER_FRAGMENT = gql`
	fragment PlayerInfoFields on PlayerInfo {
		id
		name
		lastName
		playerHand
		mugshots {
			url
		}
	}
`;
