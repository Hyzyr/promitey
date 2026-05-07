'use client';

import { useEffect, useRef, useState, cloneElement } from 'react';
import { playTriangleSVG, pauseBarsSVG } from '@/components/assets';
import { cn } from '@/lib/utils';
import { useObserver } from '@/hooks/use-observer';

export interface VideoCardProps {
  src: string;
  title: string;
  /** Autoplay muted in background. Default: true */
  autoPlay?: boolean;
  className?: string;
}

export const VideoCard = ({ src, title, autoPlay = true, className }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { ref: containerRef, isVisible } = useObserver<HTMLDivElement>({ threshold: 0.2 });

  // Track isPlaying via native video events (external system → state)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  // Pause when scrolled out of view — only interacts with the external system
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isVisible) {
      video.pause();
      video.removeAttribute('src');
      video.load();
      return;
    }

    if (!autoPlay) return;

    video.src = src;
    video.muted = true;
    const playPromise = video.play();

    if (playPromise) {
      playPromise.catch(() => {
        setIsPlaying(false);
      });
    }
  }, [autoPlay, isVisible, src]);

  const handleToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.currentTime = 0;
      video.muted = false;
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'video-wrapper gpu-layer group absolute aspect-3/5 overflow-hidden rounded-lg shadow-2xl',
        className,
      )}>
      <video
        ref={videoRef}
        src={isVisible ? src : undefined}
        className="gpu-layer h-full! w-full! object-cover"
        autoPlay={autoPlay && isVisible}
        preload={isVisible ? 'metadata' : 'none'}
        muted
        loop
        playsInline
        aria-label={title}
      />

      {/* Gradient overlay */}
      <div
        role="presentation"
        className="video-card-gradient absolute inset-0 flex flex-col justify-end rounded-[inherit] p-4">

        {/* Play/Pause button — rests at top-right, slides to center on card hover */}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={title}
          aria-pressed={isPlaying}
          className={cn(
            'video-toggle-motion gpu-layer absolute cursor-pointer',
            'flex items-center justify-center w-12 h-12 rounded-full bg-primary-500',
            'top-1 right-1 translate-x-0 translate-y-0 scale-[0.8]',
            'group-hover:top-1/2 group-hover:right-1/2',
            'group-hover:translate-x-1/2 group-hover:-translate-y-1/2 group-hover:scale-[1.6]',
            'hover:bg-primary-400',
            'active:bg-primary-600 active:brightness-90 active:scale-[0.92]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          )}>
          {isPlaying ? (
            cloneElement(pauseBarsSVG, { 'aria-hidden': 'true' })
          ) : (
            cloneElement(playTriangleSVG, { 'aria-hidden': 'true' })
          )}
        </button>

        <span
          className="font-manrope text-[22px] leading-snug font-bold tracking-[-0.02em] text-neutral-0"
          aria-hidden="true">
          {title}
        </span>
      </div>
    </div>
  );
};
