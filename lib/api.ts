import { add, sub, format } from 'date-fns';
import {
	ClipQueryDocument,
	ContentPreference,
	FeedPreference,
	ForgeType,
	LanguagePreference,
	MediaPlaybackIdType,
	NewSearchQueryDocument,
	NewSearchQueryQueryVariables,
	QueryType,
} from '@/gql/generated';
import { GameApiResponse } from '@/types/statsapi';

export const getVideo = async (slug: string) => {
	const variables = {
		ids: [slug],
		languagePreference: LanguagePreference.En,
		idType: MediaPlaybackIdType.Slug,
		forgeInstance: ForgeType.Mlb,
		userId: '',
		withUser: true,
	};

	const params = new URLSearchParams({
		query: ClipQueryDocument,
		variables: JSON.stringify(variables),
	});
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_MLB_API_URL}?${params.toString()}`,
		{
			method: 'GET',
			cache: 'force-cache',
		}
	);

	const { data: json } = await data.json();
	return json;
};

export const getSearch = async (
	query: string,
	options: Partial<NewSearchQueryQueryVariables>
) => {
	const variables = {
		query,
		page: 0,
		limit: 24,
		queryType: QueryType.Freetext,
		feedPreference: FeedPreference.Cms,
		languagePreference: LanguagePreference.En,
		contentPreference: ContentPreference.CmsOnly,
		...options,
	};

	const params = new URLSearchParams({
		query: NewSearchQueryDocument,
		variables: JSON.stringify(variables),
	});
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_MLB_API_URL}?${params.toString()}`,
		{
			method: 'GET',
			cache: 'force-cache',
		}
	);

	const { data: json } = await data.json();
	return json;
};

export const getGames = async (date: Date): Promise<GameApiResponse> => {
	const startDate = format(date, 'yyyy-MM-dd');
	const endDate = format(add(date, { days: 1 }), 'yyyy-MM-dd');

	const variables = {
		startDate,
		endDate,
		sportId: '1',
		hydrate:
			'team,linescore,probablePitcher,stats,flags,review,broadcasts(all),game(content(media(epg),summary),tickets),seriesStatus(useOverride=true),statusFlags,story',
		language: 'en',
		sortBy: 'gameDate,gameStatus',
	};

	const params = new URLSearchParams(variables);
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_STATSAPI_URL}/schedule?${params.toString()}`,
		{
			method: 'GET',
			cache: 'no-store',
		}
	);

	return data.json();
};
