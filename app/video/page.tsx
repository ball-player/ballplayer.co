import { Suspense } from 'react';
import { SearchResults } from '@/components/search-results';

export default function Home() {
	return (
		<div className="container mx-auto px-4 py-8">
			<section className="mb-8">
				<h1 className="text-4xl font-bold tracking-tight mb-4">MLB Video Search</h1>
				<p className="text-muted-foreground text-lg mb-6">
					Search for your favorite MLB highlights, plays, and moments
				</p>
			</section>

			<Suspense
				fallback={
					<div className="h-96 flex items-center justify-center">Loading...</div>
				}
			>
				<SearchResults />
			</Suspense>
		</div>
	);
}
