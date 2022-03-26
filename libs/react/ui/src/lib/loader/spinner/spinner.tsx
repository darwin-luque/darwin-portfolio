import { SizeProps } from '../loader';
import classes from './spinner.module.css';

const Spinner = ({ size }: SizeProps) => (
  <div style={{ width: size, height: size }} className={classes['spinner']}>
    <div />
    <div />
    <div />
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

export default Spinner;
