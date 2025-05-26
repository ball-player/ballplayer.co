import { gql } from 'graphql-request';

export const TEAM_INFO_FRAGMENT = gql`
	fragment TeamInfoFields on TeamInfo {
		name
		shortName
		triCode
	}
`;
