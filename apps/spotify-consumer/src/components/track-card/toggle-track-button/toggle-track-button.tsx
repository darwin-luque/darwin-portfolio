import classes from './toggle-track-button.module.css';

interface ToggleTrackButtonProps {
  inLibrary: boolean;
  onToggleTrack: (state: 'add' | 'remove') => void;
}

const ToggleTrackButton = ({
  inLibrary,
  onToggleTrack,
}: ToggleTrackButtonProps) => (
  <div className={classes['container']}>
    <button
      data-testid="toggle-track-button"
      className={classes['button']}
      type="button"
      onClick={() => onToggleTrack(inLibrary ? 'remove' : 'add')}
    >
      {inLibrary ? '- Remove from the Library' : '+ Save to Library'}
    </button>
  </div>
);

export default ToggleTrackButton;
