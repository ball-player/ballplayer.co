'use client';

import Link from 'next/link';
import { Video } from '@/lib/api';
import { formatDate, getImageUrl } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RelatedVideosProps {
	videos: Video[];
}

export function RelatedVideos({ videos }: RelatedVideosProps) {
	if (!videos.length) {
		return (
			<div className="text-center p-4 border rounded-lg">
				<p className="text-muted-foreground">No related videos found</p>
			</div>
		);
	}

	return (
		<ScrollArea className="h-[400px] rounded-md border">
			<div className="space-y-4 p-4">
				{videos.map((video) => (
					<RelatedVideoItem key={video.mediaPlayback.id} video={video} />
				))}
			</div>
		</ScrollArea>
	);
}

interface RelatedVideoItemProps {
	video: Video;
}

function RelatedVideoItem({ video }: RelatedVideoItemProps) {
	const { mediaPlayback } = video;
	const feed = mediaPlayback.feeds[0];
	const imageUrl = getImageUrl(feed?.image, 320);

	return (
		<Link
			href={`/video/${mediaPlayback.slug}`}
			className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
		>
			<div className="relative flex-shrink-0 w-20 h-20 overflow-hidden rounded">
				<img
					src={imageUrl}
					alt={mediaPlayback.title}
					className="h-full w-full object-cover"
				/>
			</div>

			<div className="flex-1 min-w-0">
				<h4 className="font-medium text-sm line-clamp-2 mb-1">
					{mediaPlayback.title}
				</h4>
				<div className="text-xs text-muted-foreground">
					{formatDate(mediaPlayback.date)}
				</div>
			</div>
		</Link>
	);
}
