import { AnimatePresence, motion, Variants } from 'framer-motion';
import { memo, useState } from 'react';
import classes from './carousel.module.css';

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

interface CarouselProps<T> {
  perPage: number;
  data: T[];
  ElementTemplate: (props: T) => JSX.Element;
}

export const Carousel = <T extends { id: number | string }>({
  perPage,
  data,
  ElementTemplate,
}: CarouselProps<T>) => {
  const itemsPerPage = perPage > data.length ? data.length : perPage;
  const lastPage = data.length - itemsPerPage;

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const paginate = (newDirection: 1 | -1) => {
    let newPage = page + newDirection;
    if (page === lastPage && newDirection === 1) {
      newPage = 0;
    } else if (page === 0 && newDirection === -1) {
      newPage = lastPage;
    }
    setPage(newPage);
    setDirection(newDirection);
  };

  return (
    <div className={classes['container']}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div className={classes['items']}>
          {[...data].splice(page, itemsPerPage).map((val) => (
            <motion.div
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  duration: 0.8,
                },
                opacity: { duration: 0.8 },
              }}
              key={val.id}
              className={classes['item']}
            >
              <ElementTemplate {...val} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <button
        type="button"
        className={classes['next']}
        onClick={() => paginate(1)}
      >
        ‣
      </button>
      <button
        type="button"
        className={classes['prev']}
        onClick={() => paginate(-1)}
      >
        ‣
      </button>
    </div>
  );
};

export default memo(Carousel);
