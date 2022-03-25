import axios, { AxiosResponse } from 'axios';
import BaseStep from '../base-step/base-step';
import PlaylistItem from './playlist-item/playlist-item';
import classes from './choose-playlist.module.css';
import { Fragment, useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { GetPlaylistsResponse, Playlist } from '../../../types';
import { motion } from 'framer-motion';

interface ChoosePlaylistProps {
  show: boolean;
  onBackward: () => void;
  onFallback: () => void;
}

const ChoosePlaylist = ({
  show,
  onBackward,
  onFallback,
}: ChoosePlaylistProps) => {
  const { tokens, user } = useAppSelector((state) => state.auth);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    if (user && tokens.spotify) {
      axios({
        url: `${process.env['NX_API_ENDPOINT']}/users/${user.id}/playlists`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokens.spotify.access_token}`,
        },
        params: {
          limit: 20,
        },
      }).then((res: AxiosResponse<GetPlaylistsResponse>) => {
        setPlaylists(res.data.playlists.items);
      });
    }
  }, [tokens.spotify, user]);

  return (
    <BaseStep onBackward={onBackward} show={show}>
      <div className={classes['content']}>
        <h1 className={classes['title']}>Choose from your Playlists</h1>
      </div>
      <ul className={classes['playlists']}>
        {playlists.length === 0 && (
          <motion.button
            className={classes['fallback']}
            onClick={onFallback}
            whileHover={{ cursor: 'pointer', scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Seems like you don't have any playlist.
            <br />
            Try creating one!
          </motion.button>
        )}
        {playlists.map(({ id, name, images }, i) => (
          <Fragment key={id}>
            <PlaylistItem
              name={name}
              imageSrc={images[0].url}
              onClick={() => console.log(id)}
            />
            {i + 1 < playlists.length && <hr className={classes['line']} />}
          </Fragment>
        ))}
      </ul>
    </BaseStep>
  );
};

export default ChoosePlaylist;
