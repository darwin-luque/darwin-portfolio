import { motion } from 'framer-motion';
import { User } from '../../../types';
import classes from './profile-section.module.css';

interface ProfileSectionProps {
  user: User | undefined;
  onSignIn: () => void;
}

const ProfileSection = ({ user, onSignIn }: ProfileSectionProps) => (
  <div className={classes['profile-section']}>
    {!!user ? (
      <>
        <img className={classes['avatar']} src={user.images[0].url} alt="user avatar" />
        <p className={classes['name']}>{user.display_name}</p>
      </>
    ) : (
      <motion.button className={classes['message']} onClick={onSignIn}>
        Sign in with Spotify first
      </motion.button>
    )}
  </div>
);

export default ProfileSection;
