import { RunnersFieldsFragment } from '@/gql/generated';

export function Bases({ runners }: { runners?: RunnersFieldsFragment | null }) {
	const { first, second, third } = runners ?? {};

	return (
		<svg
			width="24"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 16.25"
			aria-label="base"
		>
			<title>Bases.</title>
			<rect
				fill={third ? '#EFB21F' : 'currentColor'}
				strokeWidth="1"
				stroke={third ? '#EFB21F' : 'currentColor'}
				width="6"
				height="6"
				transform="translate(5, 7.25) rotate(-315)"
				rx="1px"
				ry="1px"
			></rect>
			<rect
				fill={second ? '#EFB21F' : 'currentColor'}
				strokeWidth="1"
				stroke={second ? '#EFB21F' : 'currentColor'}
				width="6"
				height="6"
				transform="translate(12, 0.5) rotate(-315)"
				rx="1px"
				ry="1px"
			></rect>
			<rect
				fill={first ? '#EFB21F' : 'currentColor'}
				strokeWidth="1"
				stroke={first ? '#EFB21F' : 'currentColor'}
				width="6"
				height="6"
				transform="translate(19, 7.25) rotate(-315)"
				rx="1px"
				ry="1px"
			></rect>
		</svg>
	);
}
