import { TeamLogo } from '@/components/team-logo';
import { Bases } from '@/components/icons/bases';
import { Outs } from '@/components/icons/outs';
import { cn, formatTime } from '@/lib/utils';
import { type Game } from '@/types/statsapi';
import { Triangle } from './icons/triangle';
import { Ticket, Tickets, Tv } from 'lucide-react';

function GameState({ game }: { game: Game }) {
	const {
		status: { detailedState, abstractGameState },
		gameDate,
		linescore,
	} = game;
	const { currentInning, inningHalf } = linescore ?? {};

	const isPostponed = detailedState === 'Postponed';
	const isFinal = abstractGameState === 'Final' && !isPostponed;
	const isLive = abstractGameState === 'Live';
	const isScheduled = abstractGameState === 'Preview';

	if (isFinal) {
		return <span className="text-xs font-bold">Final</span>;
	}

	if (isLive) {
		return (
			<span className="text-xs text-muted-foreground">{`${
				inningHalf === 'Bottom' ? 'Bot' : 'Top'
			} ${currentInning}`}</span>
		);
	}

	if (isPostponed) {
		return <span className="text-xs font-bold">Postponed</span>;
	}

	if (isScheduled) {
		return (
			<span className="text-xs text-muted-foreground">{formatTime(gameDate)}</span>
		);
	}

	return <span className="text-xs font-bold">{abstractGameState}</span>;
}

export function GameCard({ game }: { game: Game }) {
	const {
		status: { abstractGameState },
		teams: {
			away: {
				team: { abbreviation: awayTeam },
				leagueRecord: { wins: awayTeamWins, losses: awayTeamLosses },
			},
			home: {
				team: { abbreviation: homeTeam },
				leagueRecord: { wins: homeTeamWins, losses: homeTeamLosses },
			},
		},
		linescore,
		broadcasts: [broadcast],
		tickets: [ticket] = [],
		flags: { noHitter, perfectGame },
	} = game;
	const { outs, teams, offense: { first, second, third } = {} } = linescore ?? {};
	const runners = {
		first: !!first,
		second: !!second,
		third: !!third,
	};

	const { away: { runs: awayTeamRuns } = {}, home: { runs: homeTeamRuns } = {} } =
		teams ?? {};

	const hasScores = awayTeamRuns !== undefined && homeTeamRuns !== undefined;
	const isLive = abstractGameState === 'Live';
	const isFinal = abstractGameState === 'Final';
	const isScheduled = abstractGameState === 'Preview';
	const isFree = broadcast?.freeGame;

	const { home: ticketLinkUrl } = ticket?.ticketLinks ?? {};

	return (
		<div className="bg-background rounded-xl border shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer overflow-hidden p-3 flex flex-col gap-3">
			{/* Header */}
			<div className="flex items-center justify-between">
				<GameState game={game} />

				<div className="flex items-center gap-2">
					{isFree && !isFinal && (
						<div className="text-xs text-success tabular-nums text-right rounded-full">
							<Tv className="w-4 h-4" />
						</div>
					)}

					{isScheduled && ticketLinkUrl && (
						<div className="text-xs text-muted-foreground tabular-nums text-right rounded-full">
							<a href={ticketLinkUrl} target="_blank" rel="noopener noreferrer">
								<Tickets className="w-4 h-4" />
							</a>
						</div>
					)}

					{noHitter && !perfectGame && (
						<div className="text-xs font-bold tabular-nums text-right rounded-full">
							🚨 No hitter
						</div>
					)}

					{perfectGame && (
						<div className="text-xs font-bold tabular-nums text-right rounded-full">
							🚨 Perfect game
						</div>
					)}
				</div>
			</div>

			<div className="flex items-center justify-between gap-4">
				{/* Teams & Scores */}
				<div className="flex flex-col gap-2 w-full">
					{/* Away Team */}
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-3 flex-1">
							<TeamLogo code={awayTeam} className="w-6 h-6" />
							<p
								className={cn(
									'text-sm',
									hasScores && homeTeamRuns !== awayTeamRuns
										? homeTeamRuns < awayTeamRuns
											? 'font-bold'
											: 'text-muted-foreground'
										: ''
								)}
							>
								{awayTeam}
							</p>
						</div>

						<div className="flex gap-3 items-center">
							{!isLive && (
								<div className="text-xs text-muted-foreground tabular-nums text-right">
									{awayTeamWins}-{awayTeamLosses}
								</div>
							)}
							{hasScores && (
								<div
									className={cn(
										'text-sm tabular-nums text-right relative flex items-center justify-end',
										homeTeamRuns !== awayTeamRuns
											? awayTeamRuns > homeTeamRuns
												? 'font-bold'
												: 'text-muted-foreground'
											: ''
									)}
								>
									{awayTeamRuns}
									{isFinal && awayTeamRuns > homeTeamRuns && (
										<Triangle
											size={12}
											className="w-4 h-4 absolute right-[-18px] rotate-180"
										/>
									)}
								</div>
							)}
						</div>
					</div>

					{/* Home Team */}
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-3 flex-1">
							<TeamLogo code={homeTeam} className="w-6 h-6" />
							<p
								className={cn(
									'text-sm',
									hasScores && homeTeamRuns !== awayTeamRuns
										? homeTeamRuns > awayTeamRuns
											? 'font-bold'
											: 'text-muted-foreground'
										: ''
								)}
							>
								{homeTeam}
							</p>
						</div>
						<div className="flex gap-3 items-center">
							{!isLive && (
								<div className="text-xs text-muted-foreground tabular-nums text-right">
									{homeTeamWins}-{homeTeamLosses}
								</div>
							)}
							{hasScores && (
								<div
									className={cn(
										'text-sm tabular-nums text-right relative flex items-center justify-end',
										homeTeamRuns !== awayTeamRuns
											? homeTeamRuns > awayTeamRuns
												? 'font-bold'
												: 'text-muted-foreground'
											: ''
									)}
								>
									{homeTeamRuns}
									{isFinal && homeTeamRuns > awayTeamRuns && (
										<Triangle
											size={12}
											className="w-4 h-4 absolute right-[-18px] rotate-180"
										/>
									)}
								</div>
							)}
						</div>
					</div>
				</div>

				{isLive && (
					<div className="flex flex-col gap-2 font-background text-white dark:text-black">
						<Bases runners={runners} />
						<Outs outs={outs} />
					</div>
				)}
			</div>
		</div>
	);
}
