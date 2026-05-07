import { startColorfullSVG } from '@/components/assets';
import { cn } from '@/lib/utils';

export interface StarRatingProps {
  rating: number;
  maxStars?: number;
  className?: string;
  starSize?: string;
  inactiveOpacity?: number;
}

export const StarRating = ({
  rating,
  maxStars = 5,
  className = '',
  starSize = '14px',
  inactiveOpacity = 0,
}: StarRatingProps) => {
  const stars = Array(maxStars).fill(0);

  const getStarOpacity = (index: number): number => {
    const starPosition = index + 1;
    if (starPosition <= Math.floor(rating)) {
      return 1; // Full star
    }
    if (starPosition === Math.ceil(rating) && rating % 1 !== 0) {
      return 0.5 + (rating % 1) * 0.5; // Partial star (50-100% opacity)
    }
    return inactiveOpacity; // Empty star
  };

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {stars.map((_, index) => (
        <span
          key={index}
          className="icon"
          style={{
            fontSize: starSize,
            opacity: getStarOpacity(index),
          }}>
          {startColorfullSVG}
        </span>
      ))}
    </div>
  );
};
