export const config = {
  preview_width: '300',
  preview_height: '200',
  API_GALLERIES_URI: (id = '', preview = false) =>
    `http://localhost:3000/api/galleries${id ? '/' + id : ``}` +
    (preview
      ? config.preview_width && config.preview_height
        ? `?width=${config.preview_width}&height=${config.preview_height}`
        : config.preview_width
        ? `?width=${config.preview_width}`
        : `?height=${config.preview_height}`
      : ``),
  API_IMAGES_URI: (galleryName, id = '', preview = false) =>
    `http://localhost:3000/api/galleries/images/${galleryName}${
      id ? '/' + id : ``
    }` +
    (preview
      ? config.preview_width && config.preview_height
        ? `?width=${config.preview_width}&height=${config.preview_height}`
        : config.preview_width
        ? `?width=${config.preview_width}`
        : `?height=${config.preview_height}`
      : ``),
};
