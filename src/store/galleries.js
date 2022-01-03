import axios from 'axios';
import { config } from '../config';

export const galleries = {
  namespaced: true,

  state: () => ({
    galleries: [],
  }),

  mutations: {
    getGalleriesFromAPI(state, galleries) {
      state.galleries = galleries;
    },
  },

  actions: {
    async getGalleriesFromAPI({ commit }) {
      const response = await axios.get(config.GALLERIES_URI);
      commit('getGalleriesFromAPI', response.data);
    },
  },
  getters: {
    getGalleries(state) {
      return state.galleries;
    },
  },
};
