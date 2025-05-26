import { gql } from 'graphql-request';

export const IMAGE_FRAGMENT = gql`
	fragment ImageFields on Image {
		altText
		title
		templateUrl
		cuts {
			aspectRatio
			width
			height
			src
			__typename
		}
	}
`;
