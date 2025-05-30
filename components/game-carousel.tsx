'use client';

import { GameCard } from './game-card';
import { ChevronRight } from 'lucide-react';
import { getGames } from '@/lib/api';
import { ChevronLeft } from 'lucide-react';
import { format } from 'date-fns';
import { type GameDate } from '@/types/statsapi';
import { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export function GameCarousel({ dates: initialDates }: { dates: GameDate[] }) {
	const [refetchInterval, setRefetchInterval] = useState<number | false>(false);
	const listRef = useRef<HTMLUListElement>(null);
	const initialRender = useRef(false);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	const { data, isLoading } = useQuery({
		queryKey: ['games'],
		queryFn: () => getGames(new Date()),
		refetchInterval,
	});

	const { totalGamesInProgress, dates = initialDates } = data ?? {};
	const items = dates.flatMap(({ date, games }) => [
		{
			date,
			game: null,
		},
		...games.map((game) => ({
			date,
			game,
		})),
	]);

	const today = new Date();
	const todayStr = today.toISOString().slice(0, 10);
	const startIndex = items.findIndex(
		(item) => !!item.game && item.date.startsWith(todayStr)
	);
	const ITEM_WIDTH = 204 + 16; // 204px + 16px gap (gap-4 = 1rem = 16px)
	const PAGE_SIZE = 2;

	const scrollByPage = (direction: 'left' | 'right') => {
		if (!listRef.current) return;
		const { scrollLeft } = listRef.current;
		const scrollAmount = ITEM_WIDTH * PAGE_SIZE;

		const newScrollLeft =
			direction === 'left'
				? Math.max(0, scrollLeft - scrollAmount)
				: scrollLeft + scrollAmount;

		listRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
	};

	// useEffect(() => {
	// 	if (listRef.current && startIndex !== -1 && !initialRender.current) {
	// 		initialRender.current = true;
	// 		const ul = listRef.current;
	// 		const li = ul.children[startIndex] as HTMLElement;
	// 		const firstLi = ul.children[0] as HTMLElement;
	// 		if (li && firstLi) {
	// 			const scrollPaddingLeft = 100; // px, from scroll-pl-[100px]
	// 			const relativeOffset = li.offsetLeft - firstLi.offsetLeft;
	// 			ul.scrollTo({
	// 				left: relativeOffset - scrollPaddingLeft,
	// 				behavior: 'auto',
	// 			});
	// 		}
	// 	}
	// }, [startIndex, items.length]);

	useEffect(() => {
		setRefetchInterval(totalGamesInProgress ? 1000 * 10 : false);
	}, [totalGamesInProgress]);

	useEffect(() => {
		const handleScroll = () => {
			if (!listRef.current) return;
			const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
		};

		const ul = listRef.current;
		if (ul) {
			ul.addEventListener('scroll', handleScroll);
			handleScroll();
		}
		return () => {
			if (ul) ul.removeEventListener('scroll', handleScroll);
		};
	}, [items.length]);

	return (
		<div
			className="relative py-4 before:content-[''] before:absolute before:top-0 before:left-0 before:w-[84px] before:h-full
					before:pointer-events-none before:z-20
					before:border-r"
		>
			<ul
				ref={listRef}
				className="gap-4 relative flex overflow-auto scrollbar scrollbar-none snap-x snap-mandatory scroll-pr-[116px] scroll-pl-[100px]"
			>
				{items?.map(({ date, game }, index) => {
					if (game) {
						return (
							<li key={index} className="snap-start flex-shrink-0 basis-[204px]">
								<GameCard game={game} />
							</li>
						);
					}
					if (date) {
						return (
							<li
								key={index}
								className="flex-shrink-0 snap-start flex items-center justify-center basis-[84px] sticky top-0 left-0 bg-background z-10"
							>
								<DateCard date={date} />
							</li>
						);
					}
					return null;
				})}
				<li className="flex-shrink-0 basis-[116px]" />
			</ul>
			<div className="absolute top-0 z-20 right-0 w-content px-4 bg-background border-l h-full flex items-center justify-between gap-2">
				<button
					type="button"
					onClick={() => scrollByPage('left')}
					disabled={!canScrollLeft}
					className="bg-background rounded-full border p-2 flex items-center justify-center hover:bg-primary/10 disabled:opacity-30"
				>
					<ChevronLeft className="h-5 w-5" />
				</button>
				<button
					type="button"
					onClick={() => scrollByPage('right')}
					disabled={!canScrollRight}
					className="bg-background rounded-full border p-2 flex items-center justify-center hover:bg-primary/10 disabled:opacity-30"
				>
					<ChevronRight className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
}

function DateCard({ date }: { date: string }) {
	const [year, month, day] = date.split('-');

	return (
		<span className="flex flex-col items-center">
			<span className="text-sm font-bold uppercase">
				{format(new Date(Number(year), Number(month) - 1, Number(day)), 'MMM')}
			</span>
			<span className="text-sm font-bold">
				{format(new Date(Number(year), Number(month) - 1, Number(day)), 'd')}
			</span>
		</span>
	);
}
