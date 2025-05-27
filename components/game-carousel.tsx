'use client';

import { useQuery } from '@tanstack/react-query';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { GameCard } from './game-card';
import { getGames } from '@/lib/api';
import { useEffect, useState } from 'react';

export function GameCarousel({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) {
	const [refetchInterval, setRefetchInterval] = useState<number | false>(1000 * 5);
	const { data, isLoading } = useQuery({
		queryKey: ['games'],
		queryFn: () => getGames(new Date()),
		refetchInterval,
	});

	const { totalGamesInProgress, dates } = data ?? {};
	const [{ games }] = dates ?? [{ games: [] }];

	useEffect(() => {
		if (!isLoading && !totalGamesInProgress) setRefetchInterval(false);
	}, [isLoading, totalGamesInProgress]);

	if (isLoading) return null;

	return (
		<Carousel
			opts={{ dragFree: true }}
			plugins={[WheelGesturesPlugin()]}
			className={className}
		>
			<CarouselContent className="-ml-4">
				{games.map((game) => (
					<CarouselItem
						key={game.gamePk}
						className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
					>
						<GameCard game={game} />
					</CarouselItem>
				))}
			</CarouselContent>
			{children}
		</Carousel>
	);
}
