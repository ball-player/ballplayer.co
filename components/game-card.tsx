import { useEffect, useRef } from 'react';
import NumberFlow from '@number-flow/react';

import { TeamLogo } from '@/components/team-logo';
import { Bases } from '@/components/icons/bases';
import { Outs } from '@/components/icons/outs';
import {
	cn,
	formatTime,
	getBatterGameStats,
	getGameState,
	getPitcherGameStats,
	getPitcherSingleSeasonStats,
	getPlayerAvatarUrl,
	isFreeGameOfTheDay,
	isUserFollowingPlayer,
	toInningHalfDisplay,
} from '@/lib/utils';
import { type Game } from '@/types/statsapi';
import { Triangle } from './icons/triangle';
import { CircleUserRound, Tickets, Tv } from 'lucide-react';
import Image from 'next/image';

export function GameCard({ game }: { game: Game }) {
	const {
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
		tickets: [ticket] = [],
		flags: { noHitter, perfectGame },
	} = game;
	const { outs, teams, offense, isTopInning } = linescore ?? {};
	const { batter, first, second, third } = offense ?? {};
	const runners = {
		first: !!first,
		second: !!second,
		third: !!third,
	};

	const { away, home } = teams ?? {};
	const { runs: awayTeamRuns } = away ?? {};
	const { runs: homeTeamRuns } = home ?? {};

	const prevAwayTeamRuns = useRef(awayTeamRuns);
	const prevHomeTeamRuns = useRef(homeTeamRuns);

	const { isFinal, isLive, isPreview } = getGameState(game);
	const isFree = isFreeGameOfTheDay(game);
	const isUserFollowingBatter = isUserFollowingPlayer(batter);

	const hasScores = awayTeamRuns !== undefined && homeTeamRuns !== undefined;
	const isHomeTeamWinning = hasScores && homeTeamRuns > awayTeamRuns;

	const awayTeamWinnerFontClass = !isHomeTeamWinning
		? 'font-bold'
		: 'text-muted-foreground';

	const awayTeamHittingFontClass = isLive && isTopInning ? 'font-bold' : '';

	const awayTeamFontClass = isFinal
		? awayTeamWinnerFontClass
		: awayTeamHittingFontClass;

	const homeTeamWinnerFontClass = isHomeTeamWinning
		? 'font-bold'
		: 'text-muted-foreground';

	const homeTeamHittingFontClass = isLive && !isTopInning ? 'font-bold' : '';

	const homeTeamFontClass = isFinal
		? homeTeamWinnerFontClass
		: homeTeamHittingFontClass;

	const { home: ticketLinkUrl } = ticket?.ticketLinks ?? {};

	useEffect(() => {
		if (
			prevAwayTeamRuns.current !== undefined &&
			(awayTeamRuns ?? 0) > prevAwayTeamRuns.current
		) {
			// show toast if user is following the team
		}
		prevAwayTeamRuns.current = awayTeamRuns;
	}, [awayTeamRuns, awayTeam]);

	useEffect(() => {
		if (
			prevHomeTeamRuns.current !== undefined &&
			(homeTeamRuns ?? 0) > prevHomeTeamRuns.current
		) {
			// show toast if user is following the team
		}
		prevHomeTeamRuns.current = homeTeamRuns;
	}, [homeTeamRuns, homeTeam]);

	return (
		<div
			className={cn(
				'group bg-background rounded-xl border shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer overflow-hidden p-3 relative isolate',
				isLive && isUserFollowingBatter && 'animate-border-pulse'
			)}
		>
			<div className="flex flex-col gap-3">
				{/* Header */}
				<div className="flex items-center justify-between">
					<GameState game={game} />

					<div className="flex items-center gap-2">
						{isFree && !isFinal && (
							<div className="text-xs text-success tabular-nums text-right rounded-full">
								<Tv className="w-4 h-4" />
							</div>
						)}

						{isPreview && ticketLinkUrl && (
							<div className="text-xs text-muted-foreground tabular-nums text-right rounded-full relative z-20">
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
								<p className={cn('text-sm', awayTeamFontClass)}>{awayTeam}</p>
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
											awayTeamFontClass
										)}
									>
										<NumberFlow value={awayTeamRuns} />
										{isFinal && awayTeamRuns > homeTeamRuns && (
											<Triangle
												size={12}
												className="w-4 h-4 absolute right-[-18px] rotate-180 z-20"
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
								<p className={cn('text-sm', homeTeamFontClass)}>{homeTeam}</p>
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
											homeTeamFontClass
										)}
									>
										<NumberFlow value={homeTeamRuns} />
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

			{(isPreview || isLive || isFinal) && (
				<div
					className="
				absolute top-0 left-0 w-full h-full bg-background/80 backdrop-blur-sm z-10 p-3 rounded-xl
				opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200
			"
				>
					<HoveredGameState game={game} />
				</div>
			)}
		</div>
	);
}

function GameState({ game }: { game: Game }) {
	const {
		status: { abstractGameState },
		gameDate,
		linescore,
	} = game;
	const { currentInning, inningState } = linescore ?? {};
	const { isFinal, isLive, isPreview, isPostponed } = getGameState(game);

	if (isFinal) {
		return <span className="text-xs font-bold">Final</span>;
	}

	if (isLive) {
		return (
			<span className="text-xs text-muted-foreground">{`${toInningHalfDisplay(
				inningState
			)} ${currentInning}`}</span>
		);
	}

	if (isPostponed) {
		return <span className="text-xs font-bold">Postponed</span>;
	}

	if (isPreview) {
		return (
			<span className="text-xs text-muted-foreground">{formatTime(gameDate)}</span>
		);
	}

	return <span className="text-xs font-bold">{abstractGameState}</span>;
}

