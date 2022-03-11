import { motion } from 'framer-motion';
import { Tokens, User } from '../../../types';
import classes from './profile-section.module.css';

interface ProfileSectionProps {
  user?: User;
  textColor?: string;
  tokens?: Tokens;
  onSignIn: () => void;
}

const ProfileSection = ({
  user,
  tokens,
  textColor = '#eee',
  onSignIn,
}: ProfileSectionProps) => (
  <div className={classes['profile-section']}>
    {tokens?.spotify ? (
      tokens?.firebase && !!user ? (
        <>
          <img
            className={classes['avatar']}
            src={user.images[0].url}
            alt="user avatar"
          />
          <p style={{ color: textColor }} className={classes['name']}>
            {user.display_name}
          </p>
        </>
      ) : (
        <p style={{ color: textColor }} className={classes['message']}>
          Confirm email we sent
        </p>
      )
    ) : (
      <motion.button
        className={classes['message']}
        onClick={onSignIn}
        whileHover={{ scale: 1.02, cursor: 'pointer' }}
        whileTap={{ scale: 0.98 }}
        style={{ color: textColor }}
      >
        Sign in with Spotify first
      </motion.button>
    )}
  </div>
);

export default ProfileSection;
