import { SizeProps } from '../loader';
import classes from './radar.module.css';

const Radar = ({ size }: SizeProps) => (
  <div style={{ width: size, height: size }} className={classes['ripple']}>
    <div />
    <div />
  </div>
);

export default Radar;
