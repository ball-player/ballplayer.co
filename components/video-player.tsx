'use client';

// import { useState } from 'react';
import ReactPlayer from 'react-player';
import { MediaPlaybackFieldsFragment } from '@/gql/generated';

interface VideoPlayerProps {
	mediaPlayback: MediaPlaybackFieldsFragment;
	playing?: boolean;
}

export function VideoPlayer({ mediaPlayback, playing = true }: VideoPlayerProps) {
	// const [isPlaying, setIsPlaying] = useState(true);
	// const [isMuted, setIsMuted] = useState(false);
	// const [isFullscreen, setIsFullscreen] = useState(false);
	// const [controlsVisible, setControlsVisible] = useState(false);
	const { feeds } = mediaPlayback ?? {};
	const [feed] = feeds ?? [];
	const { playbacks } = feed ?? {};

	const videoUrl = playbacks?.find((p) => p?.name === 'mp4Avc')?.url;

	// const togglePlay = () => {
	// 	setIsPlaying(!isPlaying);
	// };

	// const toggleMute = () => {
	// 	setIsMuted(!isMuted);
	// };

	// const toggleFullscreen = () => {
	// 	const playerElement = document.getElementById('video-player-container');

	// 	if (!document.fullscreenElement) {
	// 		playerElement?.requestFullscreen().catch((err) => {
	// 			console.error(`Error attempting to enable fullscreen: ${err.message}`);
	// 		});
	// 		setIsFullscreen(true);
	// 	} else {
	// 		document.exitFullscreen();
	// 		setIsFullscreen(false);
	// 	}
	// };

	// const showControls = () => {
	// 	setControlsVisible(true);
	// };

	// const hideControls = () => {
	// 	setControlsVisible(false);
	// };

	if (!videoUrl) {
		return (
			<div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
				<p className="text-muted-foreground">Video not available</p>
			</div>
		);
	}

	return (
		<div
			id="video-player-container"
			className="relative aspect-video bg-black rounded-lg overflow-hidden"
			// onMouseEnter={showControls}
			// onMouseLeave={hideControls}
		>
			<ReactPlayer
				url={videoUrl}
				width="100%"
				height="100%"
				playing={playing}
				// muted={isMuted}
				controls
				config={{
					file: {
						attributes: {
							crossOrigin: 'anonymous',
						},
					},
				}}
			/>
			{/* 
      <AnimatePresence>
        {controlsVisible && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"
          >
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center pointer-events-auto">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={togglePlay}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                {isPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
                    <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4.75L17.25 12L6 19.25V4.75Z" fill="currentColor" />
                  </svg>
                )}
              </Button>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
		</div>
	);
}
