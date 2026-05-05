'use client';

import { useEffect, useRef, useState, cloneElement } from 'react';
import { playTriangleSVG, pauseBarsSVG } from '@/components/assets';
import { cn } from '@/lib/utils';
import { useObserver } from '@/hooks/use-observer';

type VideoCardProps = {
  src: string;
  title: string;
  /** Autoplay muted in background. Default: true */
  autoPlay?: boolean;
  className?: string;
};

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
    }
  }, [isVisible]);

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
  }

  return (
    <div
      ref={containerRef}
      className={cn('group absolute overflow-hidden rounded-lg aspect-3/5 shadow-2xl', className)}>
      <video
        ref={videoRef}
        src={src}
        className="h-full! w-full! object-cover"
        autoPlay={autoPlay}
        muted
        loop
        playsInline
        aria-label={title}
      />

      {/* Gradient overlay */}
      <div
        role="presentation"
        className="absolute inset-0 flex flex-col justify-end p-4"
        style={{
          background:
            'linear-gradient(180deg, rgba(34,34,34,0) 62.5%, rgba(34,34,34,0.015) 81.25%, rgba(34,34,34,0.5) 100%)',
          borderRadius: 'inherit',
        }}>

        {/* Play/Pause button — rests at top-right, slides to center on card hover */}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title} with sound`}
          aria-pressed={isPlaying}
          style={{
            // position + translate move smoothly, scale springs in after they settle
            transition: [
              'top 400ms cubic-bezier(0.4,0,0.2,1)',
              'right 400ms cubic-bezier(0.4,0,0.2,1)',
              'translate 400ms cubic-bezier(0.4,0,0.2,1)',
              'scale 480ms cubic-bezier(0.34,1.56,0.64,1) 220ms',
              'background-color 150ms ease',
              'filter 150ms ease',
            ].join(', '),
          }}
          className={cn(
            'absolute cursor-pointer will-change-transform',
            'flex items-center justify-center w-12 h-12 rounded-full bg-primary-500',
            // rest: top-right corner
            'top-1 right-1 translate-x-0 translate-y-0 scale-[0.8]',
            // group-hover: slide to center then spring-scale up
            'group-hover:top-1/2 group-hover:right-1/2',
            'group-hover:translate-x-1/2 group-hover:-translate-y-1/2 group-hover:scale-[1.6]',
            // direct hover: lighter fill
            'hover:bg-primary-400',
            // active: darken + slight press
            'active:bg-primary-600 active:brightness-90 active:scale-[0.92]',
            // focus-visible ring for keyboard users
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          )}>
          {isPlaying ? (
            cloneElement(pauseBarsSVG, { 'aria-hidden': 'true' })
          ) : (
            cloneElement(playTriangleSVG, { 'aria-hidden': 'true' })
          )}
        </button>

        <span
          className="font-manrope font-bold text-[22px] tracking-[-0.02em] text-white leading-snug"
          aria-hidden="true">
          {title}
        </span>
      </div>
    </div>
  );
}
