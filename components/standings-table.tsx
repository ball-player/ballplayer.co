import Link from 'next/link';
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
					<TableHead className="text-right text-primary px-2 sm:px-4">W</TableHead>
					<TableHead className="text-right text-primary px-2 sm:px-4">L</TableHead>
					<TableHead className="text-right text-primary px-2 sm:px-4">GB</TableHead>
					<TableHead className="text-right text-primary px-2 sm:px-4">PCT</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{teams.map((team) => (
					<TableRow key={team.team.name} className="border-none relative">
						<TableCell className="rounded-l-xl">
							<div className="flex items-center gap-2">
								<TeamLogo
									code={team.team.abbreviation}
									size={20}
									className="w-6 h-6"
								/>
								<Link
									href={`/teams/${team.team.id}`}
									className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-transparent before:z-10"
								>
									<span className="hidden sm:block">{team.team.name}</span>
									<span className="block sm:hidden">{team.team.abbreviation}</span>
								</Link>
							</div>
						</TableCell>
						<TableCell className="text-right px-2 sm:px-4">{team.wins}</TableCell>
						<TableCell className="text-right px-2 sm:px-4">{team.losses}</TableCell>
						<TableCell className="text-right px-2 sm:px-4">
							{team.gamesBack}
						</TableCell>
						<TableCell className="text-right px-2 sm:px-4 rounded-r-xl pr-none">
							{team.winningPercentage}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
