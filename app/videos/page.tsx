import { Suspense } from 'react';
import { SearchResults } from '@/components/search-results';

export default function Home() {
	return (
		<div className="container mx-auto px-4 py-8">
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
