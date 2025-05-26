'use client';

import { useState } from 'react';
import { formatDate, formatDuration, getImageUrl } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { VideoDialog } from './video-dialog';
import { MediaPlaybackFieldsFragment } from '@/gql/generated';

interface VideoCardProps {
	mediaPlayback: MediaPlaybackFieldsFragment;
}

export function VideoCard({ mediaPlayback }: VideoCardProps) {
	const [isHovering, setIsHovering] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);

	const { playInfo, feeds, title, date, description, blurb } = mediaPlayback;
	const feed = feeds?.[0];
	const { image, duration } = feed ?? {};
	const imageUrl = image ? getImageUrl(image) : '';

	// Team information
	const homeTeam = playInfo?.teams?.home;
	const awayTeam = playInfo?.teams?.away;
	// const battingTeam = playInfo?.teams?.batting;

	// Use batting team for card accent color
	// const teamColor = battingTeam?.triCode
	// 	? getTeamColor(battingTeam.triCode)
	// 	: '#333333';

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	};

	return (
		<>
			<motion.div
				variants={item}
				whileHover={{ y: -5, transition: { duration: 0.2 } }}
				className="group relative overflow-hidden rounded-lg border bg-card cursor-pointer"
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				onClick={() => setDialogOpen(true)}
			>
				<div className="relative aspect-video overflow-hidden">
					{/* Team color overlay at top */}
					{/* <div 
            className="absolute top-0 left-0 right-0 h-1 z-10"
            style={{ backgroundColor: teamColor }}
          /> */}

					<img
						src={imageUrl}
						alt={title ?? ''}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>

					{/* Duration badge */}
					{duration && (
						<div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
							{formatDuration(duration)}
						</div>
					)}

					{/* Teams badge */}
					{homeTeam && awayTeam && (
						<div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
							<span>{awayTeam.triCode}</span>
							<span className="mx-1">vs</span>
							<span>{homeTeam.triCode}</span>
						</div>
					)}
				</div>

				<div className="p-4">
					<h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
						{title}
					</h3>

					{date && (
						<div className="mt-2 flex items-center text-xs text-muted-foreground">
							<span>{formatDate(date)}</span>
						</div>
					)}
				</div>

				{/* Hover overlay with description */}
				<motion.div
					className="absolute inset-0 bg-background/90 flex flex-col justify-end p-4 opacity-0 transition-opacity"
					animate={{ opacity: isHovering ? 1 : 0 }}
					transition={{ duration: 0.2 }}
				>
					<h3 className="font-semibold mb-2">{title}</h3>
					<p className="text-sm line-clamp-3 text-muted-foreground mb-4">
						{description || blurb}
					</p>
					<div className="flex justify-between items-center text-xs">
						{date && <span>{formatDate(date)}</span>}
						<span className="flex items-center text-primary">
							Watch <ArrowUpRight className="ml-1 h-3 w-3" />
						</span>
					</div>
				</motion.div>
			</motion.div>
			{mediaPlayback && (
				<VideoDialog
					mediaPlayback={mediaPlayback}
					open={dialogOpen}
					onOpenChange={setDialogOpen}
				/>
			)}
		</>
	);
}
