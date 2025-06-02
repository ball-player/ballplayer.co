import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import {
	ImageFieldsFragment,
	MediaPlaybackFieldsFragment,
	PlayerInfoFieldsFragment,
} from '@/gql/generated';
import {
	Game,
	PitchingStats,
	HittingStats,
	PlayerDetails,
	PlayerDetailsWithStats,
	DivisionStandings,
} from '@/types/statsapi';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
	try {
		const date = new Date(dateString);
		return format(date, 'MMM d, yyyy');
	} catch (error) {
		return dateString;
	}
}

export function formatDuration(duration: string): string {
	const [hours, minutes, seconds] = duration.split(':');
	if (Number(hours) > 0) {
		return `${hours}:${minutes}:${seconds}`;
	}
	return `${minutes}:${seconds}`;
}

export function getTeamColor(teamCode: string): string {
	const teamColors: Record<string, string> = {
		BAL: '#DF4601', // Orioles
		BOS: '#BD3039', // Red Sox
		NYY: '#003087', // Yankees
		TB: '#092C5C', // Rays
		TOR: '#134A8E', // Blue Jays
		CHW: '#27251F', // White Sox
		CLE: '#00385D', // Guardians
		DET: '#0C2340', // Tigers
		KC: '#004687', // Royals
		MIN: '#002B5C', // Twins
		HOU: '#002D62', // Astros
		LAA: '#BA0021', // Angels
		OAK: '#003831', // Athletics
		SEA: '#0C2C56', // Mariners
		TEX: '#003278', // Rangers
		ATL: '#CE1141', // Braves
		MIA: '#00A3E0', // Marlins
		NYM: '#002D72', // Mets
		PHI: '#E81828', // Phillies
		WSH: '#AB0003', // Nationals
		CHC: '#0E3386', // Cubs
		CIN: '#C6011F', // Reds
		MIL: '#12284B', // Brewers
		PIT: '#27251F', // Pirates
		STL: '#C41E3A', // Cardinals
		ARI: '#A71930', // Diamondbacks
		COL: '#33006F', // Rockies
		LAD: '#005A9C', // Dodgers
		SD: '#2F241D', // Padres
		SF: '#FD5A1E', // Giants
	};

	return teamColors[teamCode] || '#333333';
}

export function generatePlaceholderImage(width: number, height: number): string {
	return `https://via.placeholder.com/${width}x${height}/333333/FFFFFF?text=MLB`;
}

export function getImageUrl(imageObj: ImageFieldsFragment, width = 640): string {
	if (!imageObj?.cuts || !imageObj.cuts.length) {
		return generatePlaceholderImage(width, Math.floor(width * 0.5625));
	}

	// Sort by width and find the best match
	const sortedCuts = [...imageObj.cuts].sort(
		(a, b) => (a?.width ?? 0) - (b?.width ?? 0)
	);
	const bestCut =
		sortedCuts.find((cut) => (cut?.width ?? 0) >= width) ||
		sortedCuts[sortedCuts.length - 1];

	return bestCut?.src ?? '';
}

export function getPlayerAvatar(player: PlayerInfoFieldsFragment): string {
	const [avatar] = player.mugshots ?? [];
	return avatar?.url ?? '';
}

export function getPlayerAvatarUrl(
	player: { id: number },
	options: { size: number } = { size: 60 }
): string {
	return player?.id
		? `https://content.mlb.com/images/headshots/current/${options.size}x${options.size}/${player.id}.png`
		: '';
}

export function getPitcherSingleSeasonStats(
	player: PlayerDetailsWithStats
): PitchingStats | undefined {
	const { stats } = player ?? {};
	const { stats: pitchingStats } =
		stats?.find(
			(stat) =>
				stat.group.displayName === 'pitching' &&
				stat.type.displayName === 'statsSingleSeason'
		) ?? {};

	return pitchingStats as PitchingStats | undefined;
}

