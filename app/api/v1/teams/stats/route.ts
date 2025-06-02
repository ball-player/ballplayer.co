import { getStats } from '@/lib/api';
import type { GameDate, Game } from '@/types/statsapi';
import {
	isSameWeek,
	parseISO,
	endOfWeek,
	addDays,
	isAfter,
	min,
	formatISO,
} from 'date-fns';

function buildDayToWeekKeyMap(allDays: string[]) {
	const weekKeyMap: Record<string, string> = {};
	for (let i = 0; i < allDays.length; ++i) {
		const candidate = allDays[i];
		const candidateDate = parseISO(candidate);
		// Find all days in the same week as candidate
		for (let j = i; j < allDays.length; ++j) {
			const day = allDays[j];
			const dayDate = parseISO(day);
			if (isSameWeek(candidateDate, dayDate, { weekStartsOn: 1 })) {
				weekKeyMap[day] = candidate;
			} else {
				break; // allDays is sorted, so break when out of week
			}
		}
	}
	return weekKeyMap;
}

// Massage raw stats into daily run differential objects
function getDailyRunDifferential(
	stats: GameDate[],
	{ teamIds }: { teamIds?: number[] }
): Array<{
	day: string;
	team: { id: number; name: string };
	runDifferential: number;
	runsScored: number;
	runsAllowed: number;
	wins: number;
	losses: number;
	// homeRuns: number;
	// stolenBases: number;
}> {
	const result: Array<{
		day: string;
		team: {
			id: number;
			name: string;
		};
		runDifferential: number;
		runsScored: number;
		runsAllowed: number;
		wins: number;
		losses: number;
		// homeRuns: number;
		// stolenBases: number;
	}> = [];
	stats.forEach((day: GameDate) => {
		const date = day.date;
		day.games.forEach((game: Game) => {
			const home = game.teams.home;
			const away = game.teams.away;

			// const homeStats = home.stats?.batting || {};
			// const awayStats = away.stats?.batting || {};

			if (!teamIds?.length || teamIds.includes(home.team.id)) {
				result.push({
					day: date,
					team: {
						id: home.team.id,
						name: home.team.name,
					},
					runDifferential: (home?.score ?? 0) - (away?.score ?? 0),
					runsScored: home?.score ?? 0,
					runsAllowed: away?.score ?? 0,
					wins: home.isWinner ? 1 : 0,
					losses: !home.isWinner ? 1 : 0,
					// homeRuns: homeStats.homeRuns ?? 0,
					// stolenBases: homeStats.stolenBases ?? 0,
				});
			}

			if (!teamIds?.length || teamIds.includes(away.team.id)) {
				result.push({
					day: date,
					team: {
						id: away.team.id,
						name: away.team.name,
					},
					runDifferential: (away?.score ?? 0) - (home?.score ?? 0),
					runsScored: away?.score ?? 0,
					runsAllowed: home?.score ?? 0,
					wins: away.isWinner ? 1 : 0,
					losses: !away.isWinner ? 1 : 0,
					// homeRuns: awayStats.homeRuns ?? 0,
					// stolenBases: awayStats.stolenBases ?? 0,
				});
			}
		});
	});
	return result;
}

function aggregateByWeek(
	dailyArray: Array<{
		day: string;
		team: { id: number; name: string };
		runDifferential: number;
		runsScored: number;
		runsAllowed: number;
		wins: number;
		losses: number;
		// homeRuns: number;
		// stolenBases: number;
	}>
) {
	const allDays = Array.from(new Set(dailyArray.map((d) => d.day))).sort();
	const intervals = generateWeeklyIntervals(
		parseISO(allDays[0]),
		parseISO(allDays[allDays.length - 1])
	);
	const dayToWeekKey: Record<string, string> = {};
	for (const interval of intervals) {
		const { start, end } = interval;
		for (const day of allDays) {
			if (day >= start && day <= end) {
				dayToWeekKey[day] = start;
			}
		}
	}

	const map = new Map();
	dailyArray.forEach(
		({
			day,
			team,
			runDifferential,
			runsScored,
			runsAllowed,
			wins,
			losses,
			// homeRuns,
			// stolenBases,
		}) => {
			const { id } = team;
			const week = dayToWeekKey[day] || day;
			const key = `${week}-${id}`;
			if (!map.has(key))
				map.set(key, {
					week,
					team,
					runDifferential: 0,
					runsScored: 0,
					runsAllowed: 0,
					wins: 0,
					losses: 0,
					// homeRuns: 0,
					// stolenBases: 0,
				});
			const obj = map.get(key);
			obj.runDifferential += runDifferential;
			obj.runsScored += runsScored;
			obj.runsAllowed += runsAllowed;
			obj.wins += wins;
			obj.losses += losses;
			// obj.homeRuns += homeRuns;
			// obj.stolenBases += stolenBases;
		}
	);
	return Array.from(map.values());
}

