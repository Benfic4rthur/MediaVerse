export const getFileNameExtension = (NameUrl = '') => {
  const formatosImagens = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'webp', 'svg'];

  const extensoesImagens = new RegExp(`\\.(?:${formatosImagens.join('|')})\\b`, 'gi');

  return NameUrl.match(extensoesImagens);
};
