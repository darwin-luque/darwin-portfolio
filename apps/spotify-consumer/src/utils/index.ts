import { Track } from '../types';

export const generateRandomString = (length = 32) => {
  const keys = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let output = '';

  for (let i = 0; i < length; i += 1) {
    output += keys[Math.floor(Math.random() * keys.length)];
  }

  return output;
};

export const updateObject = <T>(obj: T, newParams: Partial<T>): T => ({
  ...obj,
  ...newParams,
});

export const trasnforToURLEncodedForm = (data: {
  [key: string]: string;
}): URLSearchParams => {
  const encodedData = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    encodedData.append(key, value);
  });

  return encodedData;
};

export const addOrRemoveTrackOnLibrary = (
  track: Track,
  library: Track[],
  isAdd: boolean
): Track[] => {
  if (isAdd) {
    const inLibrary = library.map(({ id }) => id).includes(track.id ?? '');
    return inLibrary ? library : [...library, track!];
  }
  return library.filter(({ id }) => id === track.id);
};
