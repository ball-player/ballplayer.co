'use client';

import type { ClipDetails, MediaPlaybackFieldsFragment } from '@/gql/generated';
import { VideoCard } from '@/components/video-card';
import { motion } from 'framer-motion';

interface VideoGridProps {
	videos: MediaPlaybackFieldsFragment[];
	total: number;
}

export function VideoGrid({ videos, total }: VideoGridProps) {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
			},
		},
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">
					Search Results
					<span className="text-muted-foreground ml-2 text-base font-normal">
						({total} videos)
					</span>
				</h2>
			</div>

			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
				variants={container}
				initial="hidden"
				animate="show"
			>
				{videos.map((video) => (
					<VideoCard key={video.id} mediaPlayback={video} />
				))}
			</motion.div>
		</div>
	);
}
