import Link from 'next/link';

export function SiteNavigation() {
	return (
		<nav className="bg-red-500 py-4">
			<div className="container mx-auto flex items-center gap-4">
				<Link
					href="/"
					className="text-sm font-medium text-white transition-colors hover:bg-primary/10 rounded-md px-2 py-1"
				>
					Home
				</Link>
				<Link
					href="/players"
					className="text-sm font-medium text-white transition-colors hover:bg-primary/10 rounded-md px-2 py-1"
				>
					Players
				</Link>
				<Link
					href="/teams"
					className="text-sm font-medium text-white transition-colors hover:bg-primary/10 rounded-md px-2 py-1"
				>
					Teams
				</Link>
				<Link
					href="/videos"
					className="text-sm font-medium text-white transition-colors hover:bg-primary/10 rounded-md px-2 py-1"
				>
					Videos
				</Link>
			</div>
		</nav>
	);
}
