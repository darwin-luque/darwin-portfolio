import { motion } from 'framer-motion';
import ModalButton from '../modal-button/modal-button';
import ModalText from '../modal-text/modal-text';
import { TypeProps } from './type-props';

const flip = {
  hidden: {
    transform: 'scale(0) rotateX(-360deg)',
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: ' scale(1) rotateX(0deg)',
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: 'scale(0) rotateX(360deg)',
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const FlipModal = ({
  title,
  text,
  handleClose,
  className,
  children,
}: TypeProps) => (
  <motion.div
    onClick={(e) => e.stopPropagation()}
    className={className}
    variants={flip}
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

export default FlipModal;
