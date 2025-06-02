import Image from 'next/image';
import { getPlayerAvatarUrl } from '@/lib/utils';
import { TrendingPlayer } from '@/types/baseball-savant';
import { Button } from './ui/button';
import { Plus, ChevronsUp, ChevronsDown } from 'lucide-react';

export const TrendingPlayers = ({ players }: { players: TrendingPlayer[] }) => {
	return (
		<dl className="grid grid-cols-1 gap-6 w-full">
			{players.map((player) => (
				<div className="flex items-center gap-4" key={player.id}>
					{player.trend.includes('↑') ? (
						<ChevronsUp className="w-6 h-6 text-green-600" />
					) : (
						<ChevronsDown className="w-6 h-6 text-red-600" />
					)}
					<div className="relative">
						<div className="rounded-full border overflow-hidden">
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
						<div className="absolute right-[-12px] top-1/2 -translate-y-1/2">
							<Button
								variant="ghost"
								size="icon"
								className="w-5 h-5 bg-red-600 rounded-full p-0 text-white hover:bg-red-700 hover:text-white"
							>
								<Plus className="w-3 h-3" />
							</Button>
						</div>
					</div>
					<div className="flex-1 ml-4">
						<dt className="text-sm">{player.name}</dt>
						<dd className="text-xs text-muted-foreground">
							{player.pos || 'DH'} - {player.name_display_club}
						</dd>
					</div>
				</div>
			))}
		</dl>
	);
};
