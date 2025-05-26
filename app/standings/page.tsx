'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface TeamStanding {
	name: string;
	wins: number;
	losses: number;
	pct: number;
	gb: string;
	l10: string;
	streak: string;
}

const mockStandings: Record<string, TeamStanding[]> = {
	'AL East': [
		{
			name: 'Baltimore Orioles',
			wins: 55,
			losses: 35,
			pct: 0.611,
			gb: '-',
			l10: '7-3',
			streak: 'W3',
		},
		{
			name: 'Tampa Bay Rays',
			wins: 53,
			losses: 37,
			pct: 0.589,
			gb: '2.0',
			l10: '5-5',
			streak: 'L2',
		},
		{
			name: 'Toronto Blue Jays',
			wins: 50,
			losses: 40,
			pct: 0.556,
			gb: '5.0',
			l10: '6-4',
			streak: 'W1',
		},
		{
			name: 'Boston Red Sox',
			wins: 48,
			losses: 42,
			pct: 0.533,
			gb: '7.0',
			l10: '4-6',
			streak: 'L1',
		},
		{
			name: 'New York Yankees',
			wins: 47,
			losses: 43,
			pct: 0.522,
			gb: '8.0',
			l10: '5-5',
			streak: 'W2',
		},
	],
	'AL Central': [
		{
			name: 'Minnesota Twins',
			wins: 45,
			losses: 45,
			pct: 0.5,
			gb: '-',
			l10: '6-4',
			streak: 'W1',
		},
		{
			name: 'Cleveland Guardians',
			wins: 44,
			losses: 46,
			pct: 0.489,
			gb: '1.0',
			l10: '4-6',
			streak: 'L2',
		},
		{
			name: 'Detroit Tigers',
			wins: 41,
			losses: 49,
			pct: 0.456,
			gb: '4.0',
			l10: '5-5',
			streak: 'W3',
		},
		{
			name: 'Chicago White Sox',
			wins: 38,
			losses: 52,
			pct: 0.422,
			gb: '7.0',
			l10: '3-7',
			streak: 'L4',
		},
		{
			name: 'Kansas City Royals',
			wins: 26,
			losses: 64,
			pct: 0.289,
			gb: '19.0',
			l10: '2-8',
			streak: 'L6',
		},
	],
	'AL West': [
		{
			name: 'Texas Rangers',
			wins: 52,
			losses: 38,
			pct: 0.578,
			gb: '-',
			l10: '7-3',
			streak: 'W4',
		},
		{
			name: 'Houston Astros',
			wins: 50,
			losses: 40,
			pct: 0.556,
			gb: '2.0',
			l10: '6-4',
			streak: 'W2',
		},
		{
			name: 'Los Angeles Angels',
			wins: 45,
			losses: 45,
			pct: 0.5,
			gb: '7.0',
			l10: '4-6',
			streak: 'L3',
		},
		{
			name: 'Seattle Mariners',
			wins: 44,
			losses: 46,
			pct: 0.489,
			gb: '8.0',
			l10: '5-5',
			streak: 'W1',
		},
		{
			name: 'Oakland Athletics',
			wins: 25,
			losses: 65,
			pct: 0.278,
			gb: '27.0',
			l10: '3-7',
			streak: 'L2',
		},
	],
	'NL East': [
		{
			name: 'Atlanta Braves',
			wins: 60,
			losses: 30,
			pct: 0.667,
			gb: '-',
			l10: '8-2',
			streak: 'W5',
		},
		{
			name: 'Miami Marlins',
			wins: 52,
			losses: 38,
			pct: 0.578,
			gb: '8.0',
			l10: '6-4',
			streak: 'W2',
		},
		{
			name: 'Philadelphia Phillies',
			wins: 48,
			losses: 42,
			pct: 0.533,
			gb: '12.0',
			l10: '7-3',
			streak: 'W3',
		},
		{
			name: 'New York Mets',
			wins: 42,
			losses: 48,
			pct: 0.467,
			gb: '18.0',
			l10: '4-6',
			streak: 'L2',
		},
		{
			name: 'Washington Nationals',
			wins: 35,
			losses: 55,
			pct: 0.389,
			gb: '25.0',
			l10: '3-7',
			streak: 'L4',
		},
	],
	'NL Central': [
		{
			name: 'Cincinnati Reds',
			wins: 50,
			losses: 40,
			pct: 0.556,
			gb: '-',
			l10: '7-3',
			streak: 'W4',
		},
		{
			name: 'Milwaukee Brewers',
			wins: 49,
			losses: 41,
			pct: 0.544,
			gb: '1.0',
			l10: '6-4',
			streak: 'W2',
		},
		{
			name: 'Chicago Cubs',
			wins: 42,
			losses: 48,
			pct: 0.467,
			gb: '8.0',
			l10: '4-6',
			streak: 'L3',
		},
		{
			name: 'Pittsburgh Pirates',
			wins: 41,
			losses: 49,
			pct: 0.456,
			gb: '9.0',
			l10: '3-7',
			streak: 'L5',
		},
		{
			name: 'St. Louis Cardinals',
			wins: 38,
			losses: 52,
			pct: 0.422,
			gb: '12.0',
			l10: '5-5',
			streak: 'W1',
		},
	],
	'NL West': [
		{
			name: 'Arizona Diamondbacks',
			wins: 52,
			losses: 38,
			pct: 0.578,
			gb: '-',
			l10: '5-5',
			streak: 'L2',
		},
		{
			name: 'Los Angeles Dodgers',
			wins: 51,
			losses: 39,
			pct: 0.567,
			gb: '1.0',
			l10: '7-3',
			streak: 'W4',
		},
		{
			name: 'San Francisco Giants',
			wins: 49,
			losses: 41,
			pct: 0.544,
			gb: '3.0',
			l10: '4-6',
			streak: 'L3',
		},
		{
			name: 'San Diego Padres',
			wins: 43,
			losses: 47,
			pct: 0.478,
			gb: '9.0',
			l10: '6-4',
			streak: 'W2',
		},
		{
			name: 'Colorado Rockies',
			wins: 34,
			losses: 56,
			pct: 0.378,
			gb: '18.0',
			l10: '3-7',
			streak: 'L4',
		},
	],
};

