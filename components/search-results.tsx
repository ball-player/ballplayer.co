'use client';

import { useSearch } from '@/components/search-provider';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { VideoGrid } from '@/components/video-grid';
import { EmptyState } from '@/components/empty-state';
import { Button } from './ui/button';
import { useEffect } from 'react';
import {
	LanguagePreference,
	FeedPreference,
	ContentPreference,
	QueryType,
	useInfiniteNewSearchQueryQuery,
	MediaPlaybackFieldsFragment,
} from '@/gql/generated';

const DEFAULT_QUERY_PARAMS = {
	page: 0,
	limit: 24,
	queryType: QueryType.Freetext,
	feedPreference: FeedPreference.Cms,
	languagePreference: LanguagePreference.En,
	contentPreference: ContentPreference.CmsOnly,
};

export function SearchResults() {
	const { ref, inView } = useInView();
	const { searchTerm } = useSearch();

	const { data, isLoading, error, fetchNextPage, isFetchingNextPage, hasNextPage } =
		useInfiniteNewSearchQueryQuery(
			{
				endpoint: process.env.NEXT_PUBLIC_MLB_API_URL!,
			},
			{
				query: searchTerm || 'home runs and web gems',
				...DEFAULT_QUERY_PARAMS,
			},
			{
				initialPageParam: 0,
				getNextPageParam: (lastPage, allPages, lastPageParam) => {
					if (lastPage.search?.plays?.length === 0) {
						return undefined;
					}

					return {
						// @ts-expect-error - page is not required for infinite queries
						page: (lastPageParam?.page ?? 0) + 1,
					};
				},
			}
		);

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage]);

	if (isLoading) {
		return <VideoGrid.Loading />;
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<h2 className="text-xl font-bold mb-2">Error loading videos</h2>
				<p className="text-muted-foreground">
					There was a problem loading the videos. Please try again.
				</p>
			</div>
		);
	}

	if (!data) {
		return null;
	}

	const videos: MediaPlaybackFieldsFragment[] = (data?.pages ?? [])
		.flatMap((page) => page?.search?.plays ?? [])
		.map((play) => play?.mediaPlayback?.[0])
		.filter((v): v is MediaPlaybackFieldsFragment => Boolean(v));
	const total = data?.pages?.[0]?.search?.total ?? 0;

	return videos.length > 0 ? (
		<div className="flex flex-col gap-4">
			<VideoGrid videos={videos} total={total} />
			{isFetchingNextPage && <VideoGrid.Loading />}
			{hasNextPage && (
				<div className="flex justify-center mt-8">
					<Button
						ref={ref}
						onClick={() => fetchNextPage()}
						variant="outline"
						size="lg"
						className="min-w-[200px]"
						disabled={isFetchingNextPage || !hasNextPage}
					>
						{isFetchingNextPage ? 'Loading...' : 'Load More'}
					</Button>
				</div>
			)}
		</div>
	) : (
		<EmptyState />
	);
}
