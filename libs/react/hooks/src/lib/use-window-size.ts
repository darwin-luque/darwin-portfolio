import { useLayoutEffect, useState } from 'react';


interface Sizes {
  width?: number;
  height?: number;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Sizes>({
    width: undefined,
    height: undefined,
  });

  useLayoutEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};
