'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/components/search-provider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SearchBarProps {
	className?: string;
	placeholder?: string;
}

export function SearchBar({
	className,
	placeholder = 'Search for players, teams, or plays...',
}: SearchBarProps) {
	const router = useRouter();
	const { searchTerm, setSearchTerm, isSearching, setIsSearching } = useSearch();
	const [inputValue, setInputValue] = useState(searchTerm);
	const [hasFocus, setHasFocus] = useState(false);

	useEffect(() => {
		setInputValue(searchTerm);
	}, [searchTerm]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (inputValue.trim()) {
			setIsSearching(true);
			setSearchTerm(inputValue.trim());
			setIsSearching(false);

			// Reset URL if we're on a video page
			if (window.location.pathname.includes('/video/')) {
				router.push('/');
			}
		}
	};

	return (
		<motion.form
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			onSubmit={handleSubmit}
			className={cn('relative', className)}
		>
			<div
				className={cn(
					'flex items-center transition-all duration-300 border rounded-lg overflow-hidden',
					hasFocus ? 'ring-2 ring-primary' : 'ring-0'
				)}
			>
				<Input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onFocus={() => setHasFocus(true)}
					onBlur={() => setHasFocus(false)}
					placeholder={placeholder}
					className="flex-1 border-0 focus-visible:ring-0 text-base"
				/>
				<Button
					type="submit"
					disabled={isSearching || !inputValue.trim()}
					className="rounded-l-none"
				>
					{isSearching ? (
						<Loader2 className="h-4 w-4 mr-2 animate-spin" />
					) : (
						<Search className="h-4 w-4 mr-2" />
					)}
					Search
				</Button>
			</div>
		</motion.form>
	);
}
