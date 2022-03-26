import { SizeProps } from '../loader';
import classes from './spinning-dots.module.css';

const SpinningDots = ({ size }: SizeProps) => (
  <div style={{ width: size, height: size }} className={classes["roller"]}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default SpinningDots;
