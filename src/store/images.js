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

    uploadImagesToAPI(state, file) {
      state.images.push(file);
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

    async uploadImagesToAPI({ commit }, { fileArray, galleryName }) {
      let formdata, response;
      const header = {
        'Content-Type': 'multipart/form-data; boundary=--boundary',
      };

      fileArray.forEach(async (file) => {
        try {
          formdata = new FormData();
          formdata.append('image', file);

          response = await axios.post(
            config.API_IMAGES_URI(galleryName),
            formdata,
            header
          );

          commit('uploadImagesToAPI', response.data);
        } catch (error) {
          alert(error.response.data);
        }
      });
    },
  },
  getters: {},
};
