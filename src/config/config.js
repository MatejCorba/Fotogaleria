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

  /**
   * Generácia URI na získavanie údajov ohľadom galérii z API
   * @param {Object} URI - Do funkcie treba poslať objekt obsahúci údaje ohľadom URI
   * @param {string=} URI.id - Id galérie, ktorú cheme zobraziť
   * @param {Boolean=} URI.preview - Po nastavení tejto hodnoty na true sa zmenia rezmery náhľ. obrázka na rozmery v "config.json"
   * @param {Boolean=} URI.exif - Po nastavení tejto hodnoty na true sa nam namiesto náhľ. obrázka zobrazi jeho exif
   */

  API_GALLERIES_URI: ({ id, preview, exif }) =>
    `${API_BASE_URL}/api/galleries${id ? '/' + id : ``}` +
    (id && preview
      ? config.previewSizeQuery
      : id && exif
      ? config.exifQuery
      : ``),

  /**
   * Generácia URI na získavanie údajov ohľadom obrázkov z API
   * @param {Object} URI - Do funkcie treba poslať objekt obsahúci údaje ohľadom URI
   * @param {String} URI.gallery - Meno galérie, z ktorej chceme zobraziť obrázky
   * @param {string=} URI.id - Id obrázka, ktorý chceme zobraziť
   * @param {Boolean=} URI.preview - Po nastavení tejto hodnoty na true sa zmenia rezmery obrázka na rozmery v "config.json"
   * @param {Boolean=} URI.exif - Po nastavení tejto hodnoty na true sa nam namiesto obrázka zobrazi jeho exif
   */

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
