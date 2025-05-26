'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface BattingStats {
	name: string;
	team: string;
	avg: number;
	hr: number;
	rbi: number;
	hits: number;
	runs: number;
	sb: number;
}

interface PitchingStats {
	name: string;
	team: string;
	era: number;
	wins: number;
	losses: number;
	so: number;
	whip: number;
	saves: number;
}

interface FieldingStats {
	name: string;
	team: string;
	position: string;
	fpct: number;
	drs: number;
	assists: number;
	putouts: number;
	errors: number;
}

const mockBattingStats: BattingStats[] = [
	{
		name: 'Luis Arraez',
		team: 'MIA',
		avg: 0.389,
		hr: 3,
		rbi: 41,
		hits: 122,
		runs: 45,
		sb: 1,
	},
	{
		name: 'Ronald Acuña Jr.',
		team: 'ATL',
		avg: 0.331,
		hr: 21,
		rbi: 55,
		hits: 117,
		runs: 79,
		sb: 41,
	},
	{
		name: 'Freddie Freeman',
		team: 'LAD',
		avg: 0.33,
		hr: 17,
		rbi: 59,
		hits: 119,
		runs: 69,
		sb: 12,
	},
	{
		name: 'Mookie Betts',
		team: 'LAD',
		avg: 0.307,
		hr: 26,
		rbi: 65,
		hits: 106,
		runs: 77,
		sb: 8,
	},
	{
		name: 'Juan Soto',
		team: 'SD',
		avg: 0.275,
		hr: 15,
		rbi: 46,
		hits: 89,
		runs: 58,
		sb: 5,
	},
];

const mockPitchingStats: PitchingStats[] = [
	{
		name: 'Shane McClanahan',
		team: 'TB',
		era: 2.53,
		wins: 11,
		losses: 1,
		so: 117,
		whip: 1.09,
		saves: 0,
	},
	{
		name: 'Clayton Kershaw',
		team: 'LAD',
		era: 2.55,
		wins: 10,
		losses: 4,
		so: 105,
		whip: 1.05,
		saves: 0,
	},
	{
		name: 'Spencer Strider',
		team: 'ATL',
		era: 3.75,
		wins: 11,
		losses: 3,
		so: 166,
		whip: 1.09,
		saves: 0,
	},
	{
		name: 'Justin Verlander',
		team: 'NYM',
		era: 3.47,
		wins: 4,
		losses: 5,
		so: 70,
		whip: 1.15,
		saves: 0,
	},
	{
		name: 'Josh Hader',
		team: 'SD',
		era: 1.27,
		wins: 0,
		losses: 1,
		so: 44,
		whip: 1.13,
		saves: 21,
	},
];

const mockFieldingStats: FieldingStats[] = [
	{
		name: 'Matt Olson',
		team: 'ATL',
		position: '1B',
		fpct: 0.997,
		drs: 5,
		assists: 45,
		putouts: 789,
		errors: 2,
	},
	{
		name: 'Dansby Swanson',
		team: 'CHC',
		position: 'SS',
		fpct: 0.989,
		drs: 12,
		assists: 198,
		putouts: 89,
		errors: 3,
	},
	{
		name: "Ke'Bryan Hayes",
		team: 'PIT',
		position: '3B',
		fpct: 0.975,
		drs: 15,
		assists: 156,
		putouts: 67,
		errors: 6,
	},
	{
		name: 'Kevin Kiermaier',
		team: 'TOR',
		position: 'CF',
		fpct: 1.0,
		drs: 8,
		assists: 4,
		putouts: 156,
		errors: 0,
	},
	{
		name: 'J.T. Realmuto',
		team: 'PHI',
		position: 'C',
		fpct: 0.995,
		drs: 11,
		assists: 45,
		putouts: 567,
		errors: 3,
	},
];

