'use client';

import {
  useEffect,
  useRef,
  useState,
  cloneElement,
  startTransition,
} from 'react';
import { playTriangleSVG, pauseBarsSVG } from '@/components/assets';
import { cn } from '@/lib/utils';
import { useObserver } from '@/hooks/use-observer';

export interface VideoCardProps {
  src: string;
  title: string;
  autoPlay?: boolean;
  className?: string;
  playingClassName?: string;
  buttonClassName?: string;
  poster?: string;
  onPlayClick?: () => void;
}

export const VideoCard = ({
  src,
  title,
  autoPlay = true,
  className,
  playingClassName,
  buttonClassName,
  poster,
  onPlayClick,
}: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPlaybackRef = useRef(false);
  const [isUserPlaying, setIsUserPlaying] = useState(false);
  const [backgroundAutoplayEnabled, setBackgroundAutoplayEnabled] =
    useState(autoPlay);

  const { ref: containerRef, isVisible } = useObserver<HTMLDivElement>({
    threshold: 0.2,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => {
      if (userPlaybackRef.current) {
        setIsUserPlaying(true);
      }
    };
    const onPause = () => {
      if (userPlaybackRef.current) {
        setIsUserPlaying(false);
      }
    };
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  useEffect(() => {
    startTransition(() => setBackgroundAutoplayEnabled(autoPlay));
  }, [autoPlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isVisible) {
      video.pause();
      if (userPlaybackRef.current) {
        userPlaybackRef.current = false;
        setIsUserPlaying(false);
      }
      return;
    }

    if (!backgroundAutoplayEnabled) return;

    video.muted = true;
    video.loop = true;
    const playPromise = video.play();

    if (playPromise) {
      playPromise.catch(() => {
        setIsUserPlaying(false);
      });
    }
  }, [backgroundAutoplayEnabled, isVisible]);

  const handleToggle = () => {
    if (onPlayClick) {
      onPlayClick();
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    setBackgroundAutoplayEnabled(false);

    if (isUserPlaying) {
      userPlaybackRef.current = false;
      video.pause();
      setIsUserPlaying(false);
    } else {
      userPlaybackRef.current = true;
      video.currentTime = 0;
      video.muted = false;
      video.loop = false;
      const playPromise = video.play();
      setIsUserPlaying(true);

      if (playPromise) {
        playPromise.catch(() => {
          userPlaybackRef.current = false;
          setIsUserPlaying(false);
        });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      data-playing={isUserPlaying ? 'true' : 'false'}
      className={cn(
        'video-wrapper group absolute aspect-3/5 gpu-layer overflow-hidden rounded-lg shadow-2xl',
        className,
        isUserPlaying && playingClassName,
      )}
    >
      <video
        ref={videoRef}
        src={src}
        className="h-full! w-full! gpu-layer object-cover"
        autoPlay={backgroundAutoplayEnabled && isVisible}
        preload="metadata"
        poster={poster}
        muted
        loop
        playsInline
        aria-label={title}
      />

      <div
        role="presentation"
        className="absolute inset-0 flex flex-col justify-end rounded-[inherit] p-4 video-card-gradient"
      >
        <button
          type="button"
          onClick={handleToggle}
          aria-label={title}
          aria-pressed={isUserPlaying}
          className={cn(
            'absolute gpu-layer cursor-pointer video-toggle-motion',
            'flex h-12 w-12 items-center justify-center rounded-full bg-primary-500',
            'top-1 right-1 translate-x-0 translate-y-0 scale-[0.8]',
            'group-hover:top-1/2 group-hover:right-1/2',
            'group-hover:translate-x-1/2 group-hover:-translate-y-1/2 group-hover:scale-[1.6]',
            'hover:bg-primary-400',
            'active:scale-[0.92] active:bg-primary-600 active:brightness-90',
            'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none',
            buttonClassName,
          )}
        >
          {isUserPlaying
            ? cloneElement(pauseBarsSVG, { 'aria-hidden': 'true' })
            : cloneElement(playTriangleSVG, { 'aria-hidden': 'true' })}
        </button>

        <span
          className="font-manrope text-[22px] leading-snug font-bold tracking-[-0.02em] text-neutral-0"
          aria-hidden="true"
        >
          {title}
        </span>
      </div>
    </div>
  );
};
