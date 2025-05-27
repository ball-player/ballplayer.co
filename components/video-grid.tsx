'use client';

import type { MediaPlaybackFieldsFragment } from '@/gql/generated';
import { VideoCard } from '@/components/video-card';
import { motion } from 'framer-motion';

interface VideoGridProps {
	videos: MediaPlaybackFieldsFragment[];
	total: number;
}

export function VideoGrid({ videos }: VideoGridProps) {
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

function Loading() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{Array.from({ length: 24 }).map((_, index) => (
				<div key={index} className="border rounded-lg">
					<div className="aspect-video bg-muted rounded-lg animate-pulse" />
					<div className="p-4 text-left">
						<div className="h-4 bg-muted rounded-full animate-pulse" />
						<div className="h-4 w-1/2 bg-muted rounded-full animate-pulse mt-2" />
						<div className="h-4 w-1/3 bg-muted rounded-full animate-pulse mt-4" />
					</div>
				</div>
			))}
		</div>
	);
}

VideoGrid.Loading = Loading;
