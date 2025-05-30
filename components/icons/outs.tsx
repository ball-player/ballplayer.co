export const Outs = ({ outs }: { outs: number }) => {
	return (
		<svg
			width="24"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 23.5 7.5"
			tabIndex={-1}
			aria-label={`${outs} Outs`}
		>
			<title>{`${outs} Outs`}</title>
			<circle
				cx="3.75"
				cy="3.75"
				r="2.5"
				fill={outs > 0 ? '#EFB21F' : 'currentColor'}
				stroke={outs > 0 ? '#EFB21F' : '#a9a9a9'}
			></circle>
			<circle
				cx="11.75"
				cy="3.75"
				r="2.5"
				fill={outs > 1 ? '#EFB21F' : 'currentColor'}
				stroke={outs > 1 ? '#EFB21F' : '#a9a9a9'}
			></circle>
			<circle
				cx="19.75"
				cy="3.75"
				r="2.5"
				fill={outs > 2 ? '#EFB21F' : 'currentColor'}
				stroke={outs > 2 ? '#EFB21F' : '#a9a9a9'}
			></circle>
		</svg>
	);
};