function HoveredGameState({ game }: { game: Game }) {
	const {
		teams: {
			away: {
				team: { abbreviation: awayTeam },
				probablePitcher: awayPitcher,
			},
			home: {
				team: { abbreviation: homeTeam },
				probablePitcher: homePitcher,
			},
		},
		linescore,
		flags: { noHitter, perfectGame },
		statusFlags,
	} = game;
	const { isFinal, isLive, isPreview } = statusFlags ?? {};
	const { offense, defense, isTopInning, teams } = linescore ?? {};
	const { batter } = offense ?? {};
	const { pitcher } = defense ?? {};

	const { away, home } = teams ?? {};

	const awayPitcherStats = getPitcherSingleSeasonStats(awayPitcher);
	const homePitcherStats = getPitcherSingleSeasonStats(homePitcher);

	const currentPitcherStats = getPitcherGameStats(pitcher);
	const currentBatterStats = getBatterGameStats(batter);

	const hasScores = away.runs !== undefined && home.runs !== undefined;
	const isHomeTeamWinning = hasScores && home.runs! > away.runs!;

	const homeTeamWinnerFontClass = isHomeTeamWinning
		? 'font-bold'
		: 'text-muted-foreground';
	const awayTeamWinnerFontClass = !isHomeTeamWinning
		? 'font-bold'
		: 'text-muted-foreground';

	if (isFinal) {
		return (
			<div className="flex flex-col gap-3">
				{/* Header */}
				<div className="flex items-center justify-between">
					<GameState game={game} />

					<div className="flex items-center gap-2">
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
								<p className={cn('text-sm', awayTeamWinnerFontClass)}>{awayTeam}</p>
							</div>
						</div>

						{/* Home Team */}
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-3 flex-1">
								<TeamLogo code={homeTeam} className="w-6 h-6" />
								<p className={cn('text-sm', homeTeamWinnerFontClass)}>{homeTeam}</p>
							</div>
						</div>
					</div>

					<div className="flex justify-end gap-2 w-full">
						<div className="flex flex-col gap-2 items-center">
							<span className={awayTeamWinnerFontClass}>{away.runs}</span>
							<span className={homeTeamWinnerFontClass}>{home.runs}</span>
						</div>

						<div className="flex flex-col gap-2 items-center">
							<span className={awayTeamWinnerFontClass}>{away.hits}</span>
							<span className={homeTeamWinnerFontClass}>{home.hits}</span>
						</div>

						<div className="flex flex-col gap-2 items-center">
							<span className={awayTeamWinnerFontClass}>{away.errors}</span>
							<span className={homeTeamWinnerFontClass}>{home.errors}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (isLive) {
		return (
			<div className="flex flex-col gap-3">
				<div
					className={cn(
						'flex gap-2 w-full',
						!isTopInning ? 'flex-col' : 'flex-col-reverse'
					)}
				>
					<div className="flex items-center gap-3 flex-1">
						{pitcher ? (
							<Image
								src={getPlayerAvatarUrl(pitcher, { size: 60 })}
								alt={pitcher?.fullName}
								width={24}
								height={24}
								className="rounded-full"
							/>
						) : (
							<div className="p-1">
								<CircleUserRound className="w-4 h-4" />
							</div>
						)}

						<div className="flex flex-col gap-1 overflow-hidden">
							<p className="text-sm truncate">{pitcher?.fullName ?? 'TBA'}</p>

							{currentPitcherStats && (
								<p className="text-tiny text-muted-foreground tabular-nums truncate">
									{currentPitcherStats?.summary}
								</p>
							)}
						</div>
					</div>

					<div className="flex items-center gap-3 flex-1">
						{batter ? (
							<Image
								src={getPlayerAvatarUrl(batter, { size: 60 })}
								alt={batter?.fullName}
								width={24}
								height={24}
								className="rounded-full"
							/>
						) : (
							<div className="p-1">
								<CircleUserRound className="w-4 h-4" />
							</div>
						)}

						<div className="flex flex-col gap-1 overflow-hidden">
							<p className="text-sm truncate">{batter?.fullName ?? 'TBA'}</p>
							{currentBatterStats && (
								<p className="text-tiny text-muted-foreground tabular-nums truncate">
									{currentBatterStats?.summary}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (isPreview) {
		return (
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex items-center gap-3 flex-1">
						{awayPitcher ? (
							<Image
								src={getPlayerAvatarUrl(awayPitcher, { size: 60 })}
								alt={awayPitcher?.fullName}
								width={24}
								height={24}
								className="rounded-full"
							/>
						) : (
							<div className="p-1">
								<CircleUserRound className="w-4 h-4" />
							</div>
						)}

						<div className="flex flex-col gap-1 pr-6 overflow-hidden">
							<p className="text-sm truncate">{awayPitcher?.fullName ?? 'TBA'}</p>

							{awayPitcherStats && (
								<p className="text-tiny text-muted-foreground tabular-nums truncate">
									{awayPitcherStats?.summary}
								</p>
							)}
						</div>
					</div>

					<div className="flex items-center gap-4">
						<div className="flex items-center gap-3 flex-1">
							{homePitcher ? (
								<Image
									src={getPlayerAvatarUrl(homePitcher, { size: 60 })}
									alt={homePitcher?.fullName}
									width={24}
									height={24}
									className="rounded-full"
								/>
							) : (
								<div className="p-1">
									<CircleUserRound className="w-4 h-4" />
								</div>
							)}

							<div className="flex flex-col gap-1 overflow-hidden">
								<p className="text-sm truncate">{homePitcher?.fullName ?? 'TBA'}</p>
								{homePitcherStats && (
									<p className="text-tiny text-muted-foreground tabular-nums truncate">
										{homePitcherStats?.summary}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return null;
}
