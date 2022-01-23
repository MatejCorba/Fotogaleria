import axios from 'axios';
import config from '../config/config';

const galleries = {
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
    showPopUp(state, index) {
      state.galleries[index].popUp = true;
    },
    closePopUp(state, index) {
      state.galleries[index].popUp = false;
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
    showPopUp({ commit }, index) {
      commit('showPopUp', index);
    },
    closePopUp({ commit }, index) {
      commit('closePopUp', index);
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

export default galleries;
