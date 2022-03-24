import { motion } from 'framer-motion';
import ModalButton from '../modal-button/modal-button';
import ModalText from '../modal-text/modal-text';
import { TypeProps } from './type-props';

const newspaper = {
  hidden: {
    transform: 'scale(0) rotate(720deg)',
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: ' scale(1) rotate(0deg)',
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: 'scale(0) rotate(-720deg)',
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const NewspaperModal = ({
  handleClose,
  text,
  title,
  className,
  children,
}: TypeProps) => (
  <motion.div
    onClick={(e) => e.stopPropagation()}
    className={className}
    variants={newspaper}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {children ? (
      children
    ) : (
      <>
        <ModalText text={text ?? ''} title={title ?? ''} />
        <ModalButton onClick={handleClose} label="Close" />
      </>
    )}
  </motion.div>
);

export default NewspaperModal;
