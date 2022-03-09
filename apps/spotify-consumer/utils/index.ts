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
