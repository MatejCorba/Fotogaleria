import axios from 'axios';
import config from '../config/config';

const images = {
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
    showPopUp(state, index) {
      state.images[index].popUp = true;
    },
    closePopUp(state, index) {
      state.images[index].popUp = false;
    },
  },
  actions: {
    async getImagesFromAPI({ commit }, galleryName) {
      const response = await axios.get(
        config.API_IMAGES_URI({ gallery: galleryName })
      );
      commit('getImagesFromAPI', response.data);
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
            config.API_IMAGES_URI({ gallery: galleryName }),
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

export default images;
