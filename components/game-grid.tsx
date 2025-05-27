import { motion } from 'framer-motion';
import { GameCard } from '@/components/game-card';
import { type Game } from '@/types/statsapi';

interface GameGridProps {
	games: Game[];
}

export function GameGrid({ games }: GameGridProps) {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
			},
		},
	};

	return (
		<div className="space-y-6">
			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
				variants={container}
				initial="hidden"
				animate="show"
			>
				{games.map((game) => (
					<GameCard key={game.gamePk} game={game} />
				))}
			</motion.div>
		</div>
	);
}
