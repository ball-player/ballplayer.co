'use server';

import { StandingsTable } from '@/components/standings-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDivisionName } from '@/lib/utils';
import { getStandings } from '@/lib/api';

export default async function StandingsPage() {
	const standings = await getStandings(new Date());
	const { records } = standings;

	// TODO: Get default league and division from user settings
	const defaultLeague = 103;
	const defaultDivision = 200;

	return (
		<Tabs defaultValue={String(defaultDivision)} className="space-y-4">
			<TabsList>
				<TabsTrigger value={String(201)}>{getDivisionName(201)}</TabsTrigger>
				<TabsTrigger value={String(202)}>{getDivisionName(202)}</TabsTrigger>
				<TabsTrigger value={String(200)}>{getDivisionName(200)}</TabsTrigger>
			</TabsList>

			<TabsContent value={String(201)} className="space-y-8">
				<StandingsTable
					teams={
						records.find((record) => record.division.id === 201)?.teamRecords ?? []
					}
				/>
			</TabsContent>

			<TabsContent value={String(202)} className="space-y-8">
				<StandingsTable
					teams={
						records.find((record) => record.division.id === 202)?.teamRecords ?? []
					}
				/>
			</TabsContent>

			<TabsContent value={String(200)} className="space-y-8">
				<StandingsTable
					teams={
						records.find((record) => record.division.id === 200)?.teamRecords ?? []
					}
				/>
			</TabsContent>
		</Tabs>
	);
}
