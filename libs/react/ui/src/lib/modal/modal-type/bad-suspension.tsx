import { motion } from 'framer-motion';
import ModalButton from '../modal-button/modal-button';
import ModalText from '../modal-text/modal-text';
import { TypeProps } from './type-props';

const badSuspension = {
  hidden: {
    y: '-100vh',
    opacity: 0,
    transform: 'scale(0) rotateX(-360deg)',
  },
  visible: {
    y: '-25vh',
    opacity: 1,
    transition: {
      duration: 0.2,
      type: 'spring',
      damping: 15,
      stiffness: 500,
    },
  },
  exit: {
    y: '-100vh',
    opacity: 0,
  },
};

const BadSuspensionModal = ({
  handleClose,
  text,
  title,
  className,
  children,
}: TypeProps) => (
  <motion.div
    onClick={(e) => e.stopPropagation()}
    className={className}
    variants={badSuspension}
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

export default BadSuspensionModal;
