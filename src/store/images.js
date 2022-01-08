import axios from 'axios';
import { config } from '../config';

export const images = {
  namespaced: true,

  state: () => ({
    images: [],
    showImageModal: false,
  }),
  mutations: {
    getImagesFromAPI(state, galleryImages) {
      state.images = galleryImages;
    },
    changeModalVisibility(state) {
      state.showImageModal = !state.showImageModal;
    },
  },
  actions: {
    async getImagesFromAPI({ commit }, galleryName) {
      const response = await axios.get(config.API_IMAGES_URI(galleryName));
      commit('getImagesFromAPI', response.data);
    },
    changeModalVisibility({ commit }) {
      commit('changeModalVisibility');
    },
  },
  getters: {},
};
