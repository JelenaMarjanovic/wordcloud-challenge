import { useEffect, useRef, useState } from 'react';

type ContainerSizeHook<T extends HTMLElement> = {
  containerRef: React.RefObject<T | null>;
  width: number;
  height: number;
};

export const useContainerSize = <
  T extends HTMLElement
>(): ContainerSizeHook<T> => {
  const containerRef = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const currentEl = containerRef.current;

    if (!currentEl) {
      return;
    }

    const resizeObs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        setSize({ width, height });
      }
    });

    resizeObs.observe(currentEl);

    return () => resizeObs.disconnect();
  }, []);

  return { containerRef, ...size };
};
