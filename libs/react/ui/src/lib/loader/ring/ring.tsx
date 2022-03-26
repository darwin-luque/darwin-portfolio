import { SizeProps } from '../loader';
import classes from './ring.module.css';

const Ring = ({ size }: SizeProps) => (
  <div style={{ width: size, height: size }} className={classes['ring']}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Ring;