export function getPitcherGameStats(
	player: PlayerDetailsWithStats
): PitchingStats | undefined {
	const { stats } = player ?? {};
	const { stats: pitchingStats } =
		stats?.find(
			(stat) =>
				stat.group.displayName === 'pitching' && stat.type.displayName === 'gameLog'
		) ?? {};

	return pitchingStats as PitchingStats | undefined;
}

export function getBatterGameStats(
	player: PlayerDetailsWithStats
): HittingStats | undefined {
	const { stats } = player ?? {};
	const { stats: battingStats } =
		stats?.find(
			(stat) =>
				stat.group.displayName === 'hitting' && stat.type.displayName === 'gameLog'
		) ?? {};

	return battingStats as HittingStats | undefined;
}

const ALLOWED_DOMAINS = ['milb-cuts-diamond'];

export function hasPlayback(video: MediaPlaybackFieldsFragment): boolean {
	const { feeds } = video;
	const [feed] = feeds ?? [];
	const mp4 = feed?.playbacks?.find((f) => f?.name === 'mp4Avc');
	const { url } = mp4 ?? {};

	if (url && ALLOWED_DOMAINS.some((cut) => url.includes(cut))) {
		return true;
	}

	return false;
}

export function formatTime(dateString: string): string {
	try {
		const date = new Date(dateString);
		return format(date, 'h:mm a');
	} catch (error) {
		return dateString;
	}
}

export const toInningHalfDisplay = (inningState: string) => {
	switch (inningState) {
		case 'Top':
			return 'Top';
		case 'Bottom':
			return 'Bot';
		case 'Middle':
			return 'Mid';
		default:
			return inningState;
	}
};

export const isFreeGameOfTheDay = (game: Game) => {
	const { broadcasts } = game;
	const [broadcast] = broadcasts ?? [];
	const { freeGame } = broadcast ?? {};

	return freeGame;
};

export const isUserFollowingPlayer = (player: PlayerInfoFieldsFragment) => {
	// TODO: Implement this
	return false;
};

export const getGameState = (game: Game) => {
	const {
		status: { detailedState, abstractGameState },
		linescore,
		statusFlags,
	} = game;
	const { teams, currentInning, isTopInning, outs } = linescore ?? {};
	const { runs: awayTeamRuns = 0 } = teams?.away ?? {};
	const { runs: homeTeamRuns = 0 } = teams?.home ?? {};

	const isLive = statusFlags.isLive || abstractGameState === 'Live';
	const isPreview = statusFlags.isPreview || abstractGameState === 'Preview';
	const isPostponed = statusFlags.isPostponed || detailedState === 'Postponed';
	const isFinal =
		statusFlags.isFinal ||
		(abstractGameState === 'Final' && !isPostponed) ||
		(currentInning === 9 &&
			isTopInning &&
			outs === 3 &&
			homeTeamRuns > awayTeamRuns);

	return { isFinal, isLive, isPreview, isPostponed };
};

export const getLeagueName = (
	id: number,
	{ shorten = false }: { shorten?: boolean } = {}
) => {
	switch (id) {
		case 103:
			return shorten ? 'AL' : 'American League';
		case 104:
			return shorten ? 'NL' : 'National League';
	}
};

export const getDivisionName = (
	id: number,
	{ shorten = false }: { shorten?: boolean } = {}
) => {
	switch (id) {
		case 201:
			return shorten ? 'AL East' : 'American League East';
		case 202:
			return shorten ? 'AL Central' : 'American League Central';
		case 200:
			return shorten ? 'AL West' : 'American League West';
		case 204:
			return shorten ? 'NL East' : 'National League East';
		case 205:
			return shorten ? 'NL Central' : 'National League Central';
		case 203:
			return shorten ? 'NL West' : 'National League West';
	}
};

export const getDivisionShortName = (id: number) => {
	const [, division] = getDivisionName(id, { shorten: true })?.split(' ') ?? [];
	return division;
};
