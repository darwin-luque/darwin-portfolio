import { Modal } from '@darwin-portfolio/react/ui';
import { useCycle } from 'framer-motion';
import classes from './export-modal.module.css';
import InitialOptions from './initial-options/initial-options';

interface ExportModalProps {
  show: boolean;
  onClose: () => void;
}

const ExportModal = ({ show, onClose }: ExportModalProps) => {
  const [step, toggleStep] = useCycle(0, 1, 2);
  const chooseInitialOption = (option: 'create' | 'add') => {
    toggleStep(option === 'create' ? 1 : 2);
  };
  return (
  <Modal onClose={onClose} show={show}>
    <div className={classes['modal']}>
      <InitialOptions onChoose={chooseInitialOption} show={step === 0} />
    </div>
  </Modal>
);
};

export default ExportModal