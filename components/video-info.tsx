'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
	MediaPlaybackFieldsFragment,
	KeywordsDisplayFieldsFragment,
} from '@/gql/generated';

interface VideoInfoProps {
	mediaPlayback: MediaPlaybackFieldsFragment;
}

export function VideoInfo({ mediaPlayback }: VideoInfoProps) {
	const { title, date, keywordsDisplay, description, blurb } = mediaPlayback;
	const text = description || blurb || 'No description available.';

	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpanded = useCallback(() => {
		setIsExpanded((prev) => !prev);
	}, []);

	return (
		<div className="mt-6">
			<h1 className="text-2xl font-bold mb-2">{title}</h1>

			<div className="flex flex-wrap items-center text-sm text-muted-foreground mb-4 gap-1">
				<span className="text-nowrap mr-1">{formatDate(date ?? '')}</span>
				<Keywords keywordsDisplay={keywordsDisplay} />
			</div>

			{text.length > 240 ? (
				<>
					<div
						className={`relative overflow-hidden transition-all duration-300 ${
							isExpanded ? 'max-h-96' : 'max-h-24'
						}`}
					>
						<p className="text-foreground whitespace-pre-wrap">{text}</p>

						{!isExpanded && (
							<div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
						)}
					</div>

					<Button
						variant="ghost"
						size="sm"
						onClick={toggleExpanded}
						className="mt-2 flex items-center text-muted-foreground hover:text-foreground"
					>
						{isExpanded ? (
							<>
								Show Less <ChevronUp className="ml-1 h-4 w-4" />
							</>
						) : (
							<>
								Show More <ChevronDown className="ml-1 h-4 w-4" />
							</>
						)}
					</Button>
				</>
			) : (
				<p className="text-foreground whitespace-pre-wrap">{text}</p>
			)}
		</div>
	);
}

function Keywords({
	keywordsDisplay,
}: {
	keywordsDisplay?: (KeywordsDisplayFieldsFragment | null)[] | null;
}) {
	const [isExpandedKeywords, setIsExpandedKeywords] = useState(false);

	const toggleExpandedKeywords = useCallback(() => {
		setIsExpandedKeywords((prev) => !prev);
	}, []);

	const keywords = keywordsDisplay?.filter(
		(keyword): keyword is KeywordsDisplayFieldsFragment => keyword !== null
	);
	const firstThreeKeywords = keywords?.slice(0, 3);

	return (
		keywords &&
		keywords.length > 0 && (
			<>
				{(isExpandedKeywords ? keywords : firstThreeKeywords)?.map((keyword) => (
					<Keyword key={keyword?.slug} keyword={keyword} />
				))}
				{keywords.length > 3 && !isExpandedKeywords && (
					<span className="text-xs">
						<Button
							variant="link"
							size="sm"
							className="text-xs px-0 py-0.5 h-6"
							onClick={toggleExpandedKeywords}
						>
							+{keywords.length - 3} more
						</Button>
					</span>
				)}
			</>
		)
	);
}

function Keyword({ keyword }: { keyword: KeywordsDisplayFieldsFragment }) {
	const { slug, displayName } = keyword;

	const uriComponent = useMemo(
		() => encodeURIComponent(JSON.stringify([{ slug, displayName }])),
		[slug, displayName]
	);

	return (
		<Link
			href={`/video?tags=${uriComponent}`}
			className="bg-muted px-2 py-0.5 rounded-full text-xs h-6 flex items-center capitalize"
		>
			{slug.includes('gamepk') ? 'More From This Game' : displayName}
		</Link>
	);
}
