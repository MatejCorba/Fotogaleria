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
    deleteGallery(state, index) {
      state.galleries.splice(index, 1);
    },
    changeGalleryName(state, { newName, index }) {
      state.galleries[index].name = newName;
    },
    galleryHovered(state, index) {
      state.galleries[index].hovered = true;
    },
    galleryUnhovered(state, index) {
      state.galleries[index].hovered = false;
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
    galleryHovered({ commit }, index) {
      commit('galleryHovered', index);
    },
    galleryUnhovered({ commit }, index) {
      commit('galleryUnhovered', index);
    },

    async deleteGallery({ commit }, { id, index }) {
      try {
        await axios.delete(config.API_GALLERIES_URI({ id: id }));
        commit('deleteGallery', index);
      } catch (error) {
        commit('closePopUp', index);

        // Pockame 180ms, kým sa zatvorí popUp a az tak zobrazime alert
        setTimeout(() => {
          alert(error.response.data);
        }, 180);
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

    async changeGalleryName({ commit }, { newName, id, index }) {
      try {
        await axios.put(config.API_GALLERIES_URI({ id: id }), {
          name: newName,
        });

        commit('changeGalleryName', {
          newName: newName,
          index: index,
        });
      } catch (error) {
        commit('closePopUp', index);

        // Pockame 180ms, kým sa zatvorí popUp a az tak zobrazime alert
        setTimeout(() => {
          alert(error.response.data);
          commit('galleryUnhovered', index);
        }, 180);
      }
    },
  },
  getters: {},
};

export default galleries;
