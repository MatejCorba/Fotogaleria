import axios from 'axios';
import { config } from '../config';

export const images = {
  namespaced: true,

  state: () => ({
      images: []
  }),
  mutations: {
      getImagesFromAPI(state, galleryImages){
          state.images = galleryImages;
      }
  },
  actions: {
      async getImagesFromAPI({ commit }, { _value }) {
          const response = await axios.get(config.API_IMAGES_URI(_value));
          commit("getImagesFromAPI", response.data )
      }
  },
  getters: {},
};
