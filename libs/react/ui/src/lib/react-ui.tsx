import styles from './react-ui.module.css';

export * from './carousel/carousel';

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
