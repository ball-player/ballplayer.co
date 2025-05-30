export interface GameApiResponse {
	dates: GameDate[];
	totalGames: number;
	totalGamesInProgress: number;
}

export interface GameDate {
	date: string;
	games: Game[];
}

export interface Game {
	gamePk: number;
	gameDate: string;
	status: GameStatus;
	teams: TeamsInfo;
	linescore: LineScore;
	broadcasts: Broadcast[];
	content: GameContent;
	decisions: Decisions;
	tickets: Ticket[];
	flags: Flags;
	statusFlags: StatusFlags;
}

export interface GameStatus {
	abstractGameState: string;
	detailedState: string;
	statusCode: string;
}

export interface TeamsInfo {
	away: TeamGameInfo;
	home: TeamGameInfo;
}

export interface TeamGameInfo {
	score: number;
	team: TeamDetails;
	isWinner: boolean;
	probablePitcher: PlayerDetails;
	leagueRecord: TeamRecord;
}

export interface TeamRecord {
	wins: number;
	losses: number;
	pct: string;
}

export interface TeamDetails extends Team {
	abbreviation: string;
	teamCode: string;
	fileCode: string;
	teamName: string;
	shortName: string;
	franchiseName: string;
	clubName: string;
	locationName: string;
	league: LeagueDetails;
	division: DivisionDetails;
	teamLeaders: TeamLeader[];
}

export interface LeagueDetails {
	id: number;
	name: string;
}

export interface DivisionDetails {
	id: number;
	name: string;
}

export interface Player {
	id: number;
	fullName: string;
	link: string;
}

export interface PlayerDetails extends Player {
	firstName: string;
	lastName: string;
	primaryNumber: string;
	birthDate: string;
	currentAge: number;
	birthCity: string;
	birthStateProvince: string;
	birthCountry: string;
	height: string;
	weight: number;
	active: boolean;
	primaryPosition: PlayerPosition;
	useName: string;
	useLastName: string;
	middleName: string;
	boxscoreName: string;
	nickName: string;
	gender: string;
	isPlayer: boolean;
	isVerified: boolean;
	nameFirstLast: string;
	nameSlug: string;
	firstLastName: string;
	lastFirstName: string;
	lastInitName: string;
	initLastName: string;
	fullFMLName: string;
	fullLFMName: string;
	strikeZoneTop: number;
	strikeZoneBottom: number;
}

export interface PlayerDetailsWithStats extends PlayerDetails {
	stats: PlayerStat[];
}

export interface PlayerStat {
	type: { displayName: string };
	group: { displayName: string };
	stats: PitchingStats | HittingStats;
}

export interface PitchingStats {
	summary: string;
	gamesPlayed: number;
	gamesStarted: number;
	flyOuts: number;
	groundOuts: number;
	airOuts: number;
	runs: number;
	doubles: number;
	triples: number;
	homeRuns: number;
	strikeOuts: number;
	baseOnBalls: number;
	intentionalWalks: number;
	hits: number;
	hitByPitch: number;
	atBats: number;
	caughtStealing: number;
	stolenBases: number;
	stolenBasePercentage: string;
	numberOfPitches: number;
	inningsPitched: string;
	wins: number;
	losses: number;
	saves: number;
	saveOpportunities: number;
	holds: number;
	blownSaves: number;
	earnedRuns: number;
	battersFaced: number;
	outs: number;
	gamesPitched: number;
	completeGames: number;
	shutouts: number;
	pitchesThrown: number;
	balls: number;
	strikes: number;
	strikePercentage: string;
	hitBatsmen: number;
	balks: number;
	wildPitches: number;
	pickoffs: number;
	rbi: number;
	gamesFinished: number;
	runsScoredPer9: string;
	homeRunsPer9: string;
	inheritedRunners: number;
	inheritedRunnersScored: number;
	catchersInterference: number;
	sacBunts: number;
	sacFlies: number;
	passedBall: number;
}

