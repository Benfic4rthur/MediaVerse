export const generateRandomName = fileName => {
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const extension = fileName.split('.').pop();
  return `${randomSuffix}.${extension}`;
};