function aggregateByMonth(
	dailyArray: Array<{
		day: string;
		team: { id: number; name: string };
		runDifferential: number;
		runsScored: number;
		runsAllowed: number;
		wins: number;
		losses: number;
		// homeRuns: number;
		// stolenBases: number;
	}>
) {
	const map = new Map<
		string,
		{
			month: string;
			team: { id: number; name: string };
			runDifferential: number;
			runsScored: number;
			runsAllowed: number;
			wins: number;
			losses: number;
			// homeRuns: number;
			// stolenBases: number;
		}
	>();
	dailyArray.forEach(
		({
			day,
			team,
			runDifferential,
			runsScored,
			runsAllowed,
			wins,
			losses,
			// homeRuns,
			// stolenBases,
		}) => {
			const { id } = team;
			const month = day.slice(0, 7);
			const key = `${month}-${id}`;
			if (!map.has(key))
				map.set(key, {
					month,
					team,
					runDifferential: 0,
					runsScored: 0,
					runsAllowed: 0,
					wins: 0,
					losses: 0,
					// homeRuns: 0,
					// stolenBases: 0,
				});
			const obj = map.get(key)!;
			obj.runDifferential += runDifferential;
			obj.runsScored += runsScored;
			obj.runsAllowed += runsAllowed;
			obj.wins += wins;
			obj.losses += losses;
			// obj.homeRuns += homeRuns;
			// obj.stolenBases += stolenBases;
		}
	);
	return Array.from(map.values());
}

type Interval = { start: string; end: string };

function generateWeeklyIntervals(start: Date, end: Date): Interval[] {
	const intervals: Interval[] = [];
	let currentStart = start;
	const weekStartsOn = 1; // Monday

	while (!isAfter(currentStart, end)) {
		const currentEnd = min([endOfWeek(currentStart, { weekStartsOn }), end]);

		intervals.push({
			start: formatISO(currentStart, { representation: 'date' }),
			end: formatISO(currentEnd, { representation: 'date' }),
		});

		currentStart = addDays(currentEnd, 1);
	}

	return intervals;
}

type RunDiffRow = {
	day?: string;
	week?: string;
	month?: string;
	team: { id: number; name: string };
	runDifferential: number;
	runsScored: number;
	runsAllowed: number;
	wins: number;
	losses: number;
	// homeRuns: number;
	// stolenBases: number;
	cumulativeRunDifferential?: number;
	cumulativeRunsScored?: number;
	cumulativeRunsAllowed?: number;
	cumulativeWins?: number;
	cumulativeLosses?: number;
	// cumulativeHomeRuns?: number;
	// cumulativeStolenBases?: number;
};

function addCumulative(array: RunDiffRow[], groupKey: string) {
	const byTeam: Record<number, RunDiffRow[]> = {};
	array.forEach((row) => {
		const teamId = row.team.id;
		if (!byTeam[teamId]) byTeam[teamId] = [];
		byTeam[teamId].push(row);
	});
	Object.values(byTeam).forEach((teamRows) => {
		let sumDiff = 0;
		let sumScored = 0;
		let sumAllowed = 0;
		let sumWins = 0;
		let sumLosses = 0;
		// let sumHomeRuns = 0;
		// let sumStolenBases = 0;
		teamRows.sort((a, b) => {
			const aKey = a[groupKey as keyof RunDiffRow] as string;
			const bKey = b[groupKey as keyof RunDiffRow] as string;
			return aKey.localeCompare(bKey);
		});
		teamRows.forEach((row) => {
			sumDiff += row.runDifferential;
			sumScored += row.runsScored;
			sumAllowed += row.runsAllowed;
			sumWins += row.wins;
			sumLosses += row.losses;
			// sumHomeRuns += row.homeRuns;
			// sumStolenBases += row.stolenBases;
			row.cumulativeRunDifferential = sumDiff;
			row.cumulativeRunsScored = sumScored;
			row.cumulativeRunsAllowed = sumAllowed;
			row.cumulativeWins = sumWins;
			row.cumulativeLosses = sumLosses;
			// row.cumulativeHomeRuns = sumHomeRuns;
			// row.cumulativeStolenBases = sumStolenBases;
		});
	});
	return array;
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const startDate = new Date(searchParams.get('startDate') ?? '01/01/2025');
	const endDateParam = searchParams.get('endDate');
	const endDate = endDateParam ? new Date(endDateParam) : new Date();
	const timeframe = searchParams.get('timeframe') ?? 'month';
	const teamIds = searchParams.get('teamIds')?.split(',') ?? [];
	const cumulative = searchParams.get('cumulative') === 'true';

	const stats = await getStats({ startDate, endDate, teamIds });
	const data = getDailyRunDifferential(stats.dates || [], {
		teamIds: teamIds.map(Number),
	});

	let result;
	if (timeframe === 'week') {
		result = aggregateByWeek(data);
		if (cumulative) result = addCumulative(result, 'week');
		return Response.json({ data: result });
	}

	if (timeframe === 'month') {
		result = aggregateByMonth(data);
		if (cumulative) result = addCumulative(result, 'month');
		return Response.json({ data: result });
	}

	result = data;
	if (cumulative) result = addCumulative(result, 'day');
	return Response.json({ data: result });
}
