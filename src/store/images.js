import axios from 'axios';

export const images = {
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
    getImages(state) {
      return state.galleries;
    },
  },
};



