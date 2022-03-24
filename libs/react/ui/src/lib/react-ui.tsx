import styles from './react-ui.module.css';

// COMPONENTS
export * from './carousel/carousel';
export * from './card/card';
export * from './drawer/drawer';
export * from './menu-toggle/menu-toggle';
export * from './modal/modal';
// ICONS
export * from './assets/icons/animated-burger-x.icon';

/* eslint-disable-next-line */
export interface ReactUiProps {}

function ReactUi(props: ReactUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactUi!</h1>
    </div>
  );
}

export default ReactUi;
