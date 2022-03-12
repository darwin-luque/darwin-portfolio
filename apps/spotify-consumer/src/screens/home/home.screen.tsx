import FoundTracksList from '../../components/found-tracks-list/found-tracks-list';
import NewReleasesGallery from '../../components/new-releases/new-releases-gallery/new-releases-gallery';
import classes from './home.module.css';

const Home = () => {
  return (
    <div className={classes['home']}>
      <div className={classes['gallery']}>
        <NewReleasesGallery />
      </div>
      <div className={classes['tracks']}>
        <FoundTracksList />
      </div>
    </div>
  );
};

export default Home;
