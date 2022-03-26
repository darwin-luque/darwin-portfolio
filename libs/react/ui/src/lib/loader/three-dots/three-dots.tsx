import { SizeProps } from '../loader';
import classes from './three-dots.module.css';

const ThreeDots = ({ size }: SizeProps) => (
  <div style={{ width: size, height: size }} className={classes['ellipsis']}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default ThreeDots;
