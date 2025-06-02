'use client';

import { StandingsTable } from '@/components/standings-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDivisionShortName } from '@/lib/utils';
import { getStandings } from '@/lib/api';
import { useState } from 'react';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import type { DivisionStandings } from '@/types/statsapi';

export function StandingsTabs({ records }: { records: DivisionStandings[] }) {
	// League and division IDs
	const LEAGUES = [
		{ id: 103, name: 'American League', divisions: [201, 202, 200] },
		{ id: 104, name: 'National League', divisions: [204, 205, 203] },
	];

	// TODO: Get default league and division from user settings
	const defaultDivision = 200;
	const defaultLeague = LEAGUES.find((l) =>
		l.divisions.includes(defaultDivision)
	)?.id;

	const [division, setDivision] = useState(defaultDivision);
	const [league, setLeague] = useState(defaultLeague);
	const leagueObj = LEAGUES.find((l) => l.id === league) ?? LEAGUES[0];

	function handleLeagueChange(value: string) {
		const newLeague = Number(value);
		setLeague(newLeague);
		const newLeagueObj = LEAGUES.find((l) => l.id === newLeague) ?? LEAGUES[0];
		setDivision(newLeagueObj.divisions[0]);
	}

	return (
		<div className="space-y-4">
			<Tabs
				value={String(division)}
				onValueChange={(v) => setDivision(Number(v))}
				className="space-y-4"
			>
				<div className="flex flex-col-reverse sm:flex-row items-end justify-between gap-4 sm:gap-8 sm:items-center">
					<TabsList className="rounded-full">
						{leagueObj.divisions.map((divId) => (
							<TabsTrigger
								key={divId}
								value={String(divId)}
								className="rounded-full px-8"
							>
								{getDivisionShortName(divId)}
							</TabsTrigger>
						))}
					</TabsList>
					<Select value={String(league)} onValueChange={handleLeagueChange}>
						<SelectTrigger className="w-fit rounded-full bg-muted border-none px-4 text-sm font-medium text-muted-foreground gap-4">
							<SelectValue placeholder="Select league" />
						</SelectTrigger>
						<SelectContent>
							{LEAGUES.map((l) => (
								<SelectItem key={l.id} value={String(l.id)}>
									{l.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				{leagueObj.divisions.map((divId) => (
					<TabsContent key={divId} value={String(divId)} className="space-y-8">
						<StandingsTable
							teams={
								records.find((record) => record.division.id === divId)
									?.teamRecords ?? []
							}
						/>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
