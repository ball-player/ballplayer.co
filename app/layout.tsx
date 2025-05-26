import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { SearchProvider } from '@/components/search-provider';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { ReactQueryProvider } from '@/components/react-query-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'MLB Video Search',
	description: 'Search and discover MLB highlights and videos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
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
