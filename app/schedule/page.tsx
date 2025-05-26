'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GamesPage() {
	const [date, setDate] = useState<Date>(new Date());
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);

	const goToToday = () => {
		setDate(new Date());
		setIsCalendarOpen(false);
	};

	const goToPreviousDay = () => {
		const newDate = new Date(date);
		newDate.setDate(date.getDate() - 1);
		setDate(newDate);
	};

	const goToNextDay = () => {
		const newDate = new Date(date);
		newDate.setDate(date.getDate() + 1);
		setDate(newDate);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-4xl font-bold">MLB Games</h1>

				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="icon"
						onClick={goToPreviousDay}
						aria-label="Previous day"
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>

					<Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									'w-[240px] justify-start text-left font-normal',
									!date && 'text-muted-foreground'
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{format(date, 'MMMM d, yyyy')}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="end">
							<Calendar
								mode="single"
								selected={date}
								onSelect={(date) => {
									if (date) {
										setDate(date);
										setIsCalendarOpen(false);
									}
								}}
								initialFocus
							/>
						</PopoverContent>
					</Popover>

					<Button
						variant="outline"
						size="icon"
						onClick={goToNextDay}
						aria-label="Next day"
					>
						<ChevronRight className="h-4 w-4" />
					</Button>

					<Button variant="secondary" onClick={goToToday} className="ml-2">
						Today
					</Button>
				</div>
			</div>

			<div className="grid gap-4">
				<Card>
					<CardContent className="py-6">
						<p className="text-muted-foreground">
							Game schedule and scores will be available soon.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
