import { StandingsTabs } from '@/components/standings-tabs';
import { TeamStatsChart } from '@/components/team-stats-chart';
import { TrendingPlayers } from '@/components/trending-players';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStandings, getTrendingPlayers } from '@/lib/api';

export default async function Home() {
	const standings = await getStandings(new Date());
	const trendingPlayers = await getTrendingPlayers();
	const { records } = standings;

	return (
		<div className="mx-auto container px-4 py-16">
			<div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
				<aside className="lg:row-end-1">
					<Card className="border-2">
						<CardHeader>
							<CardTitle>Live</CardTitle>
						</CardHeader>
						<CardContent>{/* <TeamStatsChart /> */}</CardContent>
					</Card>
				</aside>

				<div className="lg:col-start-2 lg:col-span-2 lg:row-span-2 lg:row-end-2">
					<div className="space-y-12">
						<div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
							<section className="space-y-6 col-span-2">
								<h2 className="relative text-lg font-normal flex items-center">
									<span>2025 Standings</span>
									<span className="flex-1 ml-4 h-px border block align-middle" />
								</h2>
								<StandingsTabs records={records} />
							</section>

							<section className="space-y-6 col-span-2 xl:col-span-1">
								<h2 className="relative text-lg font-normal flex items-center">
									<span>Trending Players</span>
									<span className="flex-1 ml-4 h-px border block align-middle" />
								</h2>
								<TrendingPlayers players={trendingPlayers} />
							</section>
						</div>

						<section className="space-y-6">
							<h2 className="relative text-lg font-normal flex items-center">
								<span>Suggested Lists</span>
								<span className="flex-1 ml-4 h-px border block align-middle" />
							</h2>
						</section>

						<section className="space-y-6">
							<h2 className="relative text-lg font-normal flex items-center">
								<span>Statistical Overview</span>
								<span className="flex-1 ml-4 h-px border block align-middle" />
							</h2>
							<TeamStatsChart />
						</section>

						<section className="space-y-6">
							<h2 className="relative text-lg font-normal flex items-center">
								<span>Latest News</span>
								<span className="flex-1 ml-4 h-px border block align-middle" />
							</h2>
						</section>
					</div>
				</div>

				<div className="space-y-8">
					<Card className="border-2">
						<CardHeader className="flex-row items-center justify-between space-y-0">
							<CardTitle className="text-md font-normal">My Teams</CardTitle>
							<Button variant="link" size="sm" className="h-6">
								Edit
							</Button>
						</CardHeader>
						<CardContent className="text-sm text-center text-muted-foreground">
							You have no teams yet.
						</CardContent>
					</Card>

					<Card className="border-2">
						<CardHeader className="flex-row items-center justify-between space-y-0">
							<CardTitle className="text-md font-normal">My Players</CardTitle>
							<Button variant="link" size="sm" className="h-6">
								Edit
							</Button>
						</CardHeader>
						<CardContent className="text-sm text-center text-muted-foreground">
							You have no players yet.
						</CardContent>
					</Card>

					<Card className="border-2">
						<CardHeader className="flex-row items-center justify-between space-y-0">
							<CardTitle className="text-md font-normal">My Lists</CardTitle>
							<Button variant="link" size="sm" className="h-6">
								Edit
							</Button>
						</CardHeader>
						<CardContent className="text-sm text-center text-muted-foreground">
							You have no lists yet.
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
