'use client';

import { createContext, useContext, useState } from 'react';

interface SearchContextType {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	page: number;
	setPage: (page: number) => void;
	isSearching: boolean;
	setIsSearching: (isSearching: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [page, setPage] = useState<number>(0);
	const [isSearching, setIsSearching] = useState<boolean>(false);

	const handleSetSearchTerm = (term: string) => {
		setSearchTerm(term);
		setPage(0);
	};

	return (
		<SearchContext.Provider
			value={{
				searchTerm,
				setSearchTerm: handleSetSearchTerm,
				page,
				setPage,
				isSearching,
				setIsSearching,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
}

export function useSearch() {
	const context = useContext(SearchContext);
	if (context === undefined) {
		throw new Error('useSearch must be used within a SearchProvider');
	}
	return context;
}
