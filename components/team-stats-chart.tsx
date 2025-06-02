'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { format, parseISO } from 'date-fns';

import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectSeparator,
	SelectGroup,
	SelectLabel,
} from './ui/select';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { teams } from '@/data/teams';
import { cn, getTeamColor } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'var(--chart-1)',
	},
	mobile: {
		label: 'Mobile',
		color: 'var(--chart-2)',
	},
} satisfies ChartConfig;

const STATS = [
	{
		id: 1,
		name: 'Run Differential',
		key: 'runDifferential',
		cumulativeKey: 'cumulativeRunDifferential',
	},
	{
		id: 2,
		name: 'Runs Scored',
		key: 'runsScored',
		cumulativeKey: 'cumulativeRunsScored',
	},
	{
		id: 3,
		name: 'Runs Allowed',
		key: 'runsAllowed',
		cumulativeKey: 'cumulativeRunsAllowed',
	},
	{
		id: 4,
		name: 'Wins',
		key: 'wins',
		cumulativeKey: 'cumulativeWins',
	},
	{
		id: 5,
		name: 'Losses',
		key: 'losses',
		cumulativeKey: 'cumulativeLosses',
	},
];
const LEAGUE_AVERAGE_ID = 'league-average';

interface ApiTeam {
	id: string;
	name: string;
	abbreviation: string;
}

interface ApiRow {
	month?: string;
	week?: string;
	day?: string;
	team: ApiTeam;
	runDifferential: number;
	cumulativeRunDifferential?: number;
	runsScored?: number;
	cumulativeRunsScored?: number;
	runsAllowed?: number;
	cumulativeRunsAllowed?: number;
}

// Define type for chart data row
interface ChartDataRow {
	month?: string;
	week?: string;
	day?: string;
	value: number;
}

function median(values: number[]) {
	if (values.length === 0) return 0;
	const sorted = [...values].sort((a, b) => a - b);
	const mid = Math.floor(sorted.length / 2);
	if (sorted.length % 2 === 0) {
		return (sorted[mid - 1] + sorted[mid]) / 2;
	} else {
		return sorted[mid];
	}
}

const getTeamStatsChartData = async (
	timeframe: string,
	teamId: string | number,
	stat: (typeof STATS)[number]
): Promise<ChartDataRow[]> => {
	let url = `/api/v1/teams/stats?timeframe=${timeframe}&cumulative=true`;
	if (teamId !== LEAGUE_AVERAGE_ID) {
		url += `&teamIds=${teamId}`;
	}
	const response = await fetch(url);
	const data = await response.json();
	if (teamId === LEAGUE_AVERAGE_ID) {
		// Calculate the median for the selected stat's cumulative value
		const groupKey =
			timeframe === 'month' ? 'month' : timeframe === 'week' ? 'week' : 'day';
		const allPeriods = Array.from(
			new Set(
				(data.data as ApiRow[]).map((row) => {
					if (groupKey === 'month') return row.month;
					if (groupKey === 'week') return row.week;
					return row.day;
				})
			)
		).sort();
		const allTeamIds = Array.from(
			new Set((data.data as ApiRow[]).map((row) => String(row.team.id)))
		);
		// Build a map: period -> teamId -> value
		const periodTeamMap: Record<string, Record<string, number>> = {};
		for (const row of data.data as ApiRow[]) {
			let period: string | undefined;
			if (groupKey === 'month') period = row.month;
			else if (groupKey === 'week') period = row.week;
			else period = row.day;
			const teamIdStr = String(row.team.id);
			const value =
				(row as unknown as Record<string, number | undefined>)[stat.cumulativeKey] ??
				(row as unknown as Record<string, number | undefined>)[stat.key];
			if (!period) continue;
			if (!periodTeamMap[period]) periodTeamMap[period] = {};
			periodTeamMap[period][teamIdStr] = value ?? 0;
		}
		// Carry forward last known value for teams that did not play in a period
		const lastKnown: Record<string, number> = {};
		const result: ChartDataRow[] = [];
		for (const period of allPeriods) {
			if (!period) continue;
			const values: number[] = [];
			for (const teamId of allTeamIds) {
				if (periodTeamMap[period] && periodTeamMap[period][teamId] !== undefined) {
					lastKnown[teamId] = periodTeamMap[period][teamId];
				}
				if (lastKnown[teamId] !== undefined) {
					values.push(lastKnown[teamId]);
				}
			}
			if (groupKey === 'month') {
				result.push({ month: period, value: median(values) });
			} else if (groupKey === 'week') {
				result.push({ week: period, value: median(values) });
			} else {
				result.push({ day: period, value: median(values) });
			}
		}
		return result;
	}
	// For a single team, return the stat's cumulative value
	return (data.data as ApiRow[]).map((row) => {
		let periodValue: string | undefined;
		if (timeframe === 'month') periodValue = row.month;
		else if (timeframe === 'week') periodValue = row.week;
		else periodValue = row.day;
		const value =
			(row as unknown as Record<string, number | undefined>)[stat.cumulativeKey] ??
			(row as unknown as Record<string, number | undefined>)[stat.key];
		if (timeframe === 'month') {
			return { month: periodValue, value: value ?? 0 };
		} else if (timeframe === 'week') {
			return { week: periodValue, value: value ?? 0 };
		} else {
			return { day: periodValue, value: value ?? 0 };
		}
	});
};

