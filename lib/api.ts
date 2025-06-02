import { add, format } from 'date-fns';
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
import { GameApiResponse, StandingsApiResponse } from '@/types/statsapi';
import { TrendingPlayer } from '@/types/baseball-savant';

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

export const getStats = async ({
	startDate,
	endDate,
	teamIds,
}: {
	startDate: Date;
	endDate: Date;
	teamIds: string[];
}) => {
	const variables = {
		sportId: '1',
		startDate: format(startDate, 'yyyy-MM-dd'),
		endDate: format(endDate, 'yyyy-MM-dd'),
		gameTypes: 'R',
		hydrate: 'team,linescore',
		scheduleTypes: 'games',
		language: 'en',
		teamIds: teamIds.join(','),
	};

	const params = new URLSearchParams(variables);

	const data = await fetch(
		`${process.env.NEXT_PUBLIC_STATSAPI_URL}/schedule?${params.toString()}`,
		{
			method: 'GET',
			cache: 'force-cache',
			next: {
				revalidate: 60 * 60, // 1 hour
			},
		}
	);

	return data.json();
};

export const getStandings = async (date: Date): Promise<StandingsApiResponse> => {
	const dateString = format(date, 'yyyy-MM-dd');

	const variables = {
		date: dateString,
		season: '2025',
		leagueId: '103,104',
		seasonType: 'playoffs',
		standingsType: 'regularSeason,springTraining,firstHalf,secondHalf',
		hydrate: 'division,conference,sport,league,team',
	};

	const params = new URLSearchParams(variables);

	const data = await fetch(
		`${process.env.NEXT_PUBLIC_STATSAPI_URL}/standings?${params.toString()}`,
		{
			method: 'GET',
			cache: 'no-cache',
		}
	);

	return data.json();
};

export const getTrendingPlayers = async (): Promise<TrendingPlayer[]> => {
	const data = await fetch(
		`https://baseballsavant.mlb.com/savant/api/v1/trending-players`,
		{
			method: 'GET',
		}
	);

	return data.json();
};
