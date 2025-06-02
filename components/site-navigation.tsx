'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const links = [
	{ href: '/', label: 'Home' },
	{ href: '/players', label: 'Players' },
	{ href: '/teams', label: 'Teams' },
	{ href: '/videos', label: 'Videos' },
];

const NavLink = ({
	href,
	label,
	activePath,
}: {
	href: string;
	label: string;
	activePath: string;
}) => {
	return (
		<Link
			href={href}
			className={cn(
				'text-sm font-medium text-white transition-colors hover:bg-primary/10 rounded-md px-2 py-1',
				activePath === href && 'bg-primary/10'
			)}
		>
			{label}
		</Link>
	);
};

export function SiteNavigation({ className }: { className?: string }) {
	const activePath = usePathname();

	return (
		<nav className={cn('bg-red-500 py-4 ', className)} aria-label="Main navigation">
			<ul className="container mx-auto px-4 flex items-center gap-4">
				{links.map((link) => (
					<li key={link.href}>
						<NavLink {...link} activePath={activePath} />
					</li>
				))}
			</ul>
		</nav>
	);
}
