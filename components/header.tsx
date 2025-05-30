import Link from 'next/link';
import { Search } from 'lucide-react';

import { ModeToggle } from '@/components/mode-toggle';
import { SiteNavigation } from '@/components/site-navigation';
import { GameCarousel } from '@/components/game-carousel';
import { UserDropdown } from '@/components/user-dropdown';
import { SearchBar } from '@/components/search-bar';

import { getGames } from '@/lib/api';
import { Button } from './ui/button';

export async function Header() {
	const { dates } = await getGames(new Date());

	return (
		<>
			<header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
				<div className="container px-4 w-full mx-auto flex h-16 items-center justify-between gap-6 relative">
					<div className="flex items-center gap-2">
						<Link href="/" className="flex items-center gap-2">
							<div className="rounded-full bg-primary p-1.5">
								<Search className="h-5 w-5 text-primary-foreground" />
							</div>
						</Link>
					</div>

					<div className="absolute left-1/2 -translate-x-1/2 w-full max-w-md hidden md:block">
						<SearchBar />
					</div>

					{/* Desktop Navigation */}
					<nav className="flex items-center gap-4">
						{/* <Link
							href="/schedule"
							className="text-sm font-medium transition-colors hover:text-primary"
						>
							Schedule
						</Link>
						<Link
							href="/standings"
							className="text-sm font-medium transition-colors hover:text-primary"
						>
							Standings
						</Link>
						<Link
							href="/stats"
							className="text-sm font-medium transition-colors hover:text-primary"
						>
							Stats
						</Link>
						<Link
							href="/video"
							className="text-sm font-medium transition-colors hover:text-primary"
						>
							Search
						</Link> */}
						<Button variant="outline" size="icon" className="h-10 w-10 md:hidden">
							<Search className="h-[1.2rem] w-[1.2rem]" />
						</Button>
						<ModeToggle />
						<UserDropdown />
					</nav>

					{/* Mobile Menu Button */}
					{/* <div className="md:hidden">
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleMenu}
							aria-label="Toggle Menu"
						>
							{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</Button>
					</div> */}
				</div>

				{/* Mobile Navigation */}
				{/* <AnimatePresence>
					{isMenuOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2 }}
							className="md:hidden border-t"
						>
							<div className="container py-4 flex flex-col gap-4">
								<Link
									href="/standings"
									className={cn(
										'flex items-center py-2 text-sm font-medium transition-colors hover:text-primary'
									)}
									onClick={() => setIsMenuOpen(false)}
								>
									Standings
								</Link>
								<Link
									href="/video"
									className={cn(
										'flex items-center py-2 text-sm font-medium transition-colors hover:text-primary'
									)}
									onClick={() => setIsMenuOpen(false)}
								>
									Search
								</Link>
								<Link
									href="https://www.mlb.com/"
									className="flex items-center py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
									target="_blank"
									rel="noopener noreferrer"
									onClick={() => setIsMenuOpen(false)}
								>
									MLB.com
								</Link>
								<div className="flex items-center justify-between py-2">
									<span className="text-sm font-medium">Toggle theme</span>
									<ModeToggle />
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence> */}
			</header>
			<GameCarousel dates={dates} />
			<SiteNavigation />
		</>
	);
}
