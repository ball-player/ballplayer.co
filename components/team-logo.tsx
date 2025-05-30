import Image from 'next/image';
import { cn } from '@/lib/utils';

export function TeamLogo({
	code,
	size = 24,
	className,
}: {
	code: string;
	size?: number;
	className?: string;
}) {
	return (
		<Image
			src={`/logos/${code.toLowerCase()}.svg`}
			alt={code}
			width={size}
			height={size}
			className={className}
		/>
	);
}
