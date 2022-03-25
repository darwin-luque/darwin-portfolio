import { FormEventHandler, createRef } from 'react';
import BaseStep from '../base-step/base-step';
import classes from './create-playlist.module.css';

interface CreatePlaylistProps {
  show: boolean;
  onBackward: () => void;
}

const CreatePlaylist = ({ show, onBackward }: CreatePlaylistProps) => {
  const nameRef = createRef<HTMLInputElement>();
  const descriptionRef = createRef<HTMLTextAreaElement>();
  const publicRef = createRef<HTMLInputElement>();
  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log({
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      public: publicRef.current?.checked,
    });
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
