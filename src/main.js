import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import lightbox from 'lightbox2';

// css
import './css/style.css';
import '../node_modules/lightbox2/src/css/lightbox.css';
import './css/galleryPopUp.css';
import './css/imagePopUp.css';
import "./css/exif.css"

// Lightbox config
lightbox.option({
  albumLabel: 'Obrázok %1 z %2',
  wrapAround: true,
});

createApp(App).use(store).use(router).mount('#app');
