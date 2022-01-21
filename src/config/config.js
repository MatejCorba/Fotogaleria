import { API_BASE_URL, PREVIEW_WIDTH, PREVIEW_HEIGHT } from './config.json';

const toQueryString = (width, height) => {
  if (!(width || height))
    throw new Error('Nezadal si ani jeden rozmer nahladovych obrazkov.');

  const previewSize = {};
  if (width) previewSize.width = width;
  if (height) previewSize.height = height;

  return '?' + new URLSearchParams(previewSize).toString();
};

const config = {
  previewSizeQuery: toQueryString(PREVIEW_WIDTH, PREVIEW_HEIGHT),
  exifQuery: '?image=false',

  API_GALLERIES_URI: ({ id, preview, exif }) =>
    `${API_BASE_URL}/api/galleries${id ? '/' + id : ``}` +
    (id && preview
      ? config.previewSizeQuery
      : id && exif
      ? config.exifQuery
      : ``),

  API_IMAGES_URI: ({ gallery, id, preview, exif }) => {
    if (!gallery) throw new Error('Neposlal si meno galérie.');

    return (
      `${API_BASE_URL}/api/galleries/images/${gallery}${id ? '/' + id : ``}` +
      (id && preview
        ? config.previewSizeQuery
        : id && exif
        ? config.exifQuery
        : ``)
    );
  },
};

export default config;
