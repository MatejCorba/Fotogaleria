import axios from 'axios';
import { config } from '../config';

export const galleries = {
  namespaced: true,

  state: () => ({
    galleries: [],
    newGalleryClicked: false,
  }),

  mutations: {
    getGalleriesFromAPI(state, galleries) {
      state.galleries = galleries;
    },
    changeModalVisibility(state) {
      state.newGalleryClicked = !state.newGalleryClicked;
    },
  },

  actions: {
    async getGalleriesFromAPI({ commit }) {
      const response = await axios.get(config.API_GALLERIES_URI);
      commit('getGalleriesFromAPI', response.data);
    },
    changeModalVisibility({ commit }) {
      commit('changeModalVisibility');
    },
  },
  getters: {
    getGalleries(state) {
      return state.galleries;
    },
  },
};