export interface HittingStats {
	summary: string;
	gamesPlayed: number;
	flyOuts: number;
	groundOuts: number;
	airOuts: number;
	runs: number;
	doubles: number;
	triples: number;
	homeRuns: number;
	strikeOuts: number;
	baseOnBalls: number;
	intentionalWalks: number;
	hits: number;
	hitByPitch: number;
	avg: string;
	atBats: number;
	obp: string;
	slg: string;
	ops: string;
	caughtStealing: number;
	stolenBases: number;
	stolenBasePercentage: string;
	groundIntoDoublePlay: number;
	groundIntoTriplePlay: number;
	plateAppearances: number;
	totalBases: number;
	rbi: number;
	leftOnBase: number;
	sacBunts: number;
	sacFlies: number;
	babip: string;
	groundOutsToAirouts: string;
	catchersInterference: number;
	pickoffs: number;
	atBatsPerHomeRun: string;
}

export interface PlayerPosition {
	code: string;
	name: string;
	type: string;
	abbreviation: string;
}

export interface HandInfo {
	code: string;
	description: string;
}

export interface LineScore {
	note: string;
	currentInning: number;
	currentInningOrdinal: string;
	inningState: string;
	inningHalf: string;
	isTopInning: boolean;
	scheduledInnings: number;
	balls: number;
	strikes: number;
	outs: number;
	innings: Inning[];
	teams: {
		home: ScoreDetails;
		away: ScoreDetails;
	};
	defense: {
		pitcher: PlayerDetailsWithStats;
		catcher: Player;
		first: Player;
		second: Player;
		third: Player;
		shortstop: Player;
		left: Player;
		center: Player;
		right: Player;
		batter: Player;
		onDeck: Player;
		inHole: Player;
		battingOrder: number;
		team: Team;
	};
	offense: {
		batter: PlayerDetailsWithStats;
		onDeck: PlayerDetailsWithStats;
		inHole: PlayerDetailsWithStats;
		first?: PlayerDetails;
		second?: PlayerDetails;
		third?: PlayerDetails;
		pitcher?: PlayerDetailsWithStats;
		battingOrder: number;
		team: Team;
	};
}

export interface Inning {
	num: number;
	ordinalNum: string;
	home: ScoreDetails;
	away: ScoreDetails;
}

export interface ScoreDetails {
	runs?: number;
	hits?: number;
	errors?: number;
	leftOnBase?: number;
}

export interface Broadcast {
	name: string;
	type: string;
	callSign: string;
	broadcastDate: string;
	language: string;
	isNational: boolean;
	freeGame: boolean;
	freeGameStatus: boolean;
	gameDateBroadcastGuid: string;
	homeAway: 'home' | 'away';
	availability: {
		availabilityText: string;
		availabilityCode: string;
		availabilityId: number;
	};
	mediaState: {
		mediaStateText: string;
		mediaStateCode: string;
		mediaStateId: number;
	};
	availableForStreaming: boolean;
	postGameShow: boolean;
	preGameShow: boolean;
}

export interface GameContent {
	link: string;
	media: {
		epgAlternate: MediaHighlight[];
	};
}

export interface MediaHighlight {
	title: string;
	items: HighlightItem[];
}

export interface HighlightItem {
	type: string;
	date: string;
	id: string;
	headline: string;
	blurb: string;
	playbacks: Playback[];
	image: Image;
}

export interface Playback {
	name: string;
	url: string;
}

export interface Image {
	templateUrl: string;
	cuts: ImageCut[];
}

export interface ImageCut {
	aspectRatio: string;
	width: number;
	height: number;
	src: string;
}

export interface Decisions {
	winner: PlayerDetails;
	loser: PlayerDetails;
}

export interface Ticket {
	ticketType: string;
	ticketLinks: TicketLink;
}

export interface TicketLink {
	home: string;
}

export interface TeamLeader {
	leaderCategory: string;
	season: string;
	gameType: {
		id: string;
		description: string;
	};
	leaders: Leader[];
}

export interface Leader {
	rank: number;
	value: string;
	team: Team;
	league: League;
	person: Person;
	season: string;
	statGroup: string;
	totalSplits: number;
}

export interface League {
	id: number;
	name: string;
	link: string;
}

export interface Person {
	id: number;
	fullName: string;
	link: string;
	firstName: string;
	lastName: string;
}

export interface Team {
	id: number;
	name: string;
	link: string;
}

export interface Flags {
	noHitter: boolean;
	perfectGame: boolean;
}

export interface StatusFlags {
	isFinal: boolean;
	isLive: boolean;
	isDelayed: boolean;
	isCancelled: boolean;
	isPostponed: boolean;
	isScheduled: boolean;
	isWarmup: boolean;
	isManagerChallenge: boolean;
	isUmpireReview: boolean;
}
