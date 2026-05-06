import { useEffect, useState } from 'react';

export function useMedia(query: string, defaultMatches = false): boolean {
  const [matches, setMatches] = useState(defaultMatches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    listener(); // check initially
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
