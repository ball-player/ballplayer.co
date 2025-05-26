'use client';

import { useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getPlayerAvatar, getTeamColor } from '@/lib/utils';
import {
	MediaPlaybackFieldsFragment,
	PlayerInfoFieldsFragment,
} from '@/gql/generated';
import { Bases } from './icons/bases';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface VideoMetadataProps {
	mediaPlayback: MediaPlaybackFieldsFragment;
}

export function VideoMetadata({ mediaPlayback }: VideoMetadataProps) {
	const { playInfo } = mediaPlayback;

	const {
		balls,
		strikes,
		outs,
		inning,
		inningHalf,
		pitchSpeed,
		pitchType,
		spinRate,
		exitVelocity,
		hitDistance,
		launchAngle,
		teams,
		players,
		runners,
	} = playInfo ?? {};

	const hasGameInfo =
		balls !== undefined || strikes !== undefined || inning !== undefined;
	const hasPitchInfo =
		pitchSpeed !== undefined || pitchType !== undefined || spinRate !== undefined;
	const hasHitInfo =
		exitVelocity !== undefined ||
		hitDistance !== undefined ||
		launchAngle !== undefined;

	// Team information
	const homeTeam = teams?.home;
	const awayTeam = teams?.away;
	const battingTeam = teams?.batting;

	// Player information
	const pitcher = players?.pitcher;
	const batter = players?.batter;

	const hitData = {
		exitVelocity,
		hitDistance,
		launchAngle,
	};

	const Pitcher = useMemo(() => {
		if (!pitcher) {
			return null;
		}

		return (
			<PlayerDisplay player={pitcher} teamCode={homeTeam?.triCode}>
				{hasPitchInfo && (
					<>
						<div className="p-2 pb-0 w-full">
							<div className="space-y-2">
								{pitchSpeed !== undefined && (
									<div className="flex justify-between">
										<span className="text-xs text-muted-foreground uppercase">
											Pitch Speed
										</span>
										<span className="text-sm font-medium">{pitchSpeed}</span>
									</div>
								)}
								{pitchType && (
									<div className="flex justify-between">
										<span className="text-xs text-muted-foreground uppercase">
											Pitch Type
										</span>
										<span className="text-sm font-medium">{pitchType}</span>
									</div>
								)}
								{spinRate !== undefined && (
									<div className="flex justify-between">
										<span className="text-xs text-muted-foreground uppercase">
											Spin Rate
										</span>
										<span className="text-sm font-medium">{spinRate}</span>
									</div>
								)}
							</div>
						</div>
					</>
				)}
			</PlayerDisplay>
		);
	}, [pitcher, homeTeam?.triCode, hasPitchInfo, pitchSpeed, pitchType, spinRate]);

	const Batter = useMemo(() => {
		if (!batter) {
			return null;
		}

		return (
			<PlayerDisplay player={batter} teamCode={awayTeam?.triCode}>
				{hasHitInfo && (
					<>
						<div className="p-2 pb-0 w-full">
							<div className="space-y-2">
								{exitVelocity !== undefined && (
									<div className="flex justify-between">
										<span className="text-xs text-muted-foreground uppercase">
											Exit Velocity
										</span>
										<span className="text-sm font-medium">{exitVelocity}</span>
									</div>
								)}
								{hitDistance !== undefined && (
									<div className="flex justify-between">
										<span className="text-xs text-muted-foreground uppercase">
											Distance
										</span>
										<span className="text-sm font-medium">{hitDistance}</span>
									</div>
								)}
								{launchAngle !== undefined && (
									<div className="flex justify-between">
										<span className="text-xs text-muted-foreground uppercase">
											Launch Angle
										</span>
										<span className="text-sm font-medium">{launchAngle}</span>
									</div>
								)}
							</div>
						</div>
					</>
				)}
			</PlayerDisplay>
		);
	}, [
		batter,
		awayTeam?.triCode,
		hasHitInfo,
		exitVelocity,
		hitDistance,
		launchAngle,
	]);

	if (!hasGameInfo && !hasPitchInfo && !hasHitInfo) {
		return null;
	}

	return (
		<Card>
			<CardHeader className="pb-10">
				<VisuallyHidden>
					<CardTitle>Play Details</CardTitle>
				</VisuallyHidden>

				{hasGameInfo && (
					<>
						<div className="space-y-3">
							<div className="flex gap-3 items-center justify-center">
								{inning !== undefined && (
									<div className="flex items-center justify-center">
										<span className="text-xs text-muted-foreground uppercase">
											{inningHalf} {inning}
										</span>
									</div>
								)}
								<div className="flex items-center justify-center">
									<Bases runners={runners} />
								</div>
								<div className="">
									<div className="flex items-center justify-center text-xs text-muted-foreground uppercase">
										{balls}-{strikes}, {outs} Outs
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</CardHeader>
			<CardContent className="space-y-6">
				{teams && (
					<div className="space-y-3">
						<div className="grid grid-cols-2 gap-4">
							{awayTeam && (
								<TeamDisplay
									name={awayTeam.name ?? ''}
									code={awayTeam.triCode ?? ''}
									isActive={battingTeam?.triCode === awayTeam.triCode}
								/>
							)}
							{homeTeam && (
								<TeamDisplay
									name={homeTeam.name ?? ''}
									code={homeTeam.triCode ?? ''}
									isActive={battingTeam?.triCode === homeTeam.triCode}
								/>
							)}
						</div>
					</div>
				)}

				{(pitcher || batter) && (
					<>
						<div className="space-y-3">
							<div className="grid grid-cols-2 gap-4">
								{battingTeam?.triCode === awayTeam?.triCode ? (
									<>
										{Batter}
										{Pitcher}
									</>
								) : (
									<>
										{Pitcher}
										{Batter}
									</>
								)}
							</div>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
}

interface TeamDisplayProps {
	name: string;
	code: string;
	isActive: boolean;
}

function TeamDisplay({ name, code, isActive }: TeamDisplayProps) {
	const teamColor = getTeamColor(code);

	return (
		<div
			className={`p-2 flex rounded border flex-col items-center justify-center gap-1 ${
				isActive ? 'bg-muted' : ''
			}`}
		>
			<Avatar className="w-8 h-8 rounded-none">
				<AvatarImage src={`/logos/${code.toLowerCase()}.svg`} />
				<AvatarFallback>
					<div
						className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
						style={{ backgroundColor: teamColor }}
					>
						{code}
					</div>
				</AvatarFallback>
			</Avatar>
			<span className="text-xs text-center font-medium line-clamp-1">{name}</span>
		</div>
	);
}

function PlayerDisplay({
	player,
	children,
}: {
	player: PlayerInfoFieldsFragment;
	teamCode?: string | null;
	children?: React.ReactNode;
}) {
	const avatar = getPlayerAvatar(player);

	return (
		<div className="p-2 flex rounded border flex-col items-center justify-center gap-1">
			<Avatar className="w-12 h-12 rounded-full bg-white">
				<AvatarImage src={avatar} />
			</Avatar>
			<span className="text-xs text-center font-medium line-clamp-1">
				{player.name}
			</span>

			<Separator />

			{children}
		</div>
	);
}