const getTeamName = (teamId: string | number) => {
	if (teamId === LEAGUE_AVERAGE_ID) return 'League Average';
	const team = teams.find((t) => String(t.id) === String(teamId));
	return team ? team.name : 'Unknown Team';
};

const getTeamFontColor = (teamId: string | number) => {
	if (teamId === LEAGUE_AVERAGE_ID) return '#333333';
	const team = teams.find((t) => String(t.id) === String(teamId));
	return team ? getTeamColor(team.abbreviation) : '#333333';
};

const getTeamLineColor = (teamId: string | number) => {
	if (teamId === LEAGUE_AVERAGE_ID) return '#e5e7eb';
	const team = teams.find((t) => String(t.id) === String(teamId));
	return team ? getTeamColor(team.abbreviation) : '#888888';
};

const getStatLabel = (stat: string) => {
	switch (stat) {
		case 'Run Differential':
			return 'Runs';
		default:
			return stat;
	}
};

const getPercentageChange = (current: number, previous: number) => {
	if (previous === 0 || previous === undefined || current === undefined) return 0;
	const change = ((current - previous) / Math.abs(previous)) * 100;

	return Number(change.toFixed(1));
};

const getPercentageChangeLabel = (timeframe: string) => {
	switch (timeframe) {
		case 'day':
			return 'since yesterday';
		default:
			return `since last ${timeframe}`;
	}
};

// Group teams by division
const teamsByDivision = teams.reduce<Record<string, typeof teams>>((acc, team) => {
	const division = team.division?.name || 'Other';
	if (!acc[division]) acc[division] = [];
	acc[division].push(team);
	return acc;
}, {});

