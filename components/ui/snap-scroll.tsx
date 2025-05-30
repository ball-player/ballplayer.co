import React, { createContext, useContext } from 'react';
import { useSnapCarousel } from 'react-snap-carousel';
import { cn } from '@/lib/utils';

const CarouselContext = createContext<{
	scrollRef: (el: HTMLElement | null) => void;
	pages: number[][];
	activePageIndex: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prev: () => void;
	next: () => void;
	goTo: (index: number) => void;
	snapPointIndexes: Set<number>;
}>({
	scrollRef: () => {},
	pages: [],
	activePageIndex: 0,
	hasPrevPage: false,
	hasNextPage: false,
	prev: () => {},
	next: () => {},
	goTo: () => {},
	snapPointIndexes: new Set(),
});

export const Carousel = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const {
		scrollRef,
		pages,
		activePageIndex,
		hasPrevPage,
		hasNextPage,
		prev,
		next,
		goTo,
		snapPointIndexes,
	} = useSnapCarousel();
	return (
		<CarouselContext.Provider
			value={{
				scrollRef,
				pages,
				activePageIndex,
				hasPrevPage,
				hasNextPage,
				prev,
				next,
				goTo,
				snapPointIndexes,
			}}
		>
			<div
				className={cn('relative', className)}
				role="region"
				aria-roledescription="carousel"
			>
				{children}
			</div>
		</CarouselContext.Provider>
	);
};

export const CarouselContent = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const { scrollRef } = useCarousel();
	return (
		<ul
			className={cn(
				'relative flex overflow-auto scrollbar scrollbar-none snap-x snap-mandatory',
				className
			)}
			ref={scrollRef}
		>
			{children}
		</ul>
	);
};

export const CarouselItem = ({
	children,
	index,
	className,
}: {
	children?: React.ReactNode;
	index: number;
	className?: string;
}) => {
	const { snapPointIndexes } = useCarousel();
	const isSnapPoint = snapPointIndexes.has(index);

	return (
		<li className={cn('flex-shrink-0', isSnapPoint ? 'snap-start' : '', className)}>
			{children}
		</li>
	);
};

export const CarouselPrevious = ({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) => {
	const { hasPrevPage, prev } = useCarousel();
	return (
		<button
			onClick={prev}
			disabled={!hasPrevPage}
			className={cn(!hasPrevPage && 'opacity-30 cursor-not-allowed', className)}
		>
			{children}
		</button>
	);
};

export const CarouselNext = ({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) => {
	const { hasNextPage, next } = useCarousel();
	return (
		<button
			onClick={next}
			disabled={!hasNextPage}
			className={cn(!hasNextPage && 'opacity-30 cursor-not-allowed', className)}
		>
			{children}
		</button>
	);
};

export const useCarousel = () => {
	const context = useContext(CarouselContext);
	if (!context) {
		throw new Error('useCarousel must be used within a CarouselProvider');
	}
	return context;
};
