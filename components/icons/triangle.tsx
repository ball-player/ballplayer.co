export const Triangle = ({
	size = 24,
	className,
}: {
	size?: number;
	className?: string;
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path d="M8 6L16 12L8 18Z" fill="currentColor" />
		</svg>
	);
};
