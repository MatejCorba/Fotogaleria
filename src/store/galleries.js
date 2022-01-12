import axios from 'axios';
import config from '../config/config';

export const galleries = {
  namespaced: true,

  state: () => ({
    galleries: [],
    showGalleryModal: false,
  }),

  mutations: {
    getGalleriesFromAPI(state, galleries) {
      state.galleries = galleries;
    },
    changeModalVisibility(state) {
      state.showGalleryModal = !state.showGalleryModal;
    },

    addNewGalery(state, newGallery) {
      state.galleries.push(newGallery);
    },
  },

  actions: {
    async getGalleriesFromAPI({ commit }) {
      const response = await axios.get(config.API_GALLERIES_URI({}));
      commit('getGalleriesFromAPI', response.data);
    },
    changeModalVisibility({ commit }) {
      commit('changeModalVisibility');
    },

    async addNewGallery({ commit }, name) {
      try {
        const response = await axios.post(config.API_GALLERIES_URI({}), {
          name: name.trim().toUpperCase(),
        });
        commit('addNewGalery', response.data);
      } catch (error) {
        alert(error.response.data);
      }
    },
  },
  getters: {},
};
