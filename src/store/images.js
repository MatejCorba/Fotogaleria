import axios from 'axios';
import { config } from '../config';

export const images = {
  namespaced: true,

  state: () => ({
    images: [],
  }),
  mutations: {
    getImagesFromAPI(state, galleryImages) {
      state.images = galleryImages;
    },
  },
  actions: {
    async getImagesFromAPI({ commit }, galleryName) {
      const response = await axios.get(config.API_IMAGES_URI(galleryName));
      commit('getImagesFromAPI', response.data);
    },
  },
  getters: {},
};
