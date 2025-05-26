'use client';

import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
			<div className="container w-full mx-auto flex h-16 items-center justify-between gap-6">
				<div className="flex items-center gap-2">
					<Link href="/" className="flex items-center gap-2">
						<motion.div
							initial={{ rotate: 0 }}
							animate={{ rotate: 360 }}
							transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
							className="rounded-full bg-primary p-1.5"
						>
							<Search className="h-5 w-5 text-primary-foreground" />
						</motion.div>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-6">
					<Link
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
					</Link>
					<ModeToggle />
				</nav>

				{/* Mobile Menu Button */}
				<div className="md:hidden">
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleMenu}
						aria-label="Toggle Menu"
					>
						{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					</Button>
				</div>
			</div>

			{/* Mobile Navigation */}
			<AnimatePresence>
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
			</AnimatePresence>
		</header>
	);
}
