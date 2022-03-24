import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import Backdrop from '../backdrop/backdrop';
import ModalType from './modal-type';
import classes from './modal.module.css';

export type Type = 'dropIn' | 'flip' | 'newspaper' | 'badSuspension';

interface ModalProps {
  onClose: () => void;
  children?: ReactNode;
  text?: string;
  title?: string;
  type?: Type;
  show: boolean;
}

export const Modal = ({
  onClose,
  text,
  show,
  title,
  children,
  type = 'dropIn',
}: ModalProps) => {
  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {show && (
        <Backdrop onClick={onClose}>
          <ModalType
            className={classes['modal']}
            handleClose={onClose}
            type={type}
            text={text}
            title={title}
          >
            {children}
          </ModalType>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};
export default Modal;
