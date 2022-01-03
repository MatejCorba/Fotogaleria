export const config = {
  API_GALLERIES_URI: 'http://localhost:3000/api/galleries/',
  API_IMAGES_URI: (galleryName) =>
    `http://localhost:3000/api/galleries/images/${galleryName}`,
};
