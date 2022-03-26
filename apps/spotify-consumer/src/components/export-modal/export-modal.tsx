import { Modal } from '@darwin-portfolio/react/ui';
import { useCycle } from 'framer-motion';
import { Tokens, Track, User } from '../../types';
import ChoosePlaylist from './choose-playlist/choose-playlist';
import CreatePlaylist from './create-playlist/create-playlist';
import classes from './export-modal.module.css';
import InitialOptions from './initial-options/initial-options';

interface ExportModalProps {
  show: boolean;
  tracks: Track[];
  tokens: Tokens;
  user?: User;
  onClose: () => void;
}

const ExportModal = ({
  show,
  tracks,
  onClose,
  tokens,
  user,
}: ExportModalProps) => {
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
            toggleStep(option === 'create' ? 1 : 2)
          }
          show={step === 0}
        />
        <CreatePlaylist
          tokens={tokens}
          user={user}
          show={step === 1}
          onBackward={() => toggleStep(0)}
          onCreateFinish={closeHandler}
          tracks={tracks}
        />
        <ChoosePlaylist
          onFallback={() => toggleStep(1)}
          onBackward={() => toggleStep(0)}
          show={step === 2}
        />
      </div>
    </Modal>
  );
};

export default ExportModal;
