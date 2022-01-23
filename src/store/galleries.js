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
    deleteGallery(state, id) {
      const index = state.galleries.findIndex((gallery) => gallery._id === id);
      state.galleries.splice(index, 1);
    },
    changeGalleryName(state, { newName, id }) {
      const index = state.galleries.findIndex((gallery) => gallery._id === id);
      state.galleries[index].name = newName;
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

    async deleteGallery({ commit }, id) {
      try {
        await axios.delete(config.API_GALLERIES_URI({ id: id }));
        commit('deleteGallery', id);
      } catch (error) {
        alert(error.response.data);
      }
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

    async changeGalleryName({ commit }, { newName, id }) {
      try {
        await axios.put(config.API_GALLERIES_URI({ id: id }), {
          name: newName,
        });

        commit('changeGalleryName', {
          newName: newName,
          id: id,
        });
      } catch (error) {
        alert(error.response.data);
      }
    },
  },
  getters: {},
};

export default galleries;
