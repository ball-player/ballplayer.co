'use client';

import { useRouter, useParams } from 'next/navigation';
import { VideoPlayer } from '@/components/video-player';
import { VideoInfo } from '@/components/video-info';
import { VideoMetadata } from '@/components/video-metadata';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import {
	ForgeType,
	LanguagePreference,
	MediaPlaybackIdType,
	useClipQueryQuery,
} from '@/gql/generated';

export default function VideoPage() {
	const params = useParams<{ slug: string }>();
	const router = useRouter();

	// Find the video by slug
	const { data, isLoading, error } = useClipQueryQuery({
		ids: [params.slug],
		languagePreference: LanguagePreference.En,
		idType: MediaPlaybackIdType.Slug,
		forgeInstance: ForgeType.Mlb,
		userId: '',
		withUser: true,
	});

	const { mediaPlayback } = data ?? {};
	const [media] = mediaPlayback ?? [];
	// const [media] = mediaPlayback ?? [];
	// const [feed] = media?.feeds ?? [];

	if (isLoading) {
		return (
			<div className="container mx-auto py-12 px-4 flex items-center justify-center min-h-[50vh]">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
				<span className="ml-2 text-lg">Loading video...</span>
			</div>
		);
	}

	if (error || !media) {
		return (
			<div className="container mx-auto py-12 px-4 text-center min-h-[50vh]">
				<h2 className="text-2xl font-bold mb-4">Video not found</h2>
				<p className="text-muted-foreground mb-6">
					The video you&apos;re looking for couldn&apos;t be loaded or doesn&apos;t
					exist.
				</p>
				<Button onClick={() => router.push('/video')}>
					<ArrowLeft className="mr-2 h-4 w-4" /> Back to search
				</Button>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-6 px-4">
			<Button variant="ghost" className="mb-4" onClick={() => router.push('/video')}>
				<ArrowLeft className="mr-2 h-4 w-4" /> Back to search
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
