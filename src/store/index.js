import { createStore } from 'vuex';
import galleries from './galleries';
import images from './images';

export default createStore({
  modules: {
    galleries: galleries,
    images: images,
  },
});
