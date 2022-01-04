import { createStore } from 'vuex';
import { galleries } from './galleries';

export default createStore({
  modules: {
    galleries: galleries,
  },
});
