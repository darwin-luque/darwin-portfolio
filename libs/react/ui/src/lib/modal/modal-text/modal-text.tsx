import classes from './modal-text.module.css';

interface ModalTextProps {
  title: string;
  text: string;
}

const ModalText = ({ title, text }: ModalTextProps) => (
  <div className={classes['modal-text']}>
    <h1 className={classes['title']}>{title}</h1>
    <p className={classes['text']}>{text}</p>
  </div>
);

export default ModalText;
