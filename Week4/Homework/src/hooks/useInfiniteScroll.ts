import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (onIntersect: () => void, enabled: boolean) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onIntersect();
      },
      { rootMargin: '200px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [onIntersect, enabled]);

  return targetRef;
};