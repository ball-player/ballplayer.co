import { TeamLogo } from './team-logo';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';
import { TeamRecord } from '@/types/statsapi';

export function StandingsTable({ teams }: { teams: TeamRecord[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow className="border-none hover:bg-transparent">
					<TableHead className="text-primary">Team</TableHead>
					<TableHead className="text-right text-primary">W</TableHead>
					<TableHead className="text-right text-primary">L</TableHead>
					<TableHead className="text-right text-primary">GB</TableHead>
					<TableHead className="text-right text-primary">PCT</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{teams.map((team) => (
					<TableRow key={team.team.name} className="border-none">
						<TableCell className="rounded-l-xl">
							<div className="flex items-center gap-2">
								<TeamLogo
									code={team.team.abbreviation}
									size={20}
									className="w-6 h-6"
								/>
								<span>{team.team.name}</span>
							</div>
						</TableCell>
						<TableCell className="text-right">{team.wins}</TableCell>
						<TableCell className="text-right">{team.losses}</TableCell>
						<TableCell className="text-right">{team.gamesBack}</TableCell>
						<TableCell className="text-right rounded-r-xl">
							{team.winningPercentage}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
