import axios from 'axios';

export const galleries = {
  namespaced: true,

  state: () => ({
    galleries: [],
  }),

  mutations: {
    getGalleriesFromAPI(state, galleries) {
        state.galleries = galleries
    }
  },

  actions: {
    async getGalleriesFromAPI({ commit }) {
      const response = await axios.get('http://localhost:3000/api/galleries');
      commit("getGalleriesFromAPI", response.data);
    },
  },
  getters: {
    getGalleries(state) {
      return state.galleries;
    },
  },
};