export default function StatisticsPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8">MLB Statistics</h1>

			<Tabs defaultValue="batting" className="space-y-4">
				<TabsList>
					<TabsTrigger value="batting">Batting</TabsTrigger>
					<TabsTrigger value="pitching">Pitching</TabsTrigger>
					<TabsTrigger value="fielding">Fielding</TabsTrigger>
				</TabsList>

				<TabsContent value="batting" className="space-y-6">
					<StatCard
						title="Batting Leaders"
						description="Top players by batting statistics"
					>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Player</TableHead>
									<TableHead>Team</TableHead>
									<TableHead className="text-right">AVG</TableHead>
									<TableHead className="text-right">HR</TableHead>
									<TableHead className="text-right">RBI</TableHead>
									<TableHead className="text-right">H</TableHead>
									<TableHead className="text-right">R</TableHead>
									<TableHead className="text-right">SB</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{mockBattingStats.map((player) => (
									<TableRow key={player.name}>
										<TableCell className="font-medium">{player.name}</TableCell>
										<TableCell>{player.team}</TableCell>
										<TableCell className="text-right">
											{player.avg.toFixed(3)}
										</TableCell>
										<TableCell className="text-right">{player.hr}</TableCell>
										<TableCell className="text-right">{player.rbi}</TableCell>
										<TableCell className="text-right">{player.hits}</TableCell>
										<TableCell className="text-right">{player.runs}</TableCell>
										<TableCell className="text-right">{player.sb}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</StatCard>
				</TabsContent>

				<TabsContent value="pitching" className="space-y-6">
					<StatCard
						title="Pitching Leaders"
						description="Top pitchers by pitching statistics"
					>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Player</TableHead>
									<TableHead>Team</TableHead>
									<TableHead className="text-right">ERA</TableHead>
									<TableHead className="text-right">W</TableHead>
									<TableHead className="text-right">L</TableHead>
									<TableHead className="text-right">SO</TableHead>
									<TableHead className="text-right">WHIP</TableHead>
									<TableHead className="text-right">SV</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{mockPitchingStats.map((player) => (
									<TableRow key={player.name}>
										<TableCell className="font-medium">{player.name}</TableCell>
										<TableCell>{player.team}</TableCell>
										<TableCell className="text-right">
											{player.era.toFixed(2)}
										</TableCell>
										<TableCell className="text-right">{player.wins}</TableCell>
										<TableCell className="text-right">{player.losses}</TableCell>
										<TableCell className="text-right">{player.so}</TableCell>
										<TableCell className="text-right">
											{player.whip.toFixed(2)}
										</TableCell>
										<TableCell className="text-right">{player.saves}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</StatCard>
				</TabsContent>

				<TabsContent value="fielding" className="space-y-6">
					<StatCard
						title="Fielding Leaders"
						description="Top players by fielding statistics"
					>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Player</TableHead>
									<TableHead>Team</TableHead>
									<TableHead>POS</TableHead>
									<TableHead className="text-right">FPCT</TableHead>
									<TableHead className="text-right">DRS</TableHead>
									<TableHead className="text-right">A</TableHead>
									<TableHead className="text-right">PO</TableHead>
									<TableHead className="text-right">E</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{mockFieldingStats.map((player) => (
									<TableRow key={player.name}>
										<TableCell className="font-medium">{player.name}</TableCell>
										<TableCell>{player.team}</TableCell>
										<TableCell>{player.position}</TableCell>
										<TableCell className="text-right">
											{player.fpct.toFixed(3)}
										</TableCell>
										<TableCell className="text-right">{player.drs}</TableCell>
										<TableCell className="text-right">{player.assists}</TableCell>
										<TableCell className="text-right">{player.putouts}</TableCell>
										<TableCell className="text-right">{player.errors}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</StatCard>
				</TabsContent>
			</Tabs>
		</div>
	);
}

function StatCard({
	title,
	description,
	children,
}: {
	title: string;
	description: string;
	children: React.ReactNode;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
