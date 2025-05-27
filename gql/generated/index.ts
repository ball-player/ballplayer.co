import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Object: { input: any; output: any; }
};

export enum ArsenalFeedType {
  Away = 'AWAY',
  Cms = 'CMS',
  Home = 'HOME',
  Network = 'NETWORK'
}

export enum AspectRatio {
  FourThree = 'FOUR_THREE',
  NineSixteen = 'NINE_SIXTEEN',
  SixteenNine = 'SIXTEEN_NINE'
}

export type CallToAction = {
  __typename?: 'CallToAction';
  text: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ClipDetails = {
  __typename?: 'ClipDetails';
  fields?: Maybe<Array<Maybe<SearchFieldValue>>>;
  gameDate?: Maybe<Scalars['String']['output']>;
  gamePk?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  links?: Maybe<Array<Maybe<Link>>>;
  mediaPlayback?: Maybe<Array<Maybe<MediaPlayback>>>;
};

export type Comparator = {
  __typename?: 'Comparator';
  displayName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<ComparatorType>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export enum ComparatorType {
  Equals = 'EQUALS',
  ExactMatch = 'EXACT_MATCH',
  GreaterThan = 'GREATER_THAN',
  GreaterThanEquals = 'GREATER_THAN_EQUALS',
  LessThan = 'LESS_THAN',
  LessThanEquals = 'LESS_THAN_EQUALS',
  Like = 'LIKE',
  NotEquals = 'NOT_EQUALS',
  NotLike = 'NOT_LIKE'
}

export type Container = {
  __typename?: 'Container';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sections?: Maybe<Array<Maybe<Section>>>;
};

export type ContainerResponse = Errors & {
  __typename?: 'ContainerResponse';
  containers?: Maybe<Array<Maybe<Container>>>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export enum ContentGroup {
  Default = 'DEFAULT',
  ExperienceA = 'EXPERIENCE_A',
  ExperienceB = 'EXPERIENCE_B',
  ExperienceC = 'EXPERIENCE_C',
  ExperienceD = 'EXPERIENCE_D',
  ExperienceE = 'EXPERIENCE_E',
  ExperienceF = 'EXPERIENCE_F'
}

export enum ContentPreference {
  CmsFirst = 'CMS_FIRST',
  CmsOnly = 'CMS_ONLY',
  Mixed = 'MIXED',
  PlayOnly = 'PLAY_ONLY'
}

export enum CriterionIdType {
  Id = 'ID',
  Name = 'NAME'
}

export type Cut = {
  __typename?: 'Cut';
  aspectRatio?: Maybe<Scalars['String']['output']>;
  at2x?: Maybe<Scalars['String']['output']>;
  at3x?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  src?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type Decisions = {
  __typename?: 'Decisions';
  loser?: Maybe<PlayerDecision>;
  save?: Maybe<PlayerDecision>;
  winner?: Maybe<PlayerDecision>;
};

export type DeleteReelResponse = {
  __typename?: 'DeleteReelResponse';
  deleted: Scalars['Boolean']['output'];
  reelId: Scalars['String']['output'];
};

export enum EntityType {
  ContentTag = 'CONTENT_TAG',
  None = 'NONE',
  Player = 'PLAYER',
  SearchTerm = 'SEARCH_TERM',
  Team = 'TEAM',
  Venue = 'VENUE'
}

export type Errors = {
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Feed = {
  __typename?: 'Feed';
  canAddToReel?: Maybe<Scalars['Boolean']['output']>;
  closedCaptions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  duration?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  playbacks?: Maybe<Array<Maybe<Playback>>>;
  type: VideoFeedType;
};


export type FeedImageArgs = {
  aspectRatio?: InputMaybe<AspectRatio>;
  aspectRatios?: InputMaybe<Array<InputMaybe<AspectRatio>>>;
  widths?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export enum FeedPreference {
  Away = 'AWAY',
  BattingTeam = 'BATTING_TEAM',
  Cms = 'CMS',
  Home = 'HOME',
  Network = 'NETWORK',
  PitchingTeam = 'PITCHING_TEAM',
  ThreeDViz = 'THREE_D_VIZ',
  World = 'WORLD'
}

export enum FieldType {
  Date = 'DATE',
  Float = 'FLOAT',
  Integer = 'INTEGER',
  Object = 'OBJECT',
  String = 'STRING'
}

export type FieldValue = {
  __typename?: 'FieldValue';
  displayValue?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export enum ForgeType {
  Milb = 'MILB',
  Mlb = 'MLB',
  OpProps = 'OP_PROPS'
}

export type Game = {
  __typename?: 'Game';
  away: Team;
  decisions?: Maybe<Decisions>;
  gameDate?: Maybe<Scalars['String']['output']>;
  gamePk: Scalars['Int']['output'];
  headline?: Maybe<Scalars['String']['output']>;
  home: Team;
  image?: Maybe<Image>;
  lineScore: LineScore;
  mediaPlayback?: Maybe<MediaPlayback>;
  scheduledInnings: Scalars['Int']['output'];
  seoTitle?: Maybe<Scalars['String']['output']>;
  status: GameStatus;
  storyUrl?: Maybe<Scalars['String']['output']>;
  venueId: Scalars['Int']['output'];
};

export type GameState = {
  __typename?: 'GameState';
  away?: Maybe<LineScoreTeam>;
  home?: Maybe<LineScoreTeam>;
};

export type GameStatePrePost = {
  __typename?: 'GameStatePrePost';
  post?: Maybe<GameState>;
  pre?: Maybe<GameState>;
};

export enum GameStatus {
  Cancelled = 'CANCELLED',
  Final = 'FINAL',
  Live = 'LIVE',
  Postponed = 'POSTPONED',
  Scheduled = 'SCHEDULED',
  Suspended = 'SUSPENDED'
}

export type Image = {
  __typename?: 'Image';
  altText: Scalars['String']['output'];
  cuts: Array<Maybe<Cut>>;
  templateUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type ImageInfo = {
  __typename?: 'ImageInfo';
  size: ImageSize;
  url: Scalars['String']['output'];
};

export enum ImageSize {
  Fivezerofour = 'FIVEZEROFOUR',
  Oneeighty = 'ONEEIGHTY',
  Onesixtyeight = 'ONESIXTYEIGHT',
  Onetwenty = 'ONETWENTY',
  Sixty = 'SIXTY',
  Threethirtysix = 'THREETHIRTYSIX'
}

export type InfoResponse = {
  __typename?: 'InfoResponse';
  count?: Maybe<Scalars['Int']['output']>;
  graph?: Maybe<Scalars['Object']['output']>;
  query: Scalars['String']['output'];
  valid?: Maybe<Scalars['Boolean']['output']>;
};

export enum InningState {
  Bottom = 'BOTTOM',
  End = 'END',
  Middle = 'MIDDLE',
  Top = 'TOP'
}

export type KeywordDisplay = {
  __typename?: 'KeywordDisplay';
  displayName: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export enum LanguagePreference {
  En = 'EN',
  Es = 'ES'
}

export type LineScore = {
  __typename?: 'LineScore';
  away: LineScoreTeam;
  balls: Scalars['Int']['output'];
  home: LineScoreTeam;
  inning: Scalars['Int']['output'];
  inningHalf: TopBottom;
  inningState: InningState;
  innings?: Maybe<Array<Maybe<LineScoreInning>>>;
  outs: Scalars['Int']['output'];
  strikes: Scalars['Int']['output'];
};

export type LineScoreInning = {
  __typename?: 'LineScoreInning';
  away?: Maybe<LineScoreTeam>;
  home?: Maybe<LineScoreTeam>;
  num: Scalars['Int']['output'];
  ordinalNum: Scalars['String']['output'];
};

export type LineScoreTeam = {
  __typename?: 'LineScoreTeam';
  errors: Scalars['Int']['output'];
  hits: Scalars['Int']['output'];
  runs: Scalars['Int']['output'];
};

export type Link = {
  __typename?: 'Link';
  href?: Maybe<Scalars['String']['output']>;
  rel?: Maybe<Scalars['String']['output']>;
};

export type MediaPlayInfo = {
  __typename?: 'MediaPlayInfo';
  balls?: Maybe<Scalars['Int']['output']>;
  exitVelocity?: Maybe<Scalars['String']['output']>;
  gameDayPitchZone?: Maybe<Scalars['String']['output']>;
  gamePk?: Maybe<Scalars['Int']['output']>;
  gameState?: Maybe<GameStatePrePost>;
  hitDistance?: Maybe<Scalars['String']['output']>;
  inning?: Maybe<Scalars['Int']['output']>;
  inningHalf?: Maybe<Scalars['String']['output']>;
  isSinglePlay?: Maybe<Scalars['Boolean']['output']>;
  keyPlayers?: Maybe<Array<Maybe<PlayerInfo>>>;
  keyTeams?: Maybe<Array<Maybe<TeamInfo>>>;
  launchAngle?: Maybe<Scalars['String']['output']>;
  outs?: Maybe<Scalars['Int']['output']>;
  pitchSpeed?: Maybe<Scalars['String']['output']>;
  pitchType?: Maybe<Scalars['String']['output']>;
  players?: Maybe<PlayersInfo>;
  runners?: Maybe<Runners>;
  scoreDifferential?: Maybe<Scalars['String']['output']>;
  spinRate?: Maybe<Scalars['String']['output']>;
  strikes?: Maybe<Scalars['Int']['output']>;
  teams?: Maybe<TeamsInfo>;
};

export type MediaPlayback = {
  __typename?: 'MediaPlayback';
  blurb?: Maybe<Scalars['String']['output']>;
  canAddToReel?: Maybe<Scalars['Boolean']['output']>;
  createdOn?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  feeds?: Maybe<Array<Maybe<Feed>>>;
  guid?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  keywordsDisplay?: Maybe<Array<Maybe<KeywordDisplay>>>;
  kicker?: Maybe<Scalars['String']['output']>;
  language?: Maybe<LanguagePreference>;
  lastUpdatedDate?: Maybe<Scalars['String']['output']>;
  mediaPlaybackId?: Maybe<Scalars['String']['output']>;
  mediaState?: Maybe<Scalars['String']['output']>;
  nonSearchable?: Maybe<Scalars['Boolean']['output']>;
  playInfo?: Maybe<MediaPlayInfo>;
  slug?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  translationId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};


export type MediaPlaybackFeedsArgs = {
  types?: InputMaybe<Array<InputMaybe<VideoFeedType>>>;
};

export enum MediaPlaybackIdType {
  ContentId = 'CONTENT_ID',
  PlayId = 'PLAY_ID',
  Slug = 'SLUG',
  UserSlug = 'USER_SLUG'
}

export type Mutation = {
  __typename?: 'Mutation';
  addReel?: Maybe<ReelResponse>;
  deleteReel?: Maybe<DeleteReelResponse>;
};


export type MutationAddReelArgs = {
  reelRequest: ReelInput;
};


export type MutationDeleteReelArgs = {
  reelId: Scalars['String']['input'];
};

export enum OrderBy {
  CreatedAt = 'CREATED_AT',
  Duration = 'DURATION',
  ReelTitle = 'REEL_TITLE',
  UpdatedAt = 'UPDATED_AT'
}

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PagedClipDetails = {
  __typename?: 'PagedClipDetails';
  plays?: Maybe<Array<Maybe<ClipDetails>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PagedReelResponse = {
  __typename?: 'PagedReelResponse';
  reels?: Maybe<Array<Maybe<ReelResponse>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Playback = {
  __typename?: 'Playback';
  mimetype?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  segments?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  url: Scalars['String']['output'];
};

export type PlayerDecision = {
  __typename?: 'PlayerDecision';
  earnedRuns?: Maybe<Scalars['Int']['output']>;
  era?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  innings?: Maybe<Scalars['String']['output']>;
  losses?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  playerHand?: Maybe<Scalars['String']['output']>;
  saves?: Maybe<Scalars['Int']['output']>;
  strikeouts?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

export type PlayerInfo = {
  __typename?: 'PlayerInfo';
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  mugshots?: Maybe<Array<Maybe<ImageInfo>>>;
  name?: Maybe<Scalars['String']['output']>;
  playerHand?: Maybe<Scalars['String']['output']>;
};


export type PlayerInfoMugshotsArgs = {
  sizes?: InputMaybe<Array<InputMaybe<ImageSize>>>;
};

export enum PlayerStoryExperience {
  PlayerHighlights = 'PLAYER_HIGHLIGHTS'
}

export type PlayersInfo = {
  __typename?: 'PlayersInfo';
  batter?: Maybe<PlayerInfo>;
  pitcher?: Maybe<PlayerInfo>;
};

export type PlaylistTransition = {
  playlistTransitionType: PlaylistTransitionType;
  transitionPosition: Scalars['Int']['input'];
};

export enum PlaylistTransitionType {
  Intro = 'INTRO',
  Outro = 'OUTRO'
}

export type Query = {
  __typename?: 'Query';
  commonFields?: Maybe<Array<Maybe<SearchFieldValue>>>;
  /** Criterion queries */
  containers?: Maybe<ContainerResponse>;
  contentTagDisplayValues?: Maybe<Array<Maybe<KeywordDisplay>>>;
  fields?: Maybe<Array<Maybe<SearchFieldMetadata>>>;
  games?: Maybe<Array<Maybe<Game>>>;
  getReelBySlug?: Maybe<ReelResponse>;
  getReels?: Maybe<PagedReelResponse>;
  mediaPlayback?: Maybe<Array<Maybe<MediaPlayback>>>;
  people?: Maybe<Array<Maybe<PlayerInfo>>>;
  playerStories?: Maybe<Array<Maybe<Story>>>;
  playerStory?: Maybe<Story>;
  queryInfo?: Maybe<Array<Maybe<InfoResponse>>>;
  search?: Maybe<PagedClipDetails>;
  sectionTypeFields?: Maybe<SectionTypeFieldResponse>;
  sectionTypes?: Maybe<SectionTypeResponse>;
  sections?: Maybe<SectionResponse>;
  story?: Maybe<Story>;
  suggestedSearches?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  suggestedStories?: Maybe<Array<Maybe<StoryPreview>>>;
  teams?: Maybe<Array<Maybe<TeamInfo>>>;
  topicPlayList?: Maybe<TopicPlayList>;
  types?: Maybe<Array<Maybe<SearchFieldTypeMetadata>>>;
  userInfo?: Maybe<UserInfo>;
  userStory?: Maybe<Story>;
  userSuggestions?: Maybe<Array<Maybe<MediaPlayback>>>;
  validateReel?: Maybe<ReelValidationResponse>;
};


export type QueryCommonFieldsArgs = {
  languagePreference?: InputMaybe<LanguagePreference>;
  plays: Array<InputMaybe<Scalars['String']['input']>>;
};


export type QueryContainersArgs = {
  idType?: InputMaybe<CriterionIdType>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryContentTagDisplayValuesArgs = {
  contentTags?: InputMaybe<Array<Scalars['String']['input']>>;
  forgeInstance?: InputMaybe<ForgeType>;
};


export type QueryFieldsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  languagePreference?: InputMaybe<LanguagePreference>;
  searchType?: InputMaybe<SearchType>;
};


export type QueryGamesArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  languagePreference?: InputMaybe<LanguagePreference>;
};


export type QueryGetReelBySlugArgs = {
  slug: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetReelsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  page?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMediaPlaybackArgs = {
  contentGroup?: InputMaybe<ContentGroup>;
  forgeInstance?: InputMaybe<ForgeType>;
  idType?: InputMaybe<MediaPlaybackIdType>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  languagePreference?: InputMaybe<LanguagePreference>;
};


export type QueryPeopleArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type QueryPlayerStoriesArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  experience?: InputMaybe<PlayerStoryExperience>;
  experienceType?: InputMaybe<Scalars['String']['input']>;
  forgeInstance?: InputMaybe<ForgeType>;
  languagePreference?: InputMaybe<LanguagePreference>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  playerIds: Array<InputMaybe<Scalars['Int']['input']>>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPlayerStoryArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  experience?: InputMaybe<PlayerStoryExperience>;
  experienceType?: InputMaybe<Scalars['String']['input']>;
  forgeInstance?: InputMaybe<ForgeType>;
  languagePreference?: InputMaybe<LanguagePreference>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  playerId: Scalars['Int']['input'];
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryQueryInfoArgs = {
  includeCount?: InputMaybe<Scalars['Boolean']['input']>;
  languagePreference?: InputMaybe<LanguagePreference>;
  queries?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  queryType?: InputMaybe<QueryType>;
};


export type QuerySearchArgs = {
  contentGroup?: InputMaybe<ContentGroup>;
  contentPreference?: InputMaybe<ContentPreference>;
  feedPreference?: InputMaybe<FeedPreference>;
  forgeInstance?: InputMaybe<ForgeType>;
  languagePreference?: InputMaybe<LanguagePreference>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
  queryType?: InputMaybe<QueryType>;
  searchType?: InputMaybe<SearchType>;
};


export type QuerySectionTypeFieldsArgs = {
  sectionTypeId: Scalars['Int']['input'];
};


export type QuerySectionTypesArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type QuerySectionsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type QueryStoryArgs = {
  forgeInstance?: InputMaybe<ForgeType>;
  languagePreference?: InputMaybe<LanguagePreference>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  search: Scalars['String']['input'];
  searchType: StorySearchType;
};


export type QuerySuggestedSearchesArgs = {
  total?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySuggestedStoriesArgs = {
  languagePreference?: InputMaybe<LanguagePreference>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  search: Scalars['String']['input'];
  searchType: StoriesSearchType;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTeamsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type QueryTopicPlayListArgs = {
  adobeId?: InputMaybe<Scalars['String']['input']>;
  contentGroup?: InputMaybe<ContentGroup>;
  forgeInstance?: InputMaybe<ForgeType>;
  languagePreference?: InputMaybe<LanguagePreference>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
  topicId?: InputMaybe<Scalars['String']['input']>;
  videoSlug?: InputMaybe<Scalars['String']['input']>;
  videoTranslationId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserInfoArgs = {
  userId: Scalars['String']['input'];
};


export type QueryUserStoryArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  experienceType?: InputMaybe<Scalars['String']['input']>;
  forgeInstance?: InputMaybe<ForgeType>;
  languagePreference?: InputMaybe<LanguagePreference>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  startDate: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserSuggestionsArgs = {
  experience?: InputMaybe<Scalars['String']['input']>;
  forgeInstance?: InputMaybe<ForgeType>;
  languagePreference?: InputMaybe<LanguagePreference>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  userLocation: UserLocation;
};


export type QueryValidateReelArgs = {
  reelRequest: ReelInput;
};

export enum QueryType {
  Freetext = 'FREETEXT',
  Structured = 'STRUCTURED'
}

export type Range = {
  __typename?: 'Range';
  max?: Maybe<Scalars['String']['output']>;
  min?: Maybe<Scalars['String']['output']>;
};

export type ReelClip = {
  clipSlug: Scalars['String']['input'];
  feedType: ArsenalFeedType;
  offsetEndTime?: InputMaybe<Scalars['Float']['input']>;
  offsetStartTime?: InputMaybe<Scalars['Float']['input']>;
  originalDuration: Scalars['Float']['input'];
  thumbnailUrl: Scalars['String']['input'];
  trimmedDuration?: InputMaybe<Scalars['Float']['input']>;
  videoUrl?: InputMaybe<Scalars['String']['input']>;
};

export type ReelInput = {
  reelClips: Array<InputMaybe<ReelClip>>;
  reelTitle: Scalars['String']['input'];
  thumbnailUrl: Scalars['String']['input'];
  transitions?: InputMaybe<Array<InputMaybe<PlaylistTransition>>>;
};

export type ReelResponse = {
  __typename?: 'ReelResponse';
  createdAt?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['String']['output']>;
  mediaPlayback?: Maybe<MediaPlayback>;
  reelSlug?: Maybe<Scalars['String']['output']>;
  reelTitle?: Maybe<Scalars['String']['output']>;
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  videoUrl?: Maybe<Scalars['String']['output']>;
};

export type ReelValidationResponse = {
  __typename?: 'ReelValidationResponse';
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  valid?: Maybe<Scalars['Boolean']['output']>;
};

export type Runners = {
  __typename?: 'Runners';
  first: Scalars['Boolean']['output'];
  second: Scalars['Boolean']['output'];
  third: Scalars['Boolean']['output'];
};

export enum SearchFieldCategory {
  Batter = 'BATTER',
  Content = 'CONTENT',
  Fielder = 'FIELDER',
  Game = 'GAME',
  General = 'GENERAL',
  Pitcher = 'PITCHER',
  Playmetadata = 'PLAYMETADATA',
  Runner = 'RUNNER',
  Unknown = 'UNKNOWN'
}

export type SearchFieldMetadata = {
  __typename?: 'SearchFieldMetadata';
  category?: Maybe<SearchFieldCategory>;
  defaultOperator?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  display?: Maybe<Scalars['Boolean']['output']>;
  displayName: Scalars['String']['output'];
  entityType: EntityType;
  helperText?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  range?: Maybe<Array<Maybe<Range>>>;
  supportsDistinctValues?: Maybe<Scalars['Boolean']['output']>;
  supportsRange?: Maybe<Scalars['Boolean']['output']>;
  type: SearchFieldType;
  typeAheadEnabled?: Maybe<Scalars['Boolean']['output']>;
  unitOfMeasurement?: Maybe<UnitOfMeasurement>;
  values?: Maybe<Array<Maybe<FieldValue>>>;
};

export enum SearchFieldType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Datetime = 'DATETIME',
  Number = 'NUMBER',
  String = 'STRING',
  Unknown = 'UNKNOWN'
}

export type SearchFieldTypeMetadata = {
  __typename?: 'SearchFieldTypeMetadata';
  name?: Maybe<SearchFieldType>;
  supportedComparators?: Maybe<Array<Maybe<Comparator>>>;
};

export type SearchFieldValue = {
  __typename?: 'SearchFieldValue';
  displayField?: Maybe<SearchFieldMetadata>;
  displayFieldSearchValue?: Maybe<Scalars['String']['output']>;
  displayValue?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export enum SearchType {
  Plays = 'PLAYS',
  Unified = 'UNIFIED'
}

export type Section = {
  __typename?: 'Section';
  fields?: Maybe<Array<Maybe<SectionField>>>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SectionType>;
};

export type SectionField = {
  __typename?: 'SectionField';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<FieldType>;
  value?: Maybe<Scalars['String']['output']>;
};

export type SectionResponse = {
  __typename?: 'SectionResponse';
  sections?: Maybe<Array<Maybe<Section>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type SectionType = {
  __typename?: 'SectionType';
  description?: Maybe<Scalars['String']['output']>;
  fields?: Maybe<Array<Maybe<SectionTypeField>>>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};


export type SectionTypeFieldsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type SectionTypeField = {
  __typename?: 'SectionTypeField';
  defaultValue?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fieldType?: Maybe<FieldType>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  required?: Maybe<Scalars['Boolean']['output']>;
};

export type SectionTypeFieldResponse = {
  __typename?: 'SectionTypeFieldResponse';
  sectionTypeFields?: Maybe<Array<Maybe<SectionTypeField>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type SectionTypeResponse = {
  __typename?: 'SectionTypeResponse';
  sectionTypes?: Maybe<Array<Maybe<SectionType>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export enum Source {
  Cms = 'CMS',
  FilmRoom = 'FILM_ROOM'
}

export enum StoriesSearchType {
  UserId = 'USER_ID',
  VsmSlug = 'VSM_SLUG'
}

export type Story = {
  __typename?: 'Story';
  contentDate?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  headline?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  keywordsDisplay?: Maybe<Array<Maybe<KeywordDisplay>>>;
  language?: Maybe<LanguagePreference>;
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  lastUpdatedDate?: Maybe<Scalars['String']['output']>;
  parts?: Maybe<Array<Maybe<StoryPart>>>;
  relatedGames?: Maybe<Array<Maybe<StoryGame>>>;
  slug?: Maybe<Scalars['String']['output']>;
  sponsor?: Maybe<StorySponsor>;
  subHeadline?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
};


export type StoryImageArgs = {
  aspectRatio?: InputMaybe<AspectRatio>;
  aspectRatios?: InputMaybe<Array<InputMaybe<AspectRatio>>>;
  widths?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type StoryRelatedGamesArgs = {
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};

export type StoryGame = {
  __typename?: 'StoryGame';
  away: Team;
  gamePk: Scalars['Int']['output'];
  home: Team;
};

export type StoryPart = {
  __typename?: 'StoryPart';
  cta?: Maybe<CallToAction>;
  highlightedPlayers?: Maybe<Array<Maybe<PlayerInfo>>>;
  impactLabel?: Maybe<Scalars['String']['output']>;
  mediaPlayback: MediaPlayback;
  queryType?: Maybe<StoryPartQueryType>;
  source?: Maybe<Source>;
  template?: Maybe<Template>;
  type: StoryPartType;
};

export enum StoryPartQueryType {
  Freetext = 'FREETEXT',
  Manual = 'MANUAL',
  Structured = 'STRUCTURED'
}

export enum StoryPartType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type StoryPreview = {
  __typename?: 'StoryPreview';
  image?: Maybe<Image>;
  metadata?: Maybe<Scalars['Object']['output']>;
  storyType?: Maybe<StoryType>;
  title?: Maybe<Scalars['String']['output']>;
};


export type StoryPreviewImageArgs = {
  aspectRatio?: InputMaybe<AspectRatio>;
  aspectRatios?: InputMaybe<Array<InputMaybe<AspectRatio>>>;
  widths?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export enum StorySearchType {
  FreetextQuery = 'FREETEXT_QUERY',
  Slug = 'SLUG',
  StructuredQuery = 'STRUCTURED_QUERY'
}

export type StorySponsor = {
  __typename?: 'StorySponsor';
  text?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export enum StoryType {
  Editorial = 'EDITORIAL',
  Game = 'GAME',
  Player = 'PLAYER'
}

export type Team = {
  __typename?: 'Team';
  abbreviation: Scalars['String']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
};

export type TeamInfo = {
  __typename?: 'TeamInfo';
  id: Scalars['Int']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  shortName?: Maybe<Scalars['String']['output']>;
  triCode?: Maybe<Scalars['String']['output']>;
};

export type TeamsInfo = {
  __typename?: 'TeamsInfo';
  away?: Maybe<TeamInfo>;
  batting?: Maybe<TeamInfo>;
  home?: Maybe<TeamInfo>;
  pitching?: Maybe<TeamInfo>;
};

export enum Template {
  Chin = 'CHIN',
  Fullscreen = 'FULLSCREEN'
}

export enum TopBottom {
  Bottom = 'BOTTOM',
  Top = 'TOP'
}

export type TopicPlayList = {
  __typename?: 'TopicPlayList';
  hasMore: Scalars['Boolean']['output'];
  mediaPlayback?: Maybe<Array<MediaPlayback>>;
  modelType: Scalars['String']['output'];
  modelVersion?: Maybe<Scalars['String']['output']>;
  puid?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type UnitOfMeasurement = {
  __typename?: 'UnitOfMeasurement';
  spanishValue?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  email?: Maybe<Scalars['String']['output']>;
  favoriteTeam?: Maybe<TeamInfo>;
  firstName?: Maybe<Scalars['String']['output']>;
  followedPlayers?: Maybe<Array<Maybe<PlayerInfo>>>;
  followedTeams?: Maybe<Array<Maybe<TeamInfo>>>;
  lastName?: Maybe<Scalars['String']['output']>;
  nickName?: Maybe<Scalars['String']['output']>;
  preferredLang?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type UserLocation = {
  country?: InputMaybe<Scalars['String']['input']>;
  metroCode?: InputMaybe<Scalars['Int']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
};

export enum VideoFeedType {
  Away = 'AWAY',
  AwayMux = 'AWAY_MUX',
  AwayShd = 'AWAY_SHD',
  Cf = 'CF',
  Cms = 'CMS',
  FirstBaseBatterSideview = 'FIRST_BASE_BATTER_SIDEVIEW',
  FirstBasePitcherSideview = 'FIRST_BASE_PITCHER_SIDEVIEW',
  FirstBaseSideview = 'FIRST_BASE_SIDEVIEW',
  Highhome = 'HIGHHOME',
  Home = 'HOME',
  HomeMux = 'HOME_MUX',
  HomeShd = 'HOME_SHD',
  NationalMux = 'NATIONAL_MUX',
  Network = 'NETWORK',
  NetworkShd = 'NETWORK_SHD',
  PaceOfGameMultiview = 'PACE_OF_GAME_MULTIVIEW',
  Reel = 'REEL',
  ReplayMultiview = 'REPLAY_MULTIVIEW',
  ThirdBaseBatterSideview = 'THIRD_BASE_BATTER_SIDEVIEW',
  ThirdBasePitcherSideview = 'THIRD_BASE_PITCHER_SIDEVIEW',
  ThirdBaseSideview = 'THIRD_BASE_SIDEVIEW',
  ThreeDViz = 'THREE_D_VIZ',
  Unknown = 'UNKNOWN',
  World = 'WORLD'
}

export type FeedFieldsFragment = { __typename?: 'Feed', type: VideoFeedType, duration?: string | null, closedCaptions?: Array<string | null> | null, playbacks?: Array<{ __typename: 'Playback', name: string, url: string, mimetype?: string | null, segments?: Array<number | null> | null } | null> | null, image?: { __typename: 'Image', altText: string, title: string, templateUrl?: string | null, cuts: Array<{ __typename: 'Cut', aspectRatio?: string | null, width?: number | null, height?: number | null, src?: string | null } | null> } | null };

export type ImageFieldsFragment = { __typename?: 'Image', altText: string, title: string, templateUrl?: string | null, cuts: Array<{ __typename: 'Cut', aspectRatio?: string | null, width?: number | null, height?: number | null, src?: string | null } | null> };

export type KeywordsDisplayFieldsFragment = { __typename?: 'KeywordDisplay', slug: string, displayName: string };

export type MediaPlayInfoFieldsFragment = { __typename?: 'MediaPlayInfo', isSinglePlay?: boolean | null, balls?: number | null, strikes?: number | null, outs?: number | null, inning?: number | null, inningHalf?: string | null, pitchSpeed?: string | null, pitchType?: string | null, exitVelocity?: string | null, hitDistance?: string | null, launchAngle?: string | null, spinRate?: string | null, scoreDifferential?: string | null, gamePk?: number | null, runners?: { __typename: 'Runners', first: boolean, second: boolean, third: boolean } | null, teams?: { __typename: 'TeamsInfo', away?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null, home?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null, batting?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null, pitching?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null } | null, players?: { __typename: 'PlayersInfo', pitcher?: { __typename: 'PlayerInfo', id: number, name?: string | null, lastName?: string | null, playerHand?: string | null, mugshots?: Array<{ __typename?: 'ImageInfo', url: string } | null> | null } | null, batter?: { __typename: 'PlayerInfo', id: number, name?: string | null, lastName?: string | null, playerHand?: string | null, mugshots?: Array<{ __typename?: 'ImageInfo', url: string } | null> | null } | null } | null };

export type MediaPlaybackFieldsFragment = { __typename: 'MediaPlayback', id?: string | null, slug?: string | null, title?: string | null, blurb?: string | null, description?: string | null, date?: string | null, canAddToReel?: boolean | null, translationId?: string | null, feeds?: Array<{ __typename: 'Feed', type: VideoFeedType, duration?: string | null, closedCaptions?: Array<string | null> | null, playbacks?: Array<{ __typename: 'Playback', name: string, url: string, mimetype?: string | null, segments?: Array<number | null> | null } | null> | null, image?: { __typename: 'Image', altText: string, title: string, templateUrl?: string | null, cuts: Array<{ __typename: 'Cut', aspectRatio?: string | null, width?: number | null, height?: number | null, src?: string | null } | null> } | null } | null> | null, keywordsDisplay?: Array<{ __typename: 'KeywordDisplay', slug: string, displayName: string } | null> | null, playInfo?: { __typename: 'MediaPlayInfo', isSinglePlay?: boolean | null, balls?: number | null, strikes?: number | null, outs?: number | null, inning?: number | null, inningHalf?: string | null, pitchSpeed?: string | null, pitchType?: string | null, exitVelocity?: string | null, hitDistance?: string | null, launchAngle?: string | null, spinRate?: string | null, scoreDifferential?: string | null, gamePk?: number | null, runners?: { __typename: 'Runners', first: boolean, second: boolean, third: boolean } | null, teams?: { __typename: 'TeamsInfo', away?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null, home?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null, batting?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null, pitching?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null } | null, players?: { __typename: 'PlayersInfo', pitcher?: { __typename: 'PlayerInfo', id: number, name?: string | null, lastName?: string | null, playerHand?: string | null, mugshots?: Array<{ __typename?: 'ImageInfo', url: string } | null> | null } | null, batter?: { __typename: 'PlayerInfo', id: number, name?: string | null, lastName?: string | null, playerHand?: string | null, mugshots?: Array<{ __typename?: 'ImageInfo', url: string } | null> | null } | null } | null } | null };

export type PlaybackFieldsFragment = { __typename?: 'Playback', name: string, url: string, mimetype?: string | null, segments?: Array<number | null> | null };

export type PlayerInfoFieldsFragment = { __typename?: 'PlayerInfo', id: number, name?: string | null, lastName?: string | null, playerHand?: string | null, mugshots?: Array<{ __typename?: 'ImageInfo', url: string } | null> | null };

export type RunnersFieldsFragment = { __typename?: 'Runners', first: boolean, second: boolean, third: boolean };

export type TeamInfoFieldsFragment = { __typename?: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null };

export type NewSearchQueryQueryVariables = Exact<{
  queryType: QueryType;
  query: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  feedPreference?: InputMaybe<FeedPreference>;
  languagePreference?: InputMaybe<LanguagePreference>;
  contentPreference?: InputMaybe<ContentPreference>;
  withPlaybacksSegments?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type NewSearchQueryQuery = { __typename?: 'Query', search?: { __typename: 'PagedClipDetails', total?: number | null, plays?: Array<{ __typename: 'ClipDetails', gameDate?: string | null, id: string, gamePk?: number | null, mediaPlayback?: Array<{ __typename: 'MediaPlayback', id?: string | null, slug?: string | null, title?: string | null, blurb?: string | null, description?: string | null, date?: string | null, canAddToReel?: boolean | null, translationId?: string | null, feeds?: Array<{ __typename: 'Feed', type: VideoFeedType, duration?: string | null, closedCaptions?: Array<string | null> | null, playbacks?: Array<{ __typename: 'Playback', name: string, url: string, mimetype?: string | null, segments?: Array<number | null> | null } | null> | null, image?: { __typename: 'Image', altText: string, title: string, templateUrl?: string | null, cuts: Array<{ __typename: 'Cut', aspectRatio?: string | null, width?: number | null, height?: number | null, src?: string | null } | null> } | null } | null> | null, keywordsDisplay?: Array<{ __typename: 'KeywordDisplay', slug: string, displayName: string } | null> | null, playInfo?: { __typename: 'MediaPlayInfo', isSinglePlay?: boolean | null, balls?: number | null, strikes?: number | null, outs?: number | null, inning?: number | null, inningHalf?: string | null, pitchSpeed?: string | null, pitchType?: string | null, exitVelocity?: string | null, hitDistance?: string | null, launchAngle?: string | null, spinRate?: string | null, scoreDifferential?: string | null, gamePk?: number | null, runners?: { __typename: 'Runners', first: boolean, second: boolean, third: boolean } | null, teams?: { __typename: 'TeamsInfo', away?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null, home?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null, batting?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null, pitching?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null } | null, players?: { __typename: 'PlayersInfo', pitcher?: { __typename: 'PlayerInfo', id: number, name?: string | null, lastName?: string | null, playerHand?: string | null, mugshots?: Array<{ __typename?: 'ImageInfo', url: string } | null> | null } | null, batter?: { __typename: 'PlayerInfo', id: number, name?: string | null, lastName?: string | null, playerHand?: string | null, mugshots?: Array<{ __typename?: 'ImageInfo', url: string } | null> | null } | null } | null } | null } | null> | null } | null> | null } | null };

export type ClipQueryQueryVariables = Exact<{
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  languagePreference?: InputMaybe<LanguagePreference>;
  idType?: InputMaybe<MediaPlaybackIdType>;
  forgeInstance?: InputMaybe<ForgeType>;
  userId: Scalars['String']['input'];
  withUser: Scalars['Boolean']['input'];
  withPlaybacksSegments?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ClipQueryQuery = { __typename?: 'Query', mediaPlayback?: Array<{ __typename: 'MediaPlayback', id?: string | null, slug?: string | null, title?: string | null, blurb?: string | null, description?: string | null, date?: string | null, canAddToReel?: boolean | null, translationId?: string | null, feeds?: Array<{ __typename: 'Feed', type: VideoFeedType, duration?: string | null, closedCaptions?: Array<string | null> | null, playbacks?: Array<{ __typename: 'Playback', name: string, url: string, mimetype?: string | null, segments?: Array<number | null> | null } | null> | null, image?: { __typename: 'Image', altText: string, title: string, templateUrl?: string | null, cuts: Array<{ __typename: 'Cut', aspectRatio?: string | null, width?: number | null, height?: number | null, src?: string | null } | null> } | null } | null> | null, keywordsDisplay?: Array<{ __typename: 'KeywordDisplay', slug: string, displayName: string } | null> | null, playInfo?: { __typename: 'MediaPlayInfo', isSinglePlay?: boolean | null, balls?: number | null, strikes?: number | null, outs?: number | null, inning?: number | null, inningHalf?: string | null, pitchSpeed?: string | null, pitchType?: string | null, exitVelocity?: string | null, hitDistance?: string | null, launchAngle?: string | null, spinRate?: string | null, scoreDifferential?: string | null, gamePk?: number | null, runners?: { __typename: 'Runners', first: boolean, second: boolean, third: boolean } | null, teams?: { __typename: 'TeamsInfo', away?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null, home?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null, batting?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null, pitching?: { __typename: 'TeamInfo', name?: string | null, shortName?: string | null, triCode?: string | null } | null } | null, players?: { __typename: 'PlayersInfo', pitcher?: { __typename: 'PlayerInfo', id: number, name?: string | null, lastName?: string | null, playerHand?: string | null, mugshots?: Array<{ __typename?: 'ImageInfo', url: string } | null> | null } | null, batter?: { __typename: 'PlayerInfo', id: number, name?: string | null, lastName?: string | null, playerHand?: string | null, mugshots?: Array<{ __typename?: 'ImageInfo', url: string } | null> | null } | null } | null } | null } | null> | null, userInfo?: { __typename: 'UserInfo', firstName?: string | null, nickName?: string | null, userId: string } | null };


export const PlaybackFieldsFragmentDoc = `
    fragment PlaybackFields on Playback {
  name
  url
  mimetype
  segments @include(if: $withPlaybacksSegments)
}
    `;
export const ImageFieldsFragmentDoc = `
    fragment ImageFields on Image {
  altText
  title
  templateUrl
  cuts {
    aspectRatio
    width
    height
    src
    __typename
  }
}
    `;
export const FeedFieldsFragmentDoc = `
    fragment FeedFields on Feed {
  type
  duration
  closedCaptions
  playbacks {
    ...PlaybackFields
    __typename
  }
  image {
    ...ImageFields
    __typename
  }
}
    ${PlaybackFieldsFragmentDoc}
${ImageFieldsFragmentDoc}`;
export const KeywordsDisplayFieldsFragmentDoc = `
    fragment KeywordsDisplayFields on KeywordDisplay {
  slug
  displayName
}
    `;
export const RunnersFieldsFragmentDoc = `
    fragment RunnersFields on Runners {
  first
  second
  third
}
    `;
export const TeamInfoFieldsFragmentDoc = `
    fragment TeamInfoFields on TeamInfo {
  name
  shortName
  triCode
}
    `;
export const PlayerInfoFieldsFragmentDoc = `
    fragment PlayerInfoFields on PlayerInfo {
  id
  name
  lastName
  playerHand
  mugshots {
    url
  }
}
    `;
export const MediaPlayInfoFieldsFragmentDoc = `
    fragment MediaPlayInfoFields on MediaPlayInfo {
  isSinglePlay
  balls
  strikes
  outs
  inning
  inningHalf
  pitchSpeed
  pitchType
  exitVelocity
  hitDistance
  launchAngle
  spinRate
  scoreDifferential
  gamePk
  runners {
    ...RunnersFields
    __typename
  }
  teams {
    away {
      ...TeamInfoFields
      __typename
    }
    home {
      ...TeamInfoFields
      __typename
    }
    batting {
      ...TeamInfoFields
      __typename
    }
    pitching {
      ...TeamInfoFields
      __typename
    }
    __typename
  }
  players {
    pitcher {
      ...PlayerInfoFields
      __typename
    }
    batter {
      ...PlayerInfoFields
      __typename
    }
    __typename
  }
}
    ${RunnersFieldsFragmentDoc}
${TeamInfoFieldsFragmentDoc}
${PlayerInfoFieldsFragmentDoc}`;
export const MediaPlaybackFieldsFragmentDoc = `
    fragment MediaPlaybackFields on MediaPlayback {
  id
  slug
  title
  blurb
  description
  date
  canAddToReel
  feeds {
    ...FeedFields
    __typename
  }
  keywordsDisplay {
    ...KeywordsDisplayFields
    __typename
  }
  translationId
  playInfo {
    ...MediaPlayInfoFields
    __typename
  }
  __typename
}
    ${FeedFieldsFragmentDoc}
${KeywordsDisplayFieldsFragmentDoc}
${MediaPlayInfoFieldsFragmentDoc}`;
export const NewSearchQueryDocument = `
    query NewSearchQuery($queryType: QueryType!, $query: String!, $page: Int, $limit: Int, $feedPreference: FeedPreference, $languagePreference: LanguagePreference, $contentPreference: ContentPreference, $withPlaybacksSegments: Boolean = false) {
  search(
    queryType: $queryType
    languagePreference: $languagePreference
    contentPreference: $contentPreference
    feedPreference: $feedPreference
    limit: $limit
    page: $page
    query: $query
  ) {
    total
    plays {
      gameDate
      id
      gamePk
      mediaPlayback {
        ...MediaPlaybackFields
        __typename
      }
      __typename
    }
    __typename
  }
}
    ${MediaPlaybackFieldsFragmentDoc}`;

export const useNewSearchQueryQuery = <
      TData = NewSearchQueryQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: NewSearchQueryQueryVariables,
      options?: Omit<UseQueryOptions<NewSearchQueryQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<NewSearchQueryQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<NewSearchQueryQuery, TError, TData>(
      {
    queryKey: ['NewSearchQuery', variables],
    queryFn: fetcher<NewSearchQueryQuery, NewSearchQueryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, NewSearchQueryDocument, variables),
    ...options
  }
    )};

export const useInfiniteNewSearchQueryQuery = <
      TData = InfiniteData<NewSearchQueryQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: NewSearchQueryQueryVariables,
      options: Omit<UseInfiniteQueryOptions<NewSearchQueryQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<NewSearchQueryQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<NewSearchQueryQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['NewSearchQuery.infinite', variables],
      queryFn: (metaData) => fetcher<NewSearchQueryQuery, NewSearchQueryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, NewSearchQueryDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

export const ClipQueryDocument = `
    query clipQuery($ids: [String], $languagePreference: LanguagePreference, $idType: MediaPlaybackIdType, $forgeInstance: ForgeType = MLB, $userId: String!, $withUser: Boolean!, $withPlaybacksSegments: Boolean = false) {
  mediaPlayback(
    ids: $ids
    languagePreference: $languagePreference
    idType: $idType
    forgeInstance: $forgeInstance
  ) {
    ...MediaPlaybackFields
    __typename
  }
  userInfo(userId: $userId) @include(if: $withUser) {
    firstName
    nickName
    userId
    __typename
  }
}
    ${MediaPlaybackFieldsFragmentDoc}`;

export const useClipQueryQuery = <
      TData = ClipQueryQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: ClipQueryQueryVariables,
      options?: Omit<UseQueryOptions<ClipQueryQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ClipQueryQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ClipQueryQuery, TError, TData>(
      {
    queryKey: ['clipQuery', variables],
    queryFn: fetcher<ClipQueryQuery, ClipQueryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, ClipQueryDocument, variables),
    ...options
  }
    )};

export const useInfiniteClipQueryQuery = <
      TData = InfiniteData<ClipQueryQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: ClipQueryQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ClipQueryQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ClipQueryQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ClipQueryQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['clipQuery.infinite', variables],
      queryFn: (metaData) => fetcher<ClipQueryQuery, ClipQueryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, ClipQueryDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};
