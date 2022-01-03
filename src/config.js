export const config = {
  GALLERIES_URI: 'http://localhost:3000/api/galleries/',
  IMAGES_URI: (galleryName) =>
    `http://localhost:3000/api/galleries/images/${galleryName}`,
};
