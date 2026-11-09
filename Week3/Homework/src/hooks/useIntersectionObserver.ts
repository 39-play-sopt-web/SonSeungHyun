import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (callback: () => void, rootMargin = '0px') => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) callback();
      },
      { rootMargin }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [callback, rootMargin]);

  return ref;
};