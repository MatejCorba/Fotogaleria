const runInDocker = false;
const preview_width = '300';
const preview_height = '';

const toQueryString = (width, height) => {
  const previewSize = {};
  if (width) previewSize.width = width;
  if (height) previewSize.height = height;

  return '?' + new URLSearchParams(previewSize).toString();
};

export const config = {
  base_url: runInDocker ? 'fotogaleria' : 'localhost:3000',
  previewSizeQuery: toQueryString(preview_width, preview_height),

  API_GALLERIES_URI: (id = '', preview = false) =>
    `http://${config.base_url}/api/galleries${id ? '/' + id : ``}` +
    (preview ? config.previewSizeQuery : ``),

  API_IMAGES_URI: (galleryName, id = '', preview = false) =>
    `http://${config.base_url}/api/galleries/images/${galleryName}${
      id ? '/' + id : ``
    }` + (preview ? config.previewSizeQuery : ``),
};
