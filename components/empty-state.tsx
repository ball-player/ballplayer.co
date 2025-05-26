'use client';

import { useSearch } from '@/components/search-provider';
import { Button } from '@/components/ui/button';
import { SearchX, Baseline as Baseball } from 'lucide-react';
import { motion } from 'framer-motion';

export function EmptyState() {
	const { searchTerm, setSearchTerm } = useSearch();

	const handleSetDefault = () => {
		setSearchTerm('mlb highlights 2024');
	};

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			className="flex flex-col items-center justify-center py-16 text-center"
			variants={container}
			initial="hidden"
			animate="show"
		>
			<motion.div variants={item} className="rounded-full bg-muted p-6 mb-6">
				{searchTerm ? (
					<SearchX className="h-12 w-12 text-muted-foreground" />
				) : (
					<Baseball className="h-12 w-12 text-muted-foreground" />
				)}
			</motion.div>

			<motion.h2 variants={item} className="text-2xl font-bold mb-3">
				{searchTerm ? 'No videos found' : 'Search for MLB videos'}
			</motion.h2>

			<motion.p variants={item} className="text-muted-foreground max-w-md mb-6">
				{searchTerm
					? `We couldn't find any videos matching "${searchTerm}". Try a different search term or browse popular highlights.`
					: 'Enter a search term above to find MLB videos, highlights, and memorable moments.'}
			</motion.p>

			<motion.div variants={item}>
				{searchTerm ? (
					<div className="flex flex-wrap gap-2 justify-center">
						<Button variant="outline" onClick={() => setSearchTerm('home runs')}>
							Home Runs
						</Button>
						<Button variant="outline" onClick={() => setSearchTerm('grand slam')}>
							Grand Slams
						</Button>
						<Button variant="outline" onClick={() => setSearchTerm('walk off')}>
							Walk Offs
						</Button>
						<Button variant="outline" onClick={() => setSearchTerm('strikeout')}>
							Strikeouts
						</Button>
					</div>
				) : (
					<Button onClick={handleSetDefault}>Browse Recent Highlights</Button>
				)}
			</motion.div>
		</motion.div>
	);
}
