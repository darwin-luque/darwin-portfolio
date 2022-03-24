import { motion } from 'framer-motion';
import ModalButton from '../modal-button/modal-button';
import ModalText from '../modal-text/modal-text';
import { TypeProps } from './type-props';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

const DropInModal = ({
  handleClose,
  text,
  title,
  className,
  children,
}: TypeProps) => (
  <motion.div
    onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
    className={className}
    variants={dropIn}
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

export default DropInModal;
