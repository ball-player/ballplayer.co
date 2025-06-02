export type TrendingPlayer = {
	id: string;
	first: string;
	name: string;
	is_player: 0 | 1;
	is_prospect: 0 | 1;
	league: string;
	mlb: 0 | 1;
	name_display_club: string;
	parent_team: string;
	pos: string;
	rank: number | null;
	trend: string;
};