export function TeamStatsChart() {
	const [timeframe, setTimeframe] = useState('week');
	const [teamId1, setTeamId1] = useState<string | number>(teams[0].id);
	const [teamId2, setTeamId2] = useState<string | number>(LEAGUE_AVERAGE_ID);
	const [stat, setStat] = useState(STATS[0]);

	const { data: chartData1, isLoading: isLoading1 } = useQuery({
		queryKey: ['team-stats-chart', timeframe, teamId1, stat.key],
		queryFn: () => getTeamStatsChartData(timeframe, teamId1, stat),
	});
	const { data: chartData2, isLoading: isLoading2 } = useQuery({
		queryKey: ['team-stats-chart', timeframe, teamId2, stat.key],
		queryFn: () => getTeamStatsChartData(timeframe, teamId2, stat),
	});

	const isLoading = isLoading1 || isLoading2;

	function handleTeamChange1(value: string) {
		setTeamId1(value);
	}

	function handleTeamChange2(value: string) {
		setTeamId2(value);
	}

	function handleStatChange(value: string) {
		setStat(STATS.find((s) => s.id === Number(value)) ?? STATS[0]);
	}

	// Merge chartData1 and chartData2 by period key
	const groupKey =
		timeframe === 'month' ? 'month' : timeframe === 'week' ? 'week' : 'day';
	const mergedData = (chartData1 || []).map((row: ChartDataRow) => {
		const key = row[groupKey]!;
		const match2 = (chartData2 || []).find((r: ChartDataRow) => r[groupKey] === key);
		return {
			[groupKey]: key,
			team1: row.value,
			team2: match2 ? match2.value : null,
		};
	});

	return (
		<Tabs value={timeframe} onValueChange={setTimeframe}>
			<div className="space-y-8">
				<div className="flex justify-between items-center">
					<Header data={chartData1 ?? []} stat={stat} timeframe={timeframe} />

					<Select value={String(stat.id)} onValueChange={handleStatChange}>
						<SelectTrigger className="w-fit rounded-full bg-muted border-none px-4 text-sm font-medium text-muted-foreground gap-4">
							<SelectValue placeholder="Select stat" />
						</SelectTrigger>
						<SelectContent>
							{STATS.map((l) => (
								<SelectItem key={l.id} value={String(l.id)}>
									{l.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<TabsContent value="month">
					<ChartContainer config={chartConfig}>
						<LineChart
							accessibilityLayer
							data={mergedData || []}
							margin={{ left: 12, right: 12 }}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={(value) => {
									try {
										return format(parseISO(value + '-01'), 'MM/dd');
									} catch {
										/* ignore parse error */
									}
									return value;
								}}
							/>
							<YAxis hide domain={['auto', (dataMax: number) => dataMax * 1.05]} />
							<ChartTooltip
								cursor={false}
								content={({ active, payload, label }) => {
									if (!active || !payload || payload.length === 0) return null;
									let formattedLabel = label;
									try {
										formattedLabel = format(parseISO(label + '-01'), 'MM/dd/yyyy');
									} catch {
										/* ignore parse error */
									}
									return (
										<div className="bg-white dark:bg-black p-2 rounded shadow text-xs">
											<div className="font-semibold mb-1">{formattedLabel}</div>
											{payload.map((entry, idx) => {
												const teamLabel =
													idx === 0 ? getTeamName(teamId1) : getTeamName(teamId2);
												const color =
													idx === 0
														? getTeamFontColor(teamId1)
														: getTeamFontColor(teamId2);
												return (
													<div key={entry.dataKey} style={{ color }}>
														{teamLabel}: {entry.value}
													</div>
												);
											})}
										</div>
									);
								}}
							/>
							<Line
								dataKey="team1"
								type="monotone"
								stroke={getTeamLineColor(teamId1)}
								strokeWidth={2}
								dot={false}
							/>
							<Line
								dataKey="team2"
								type="monotone"
								stroke={getTeamLineColor(teamId2)}
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ChartContainer>
				</TabsContent>

				<TabsContent value="week">
					<ChartContainer config={chartConfig}>
						<LineChart
							accessibilityLayer
							data={mergedData || []}
							margin={{ left: 12, right: 12 }}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="week"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={(value) => {
									try {
										return format(parseISO(value), 'MM/dd');
									} catch {
										/* ignore parse error */
									}
									return value;
								}}
							/>
							<YAxis hide domain={['auto', (dataMax: number) => dataMax * 1.05]} />
							<ChartTooltip
								cursor={false}
								content={({ active, payload, label }) => {
									if (!active || !payload || payload.length === 0) return null;
									let formattedLabel = label;
									try {
										formattedLabel = format(parseISO(label), 'MM/dd/yyyy');
									} catch {
										/* ignore parse error */
									}
									return (
										<div className="bg-white dark:bg-black p-2 rounded shadow text-xs">
											<div className="font-semibold mb-1">{formattedLabel}</div>
											{payload.map((entry, idx) => {
												const teamLabel =
													idx === 0 ? getTeamName(teamId1) : getTeamName(teamId2);
												const color =
													idx === 0
														? getTeamFontColor(teamId1)
														: getTeamFontColor(teamId2);
												return (
													<div key={entry.dataKey} style={{ color }}>
														{teamLabel}: {entry.value}
													</div>
												);
											})}
										</div>
									);
								}}
							/>
							<Line
								dataKey="team1"
								type="monotone"
								stroke={getTeamLineColor(teamId1)}
								strokeWidth={2}
								dot={false}
							/>
							<Line
								dataKey="team2"
								type="monotone"
								stroke={getTeamLineColor(teamId2)}
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ChartContainer>
				</TabsContent>

				<TabsContent value="day">
					<ChartContainer config={chartConfig}>
						<LineChart
							accessibilityLayer
							data={mergedData || []}
							margin={{ left: 12, right: 12 }}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="day"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={(value) => {
									try {
										return format(parseISO(value), 'MM/dd');
									} catch {
										/* ignore parse error */
									}
									return value;
								}}
							/>
							<YAxis hide domain={['auto', (dataMax: number) => dataMax * 1.05]} />
							<ChartTooltip
								cursor={false}
								content={({ active, payload, label }) => {
									if (!active || !payload || payload.length === 0) return null;
									let formattedLabel = label;
									try {
										formattedLabel = format(parseISO(label), 'MM/dd/yyyy');
									} catch {
										/* ignore parse error */
									}
									return (
										<div className="bg-white dark:bg-black p-2 rounded shadow text-xs">
											<div className="font-semibold mb-1">{formattedLabel}</div>
											{payload.map((entry, idx) => {
												const teamLabel =
													idx === 0 ? getTeamName(teamId1) : getTeamName(teamId2);
												const color =
													idx === 0
														? getTeamFontColor(teamId1)
														: getTeamFontColor(teamId2);
												return (
													<div key={entry.dataKey} style={{ color }}>
														{teamLabel}: {entry.value}
													</div>
												);
											})}
										</div>
									);
								}}
							/>
							<Line
								dataKey="team1"
								type="monotone"
								stroke={getTeamLineColor(teamId1)}
								strokeWidth={2}
								dot={false}
							/>
							<Line
								dataKey="team2"
								type="monotone"
								stroke={getTeamLineColor(teamId2)}
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ChartContainer>
				</TabsContent>

				<div className="flex justify-between flex-wrap gap-4">
					<div className="flex items-center gap-4">
						<Select value={String(teamId1)} onValueChange={handleTeamChange1}>
							<SelectTrigger className="w-fit rounded-full bg-muted border-none px-4 text-sm font-medium text-muted-foreground gap-4">
								<SelectValue placeholder="Select team" />
							</SelectTrigger>
							<SelectContent>
								{Object.entries(teamsByDivision).map(
									([division, teamsInDivision], idx, arr) => (
										<SelectGroup key={division}>
											<SelectLabel>{division}</SelectLabel>
											{teamsInDivision.map((team) => (
												<SelectItem key={team.id} value={String(team.id)}>
													{team.name}
												</SelectItem>
											))}
											{idx < arr.length - 1 && <SelectSeparator />}
										</SelectGroup>
									)
								)}
							</SelectContent>
						</Select>

						<span className="text-sm text-muted-foreground">to</span>

						<Select value={String(teamId2)} onValueChange={handleTeamChange2}>
							<SelectTrigger className="w-fit rounded-full bg-muted border-none px-4 text-sm font-medium text-muted-foreground gap-4">
								<SelectValue placeholder="Select team" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem key={LEAGUE_AVERAGE_ID} value={LEAGUE_AVERAGE_ID}>
									League Average
								</SelectItem>
								<SelectSeparator />
								{Object.entries(teamsByDivision).map(
									([division, teamsInDivision], idx, arr) => (
										<SelectGroup key={division}>
											<SelectLabel>{division}</SelectLabel>
											{teamsInDivision.map((team) => (
												<SelectItem key={team.id} value={String(team.id)}>
													{team.name}
												</SelectItem>
											))}
											{idx < arr.length - 1 && <SelectSeparator />}
										</SelectGroup>
									)
								)}
							</SelectContent>
						</Select>
					</div>

					<TabsList className="rounded-full">
						<TabsTrigger value="month" className="rounded-full px-8">
							Month
						</TabsTrigger>
						<TabsTrigger value="week" className="rounded-full px-8">
							Week
						</TabsTrigger>
						<TabsTrigger value="day" className="rounded-full px-8">
							Day
						</TabsTrigger>
					</TabsList>
				</div>
			</div>
		</Tabs>
	);
}

function Header({
	data,
	stat,
	timeframe,
}: {
	data: ChartDataRow[];
	stat: (typeof STATS)[number];
	timeframe: string;
}) {
	const { value: lastStat = 0 } = data?.[data.length - 1] ?? {};
	const { value: previousStat = 0 } = data?.[data.length - 2] ?? {};

	const change = getPercentageChange(lastStat, previousStat);
	const Icon = change >= 0 ? TrendingUp : TrendingDown;

	const textColor = change > 0 ? 'text-success' : 'text-destructive';

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-end gap-2">
				<span className="text-xxl/7">
					{lastStat > 0 && stat.name === 'Run Differential' && '+'}
					{lastStat}
				</span>
				<span className="text-muted-foreground text-sm leading-none uppercase">
					{getStatLabel(stat.name)}
				</span>
			</div>

			<div
				className={cn(
					'flex items-end gap-2 text-sm',
					change === 0 ? 'text-muted-foreground' : textColor
				)}
			>
				<Icon className="w-4 h-4" />
				{change}
				{'% '}
				{getPercentageChangeLabel(timeframe)}
			</div>
		</div>
	);
}
