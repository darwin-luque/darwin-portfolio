import { motion } from 'framer-motion';
import classes from './modal-button.module.css';

interface ModalButtonProps {
  onClick: () => void;
  label: string;
}

const ModalButton = ({ onClick, label }: ModalButtonProps) => (
  <motion.button
    className={classes["modal-button"]}
    type="button"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {label}
  </motion.button>
);

export default ModalButton;
