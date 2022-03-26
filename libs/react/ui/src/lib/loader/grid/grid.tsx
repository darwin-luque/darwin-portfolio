import { SizeProps } from '../loader';
import classes from './grid.module.css';

const Grid = ({ size }: SizeProps) => (
  <div style={{ width: size, height: size }} className={classes['grid']}>
    <div />
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

export default Grid;
