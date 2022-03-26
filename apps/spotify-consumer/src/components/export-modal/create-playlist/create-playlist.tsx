import { FormEventHandler, createRef } from 'react';
import { SpotifyService } from '../../../services/spotify.service';
import { Tokens, Track, User } from '../../../types';
import BaseStep from '../base-step/base-step';
import classes from './create-playlist.module.css';

const spotifyService = new SpotifyService(
  process.env['NX_API_ENDPOINT'] ?? '',
  process.env['NX_AUTH_ENDPOINT'] ?? ''
);

interface CreatePlaylistProps {
  show: boolean;
  tracks: Track[];
  tokens: Tokens;
  user?: User;
  onBackward: () => void;
  onCreateFinish: () => void;
}

const CreatePlaylist = ({
  show,
  user,
  tracks,
  tokens,
  onBackward,
  onCreateFinish,
}: CreatePlaylistProps) => {
  const nameRef = createRef<HTMLInputElement>();
  const descriptionRef = createRef<HTMLTextAreaElement>();
  const publicRef = createRef<HTMLInputElement>();

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!user) return;
    const data = {
      name: nameRef.current?.value ?? 'My Playlist',
      description: descriptionRef.current?.value ?? '',
      public: publicRef.current?.checked ?? false,
    };

    await spotifyService.createPlaylistWithTracks(tokens, user, data, tracks);
    onCreateFinish();
  };

  return (
    <BaseStep show={show} onBackward={onBackward}>
      <div className={classes['content']}>
        <h1 className={classes['title']}>Create a New Playlist</h1>
      </div>
      <form onSubmit={submitHandler} className={classes['form']}>
        <div className={classes['container']}>
          <label className={classes['label']} htmlFor="name">
            Name
          </label>
          <br />
          <input
            className={classes['input']}
            id="name"
            name="name"
            ref={nameRef}
          />
        </div>
        <div className={classes['container']}>
          <label className={classes['label']} htmlFor="description">
            Description
          </label>
          <br />
          <textarea
            className={classes['textarea']}
            id="description"
            name="description"
            ref={descriptionRef}
            rows={4}
          />
        </div>
        <div className={classes['container']}>
          <p className={classes['label']}>Public</p>
          <br />
          <input
            className={classes['checkbox']}
            type="checkbox"
            id="public"
            ref={publicRef}
          />
          <label className={classes['box']} htmlFor="public">
            <div className={classes['tick']} />
          </label>
        </div>
        <input
          className={classes['button']}
          type="submit"
          value="Create Playlist"
        />
      </form>
    </BaseStep>
  );
};

export default CreatePlaylist;
