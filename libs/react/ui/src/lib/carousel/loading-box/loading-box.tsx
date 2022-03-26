import classes from './loading-box.module.css';

export interface LoadingBoxProps {
  width?: number | string;
  height?: number | string;
}

const LoadingBox = ({ width, height }: LoadingBoxProps) => (
  <div style={{ width, height }} className={classes['animated-background']} />
);

export default LoadingBox;
