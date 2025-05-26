import { gql } from 'graphql-request';

export const RUNNERS_FRAGMENT = gql`
	fragment RunnersFields on Runners {
		first
		second
		third
	}
`;
