import { Modal } from '@darwin-portfolio/react/ui';
import { useCycle } from 'framer-motion';
import ChoosePlaylist from './choose-playlist/choose-playlist';
import classes from './export-modal.module.css';
import InitialOptions from './initial-options/initial-options';

interface ExportModalProps {
  show: boolean;
  onClose: () => void;
}

const ExportModal = ({ show, onClose }: ExportModalProps) => {
  const [step, toggleStep] = useCycle(0, 1, 2);

  const closeHandler = () => {
    toggleStep(0);
    onClose();
  };

  return (
    <Modal onClose={closeHandler} show={show}>
      <div className={classes['modal']}>
        <InitialOptions
          onChoose={(option: 'create' | 'add') =>
            toggleStep(option === 'add' ? 1 : 2)
          }
          show={step === 0}
        />
        <ChoosePlaylist onBackward={() => toggleStep(0)} show={step === 1} />
      </div>
    </Modal>
  );
};

export default ExportModal;
