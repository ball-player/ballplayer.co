import Image from 'next/image';

export function TeamLogo({ code }: { code: string }) {
	return (
		<Image
			src={`/logos/${code.toLowerCase()}.svg`}
			alt={code}
			width={20}
			height={20}
		/>
	);
}
