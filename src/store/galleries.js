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

    addNewGalery(state, newGallery) {
      state.galleries.push(newGallery);
    }
  },

  actions: {
    async getGalleriesFromAPI({ commit }) {
      const response = await axios.get(config.API_GALLERIES_URI);
      commit('getGalleriesFromAPI', response.data);
    },
    changeModalVisibility({ commit }) {
      commit('changeModalVisibility');
    },

    async addNewGallery({ commit }, name) {
      const response = await axios.post(config.API_GALLERIES_URI, {
        name: name,
      });
      commit('addNewGalery', response.data);
    },
  },
  getters: {
    getGalleries(state) {
      return state.galleries;
    },
  },
};
