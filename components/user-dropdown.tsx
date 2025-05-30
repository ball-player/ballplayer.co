'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';

export function UserDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" className="h-10 w-10">
					<User className="h-[1.2rem] w-[1.2rem]" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
