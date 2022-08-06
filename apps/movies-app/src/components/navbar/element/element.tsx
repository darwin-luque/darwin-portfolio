import { Component } from 'solid-js';
import { Link } from 'solid-app-router';
import classes from './element.module.css';

export interface ElementProps {
  path: string;
  name: string;
}

const Element: Component<ElementProps> = (props) => {
  return (
    <li className={classes['element']}>
      <Link href={props.path}>{props.name}</Link>
    </li>
  );
};

export default Element;
