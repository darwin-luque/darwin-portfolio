import { useParams } from 'solid-app-router';

const Track = () => {
  const params = useParams();
  return (
    <div>
      <h1>Track {params.id}</h1>
    </div>
  );
};

export default Track;
