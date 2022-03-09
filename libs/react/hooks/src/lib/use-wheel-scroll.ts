import { RefObject } from 'react';
import { useDomEvent, MotionValue } from 'framer-motion';
import { animate } from 'popmotion';
import { mix } from '@popmotion/popcorn';
import { debounce } from 'lodash';

interface Constraints {
  top: number;
  bottom: number;
}

const deltaThreshold = 5;
const elasticFactor = 0.2;

const springTo = (value: MotionValue, from: number, to: number) => {
  if (value.isAnimating()) return;

  value.start((onComplete) => {
    const animation = animate({
      from,
      to,
      velocity: value.getVelocity(),
      stiffness: 400,
      damping: 40,
      onUpdate: (v: number) => value.set(v),
      onComplete,
    });

    return () => animation.stop();
  });
};

const debouncedSpringTo = debounce(springTo, 100);

export const useWheelScroll = (
  ref: RefObject<Element>,
  y: MotionValue<number>,
  constraints: Constraints | null,
  onWheelCallback: (e: WheelEvent) => void,
  isActive: boolean,
  threshold = 50
) => {
  const onWheel = (event: WheelEvent) => {
    event.preventDefault();

    const currentY = y.get();
    const diffY = currentY - event.deltaY;
    let newY = 0;
    if (diffY > 0) {
      newY = Math.min(diffY, threshold);
    } else {
      newY = Math.max(diffY, -threshold);
    }
    let startedAnimation = false;
    const isWithinBounds =
      constraints && newY >= constraints.top && newY <= constraints.bottom;

    if (constraints && !isWithinBounds) {
      newY = mix(currentY, newY, elasticFactor);

      if (newY < constraints.top) {
        if (event.deltaY <= deltaThreshold) {
          springTo(y, newY, constraints.top);
          startedAnimation = true;
        } else {
          debouncedSpringTo(y, newY, constraints.top);
        }
      }

      if (newY > constraints.bottom) {
        if (event.deltaY >= -deltaThreshold) {
          springTo(y, newY, constraints.bottom);
          startedAnimation = true;
        } else {
          debouncedSpringTo(y, newY, constraints.bottom);
        }
      }
    }

    if (!startedAnimation) {
      y.stop();
      y.set(newY);
    } else {
      debouncedSpringTo.cancel();
    }

    onWheelCallback(event);
  };

  useDomEvent(ref, 'wheel', isActive ? onWheel as EventListener : undefined, { passive: false });
};
