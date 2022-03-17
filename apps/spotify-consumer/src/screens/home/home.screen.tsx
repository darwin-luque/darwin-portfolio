import FoundTracksList from '../../components/found-tracks-list/found-tracks-list';
import NewReleasesGallery from '../../components/new-releases/new-releases-gallery/new-releases-gallery';
import NoSessionPlaceholder from '../../components/no-session-placeholder/no-session-placeholder';
import { useAppSelector } from '../../hooks/redux-hooks';
import classes from './home.module.css';

const Home = () => {
  const { tokens } = useAppSelector((state) => state.auth);
  return (
    <div className={classes['home']}>
      {tokens.firebase && tokens.spotify ? (
        <>
          <div className={classes['gallery']}>
            <NewReleasesGallery />
          </div>
          <div className={classes['tracks']}>
            <FoundTracksList />
          </div>
        </>
      ) : (
        <NoSessionPlaceholder
          hasFirebaseSession={!!tokens.firebase}
          hasSpotifySession={!!tokens.spotify}
        />
      )}
    </div>
  );
};

export default Home;
