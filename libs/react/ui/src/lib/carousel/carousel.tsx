import { AnimatePresence, motion } from 'framer-motion';
import { memo, useState } from 'react';
import classes from './carousel.module.css';
import Item from './item/item';
import LoadingBox from './loading-box/loading-box';

export * from './loading-box/loading-box';

interface CarouselProps<T> {
  data: T[];
  loading?: boolean;
  perPage: number;
  itemMinWidth?: number;
  ElementTemplate: (props: T) => JSX.Element;
}

export const Carousel = <T extends { id: number | string }>({
  data,
  loading,
  perPage,
  itemMinWidth,
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
    <div className={classes['container']} data-testid="carousel">
      {loading ? (
        Array(itemsPerPage)
          .fill(null)
          .map((val, i) => <LoadingBox key={i} width={itemMinWidth} />)
      ) : (
        <AnimatePresence initial={false} custom={direction}>
          <motion.div className={classes['items']}>
            {[...data].splice(page, itemsPerPage).map((val) => (
              <Item direction={direction} key={val.id} minWidth={itemMinWidth}>
                <ElementTemplate {...val} />
              </Item>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
      <button
        data-testid="next-button"
        type="button"
        className={classes['next']}
        onClick={() => paginate(1)}
      >
        ‣
      </button>
      <button
        data-testid="prev-button"
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
