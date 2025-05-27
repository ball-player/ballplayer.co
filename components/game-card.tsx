import { motion } from 'framer-motion';
import { type Game } from '@/types/statsapi';

import { TeamLogo } from '@/components/team-logo';
import { formatTime } from '@/lib/utils';

export function GameCard({ game }: { game: Game }) {
	const {
		gameDate,
		status: { detailedState: gameStatus },
		teams: {
			away: {
				team: { abbreviation: awayTeam },
			},
			home: {
				team: { abbreviation: homeTeam },
			},
		},
		linescore: {
			currentInning,
			teams: {
				away: { runs: awayTeamRuns },
				home: { runs: homeTeamRuns },
			},
			offense: { first, second, third },
		},
		broadcasts: [broadcast],
		tickets: [ticket] = [],
	} = game;

	const isLive = gameStatus === 'Live';
	const isPreview = gameStatus === 'Preview';
	const hasScores = awayTeamRuns !== undefined && homeTeamRuns !== undefined;

	return (
		<div className="bg-background rounded-xl border shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer overflow-hidden">
			{/* Header */}
			<div className="px-4 py-2 flex items-center justify-between text-sm">
				<div className="flex items-center gap-2">
					{isLive && (
						<div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
					)}
					{isPreview ? formatTime(gameDate) : gameStatus}
				</div>
			</div>

			<div className="p-4 space-y-4">
				{/* Teams & Scores */}
				<div className="space-y-3">
					{/* Away Team */}
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-3 flex-1">
							<TeamLogo code={awayTeam} />
							{awayTeam}
						</div>
						{hasScores && (
							<div className="text-2xl font-bold tabular-nums w-8 text-right">
								{awayTeamRuns}
							</div>
						)}
					</div>

					{/* Home Team */}
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-3 flex-1">
							<TeamLogo code={homeTeam} />
							{homeTeam}
						</div>
						{hasScores && (
							<div className="text-2xl font-bold tabular-nums w-8 text-right">
								{homeTeamRuns}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
