import NewReleasesGallery from "../../components/new-releases/new-releases-gallery/new-releases-gallery";

const Home = () => {
  console.log(process.env)
  return (
    <div>
      <NewReleasesGallery />
      <h1>Home Screen</h1>
    </div>
  );
};

export default Home;
