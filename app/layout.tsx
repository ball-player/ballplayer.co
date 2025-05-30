import './globals.css';
import type { Metadata } from 'next';
import LocalFont from 'next/font/local';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { SearchProvider } from '@/components/search-provider';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { ReactQueryProvider } from '@/components/react-query-provider';
import { cn } from '@/lib/utils';

const dancingScript = LocalFont({
	src: '../public/fonts/DancingScript-Variable.woff2',
	variable: '--font-heading',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Ballplayer',
	description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn(inter.className, dancingScript.variable)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<ReactQueryProvider>
						<SearchProvider>
							<div className="flex min-h-screen flex-col">
								<Header />
								<main className="flex-1">{children}</main>
								<Toaster />
							</div>
						</SearchProvider>
					</ReactQueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
