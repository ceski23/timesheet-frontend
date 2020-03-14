import { useState, useEffect, useRef } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

function getScrollPosition(elem?: HTMLElement): ScrollPosition {
  return { x: elem?.scrollLeft || 0, y: elem?.scrollTop || 0 };
}

export function useParentScroll() {
  const ref = useRef<HTMLElement>();
  const [position, setScrollPosition] = useState<ScrollPosition>(
    getScrollPosition(ref.current?.parentElement || undefined),
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    let requestRunning: number | null = null;
    function handleScroll() {
      if (requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          setScrollPosition(getScrollPosition(ref.current?.parentElement || undefined));
          requestRunning = null;
        });
      }
    }

    if (ref.current?.parentElement) {
      ref.current.parentElement.addEventListener('scroll', handleScroll);
      return () => {
        if (ref.current?.parentElement) ref.current.parentElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return { ref, position };
}
