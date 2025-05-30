'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/components/search-provider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface SearchBarProps {
	className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
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
		<form onSubmit={handleSubmit} className={cn('relative', className)}>
			<div
				className={cn(
					'flex items-center transition-all duration-300 border-2 rounded-lg overflow-hidden relative',
					hasFocus ? 'ring-2 ring-primary' : 'ring-0'
				)}
			>
				<label htmlFor="search">
					<VisuallyHidden>Search</VisuallyHidden>
					<Search className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
				</label>
				<Input
					type="text"
					id="search"
					name="search"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onFocus={() => setHasFocus(true)}
					onBlur={() => setHasFocus(false)}
					className="flex-1 border-0 focus-visible:ring-0 text-base pl-8"
				/>
				<VisuallyHidden>
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
				</VisuallyHidden>
			</div>
		</form>
	);
}