export default function StandingsPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8">MLB Standings</h1>

			<Tabs defaultValue="al" className="space-y-4">
				<TabsList>
					<TabsTrigger value="al">American League</TabsTrigger>
					<TabsTrigger value="nl">National League</TabsTrigger>
				</TabsList>

				<TabsContent value="al" className="space-y-8">
					<StandingsSection title="AL East" teams={mockStandings['AL East']} />
					<StandingsSection title="AL Central" teams={mockStandings['AL Central']} />
					<StandingsSection title="AL West" teams={mockStandings['AL West']} />
				</TabsContent>

				<TabsContent value="nl" className="space-y-8">
					<StandingsSection title="NL East" teams={mockStandings['NL East']} />
					<StandingsSection title="NL Central" teams={mockStandings['NL Central']} />
					<StandingsSection title="NL West" teams={mockStandings['NL West']} />
				</TabsContent>
			</Tabs>
		</div>
	);
}

function StandingsSection({
	title,
	teams,
}: {
	title: string;
	teams: TeamStanding[];
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Team</TableHead>
							<TableHead className="text-right">W</TableHead>
							<TableHead className="text-right">L</TableHead>
							<TableHead className="text-right">PCT</TableHead>
							<TableHead className="text-right">GB</TableHead>
							<TableHead className="text-right">L10</TableHead>
							<TableHead className="text-right">STRK</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{teams.map((team) => (
							<TableRow key={team.name}>
								<TableCell className="font-medium">{team.name}</TableCell>
								<TableCell className="text-right">{team.wins}</TableCell>
								<TableCell className="text-right">{team.losses}</TableCell>
								<TableCell className="text-right">{team.pct.toFixed(3)}</TableCell>
								<TableCell className="text-right">{team.gb}</TableCell>
								<TableCell className="text-right">{team.l10}</TableCell>
								<TableCell className="text-right">{team.streak}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
