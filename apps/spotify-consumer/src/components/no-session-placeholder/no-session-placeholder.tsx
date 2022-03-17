import coffeeMugIcon from '../../assets/icons/svg/coffee-mug.svg';
import classes from './no-session-placeholder.module.css';

interface NoSessionPlaceholderProps {
  hasSpotifySession?: boolean;
  hasFirebaseSession?: boolean;
}

const NoSessionPlaceholder = ({
  hasSpotifySession,
  hasFirebaseSession,
}: NoSessionPlaceholderProps) => (
  <div className={classes['container']}>
    <span>
      <img src={coffeeMugIcon} alt="Coffee Mug" className={classes['icon']} />
      {!hasSpotifySession && (
        <p className={classes['text']}>Sign in with Spotify first, please!</p>
      )}
      {hasSpotifySession && !hasFirebaseSession && (
        <p className={classes['text']}>
          Sorry for the hassle, please confirm the email we've sent
        </p>
      )}
    </span>
  </div>
);

export default NoSessionPlaceholder;
