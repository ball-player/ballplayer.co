'use server';

import { VideoPlayer } from '@/components/video-player';
import { VideoInfo } from '@/components/video-info';
import { VideoMetadata } from '@/components/video-metadata';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Link } from 'lucide-react';
import { getVideo } from '@/lib/api';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const video = await getVideo(slug);

	return {
		title: video.title,
	};
}

export default async function VideoPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const data = await getVideo(slug);

	const { mediaPlayback } = data ?? {};
	const [media] = mediaPlayback ?? [];

	if (!media) {
		return (
			<div className="container mx-auto py-12 px-4 text-center min-h-[50vh]">
				<h2 className="text-2xl font-bold mb-4">Video not found</h2>
				<p className="text-muted-foreground mb-6">
					The video you&apos;re looking for couldn&apos;t be loaded or doesn&apos;t
					exist.
				</p>
				<Link href="/video" className="text-sm text-muted-foreground">
					Back to search
				</Link>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-6 px-4">
			<Button variant="ghost" className="mb-4" asChild>
				<Link href="/video">
					<ArrowLeft className="mr-2 h-4 w-4" /> Back to search
				</Link>
			</Button>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<VideoPlayer mediaPlayback={media} playing={false} />
					<VideoInfo mediaPlayback={media} />
				</div>

				<div>
					<VideoMetadata mediaPlayback={media} />

					{/* <div className="mt-8">
						<h3 className="text-xl font-bold mb-4">Related Videos</h3>
						<RelatedVideos videos={relatedVideos} />
					</div> */}
				</div>
			</div>
		</div>
	);
}
