import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import lightbox from 'lightbox2';

// Hlavne css
import './css/main.css';

// Modals
import './css/addNewGallery.css';
import './css/addNewImage.css';
import './css/exif.css';

// PopUps
import './css/menu_gallery.css';
import './css/menu_images.css';

// LightBox
import '../node_modules/lightbox2/src/css/lightbox.css';

// Lightbox config
lightbox.option({
  albumLabel: 'Obrázok %1 z %2',
  wrapAround: true,
});

createApp(App).use(store).use(router).mount('#app');
