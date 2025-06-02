import Image from 'next/image';
import { getPlayerAvatarUrl } from '@/lib/utils';
import { TrendingPlayer } from '@/types/baseball-savant';
import { Button } from './ui/button';
import { Plus, ChevronsUp, ChevronsDown } from 'lucide-react';
import Link from 'next/link';

export const TrendingPlayers = ({ players }: { players: TrendingPlayer[] }) => {
	return (
		<dl className="grid grid-cols-1 gap-2 w-full">
			{players.map((player) => (
				<div
					className="flex items-center justify-start w-full gap-4 rounded-lg hover:bg-muted p-2 relative group overflow-hidden"
					key={player.id}
				>
					<div className="flex items-center gap-2">
						<div className="w-6 h-6">
							{player.trend.includes('↑') ? (
								<ChevronsUp className="w-6 h-6 text-success" />
							) : (
								<ChevronsDown className="w-6 h-6 text-destructive" />
							)}
						</div>
						<div className="relative">
							<div className="rounded-full border w-10 h-10 overflow-hidden">
								<Image
									src={getPlayerAvatarUrl({
										id: Number(player.id),
									})}
									alt=""
									role="presentation"
									width={42}
									height={42}
								/>
							</div>
							<div className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-20">
								<Button
									variant="ghost"
									size="icon"
									className="w-5 h-5 bg-red-600 rounded-full p-0 text-white hover:bg-red-700 hover:text-white"
								>
									<Plus className="w-3 h-3" />
								</Button>
							</div>
						</div>
					</div>
					<div className="ml-4 overflow-hidden">
						<dt className="text-sm w-full truncate">
							<Link
								href={`/players/${player.id}`}
								className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-transparent before:z-10"
							>
								{player.name}
							</Link>
						</dt>
						<dd className="text-xs text-muted-foreground">
							{player.pos || 'DH'} - {player.name_display_club}
						</dd>
					</div>
				</div>
			))}
		</dl>
	);
};
