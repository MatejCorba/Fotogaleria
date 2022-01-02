import { createStore } from 'vuex';
import { images } from './images';

export default createStore({
  modules: {
    images: images
  },
});
