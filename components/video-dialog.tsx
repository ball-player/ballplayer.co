import React, { useCallback } from 'react';
import { Send } from 'lucide-react';
import { MediaPlaybackFieldsFragment } from '@/gql/generated';

import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { VisuallyHidden } from './ui/visually-hidden';

import { VideoPlayer } from './video-player';

import { useWebShare } from '@/hooks/use-web-share';

interface VideoDialogProps {
	mediaPlayback: MediaPlaybackFieldsFragment;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function VideoDialog({
	mediaPlayback,
	open,
	onOpenChange,
}: VideoDialogProps) {
	const { title, slug, description } = mediaPlayback ?? {};
	const { share } = useWebShare();

	const handleShare = useCallback(() => {
		if (slug && title) {
			share(`/video/${slug}`, title, description ?? '');
		}
	}, [share, title, slug, description]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<VisuallyHidden>
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description ?? ''}</DialogDescription>
			</VisuallyHidden>
			<DialogContent className="max-w-4xl w-full p-0 bg-black">
				<div className="relative">
					<Button
						variant="ghost"
						size="icon"
						onClick={handleShare}
						className="text-white hover:bg-white/20 h-8 w-8 absolute top-4 left-4 z-10"
					>
						<Send className="h-4 w-4" />
					</Button>
					<VideoPlayer mediaPlayback={mediaPlayback} />
				</div>
			</DialogContent>
		</Dialog>
	);
}
