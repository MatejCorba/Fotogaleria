export const config = {
  preview_width: '300',
  preview_height: '300',
  API_GALLERIES_URI: (id = false, preview = false) =>
    `http://localhost:3000/api/galleries${id ? '/' + id : ``}` +
    (preview
      ? `?width=${config.preview_width}&height=${config.preview_height}`
      : ``),
  API_IMAGES_URI: (galleryName, id = false, preview = false) =>
    `http://localhost:3000/api/galleries/images/${galleryName}${
      id ? '/' + id : ``
    }` +
    (preview
      ? `?width=${config.preview_width}&height=${config.preview_height}`
      : ``),
};
