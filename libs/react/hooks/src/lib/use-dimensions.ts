import { RefObject, useLayoutEffect, useState } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
export const useDimensions = (ref: RefObject<HTMLElement>): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const handleResize = () =>
      setDimensions({
        width: ref.current?.offsetWidth ?? 0,
        height: ref.current?.offsetHeight ?? 0,
      });

    ref.current?.addEventListener('resize', handleResize);

    handleResize();

    return () => ref.current?.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};
