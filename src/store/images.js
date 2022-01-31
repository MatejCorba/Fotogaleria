import axios from 'axios';
import config from '../config/config';

const images = {
  namespaced: true,

  state: () => ({
    images: [],
    showImageModal: false,
    showExifModal: false,
    exifIndex: 0,
    showMultiDeleteMenu: false,
  }),
  mutations: {
    getImagesFromAPI(state, galleryImages) {
      state.images = galleryImages;
    },
    changeModalVisibility(state) {
      state.showImageModal = !state.showImageModal;
    },

    uploadImagesToAPI(state, file) {
      state.images = [...state.images, file];
    },
    showPopUp(state, index) {
      state.images[index].popUp = true;
    },
    closePopUp(state, index) {
      state.images[index].popUp = false;
    },
    deleteImage(state, index) {
      state.images.splice(index, 1);
    },
    changeExifVisibility(state) {
      state.showExifModal = !state.showExifModal;
    },

    setExifIndex(state, index) {
      state.exifIndex = index;
    },
    changeDeleteMenuVisibility(state) {
      state.showMultiDeleteMenu = !state.showMultiDeleteMenu;
    },
    markDeleteCheckbox(state, imageIndex) {
      state.images[imageIndex].checkboxMarked =
        !state.images[imageIndex].checkboxMarked;
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

    changeExifVisibility({ commit }) {
      commit('changeExifVisibility');
    },

    async deleteImage({ commit }, { galleryName, imageIndex, imageId }) {
      try {
        await axios.delete(
          config.API_IMAGES_URI({ gallery: galleryName, id: imageId })
        );
        commit('deleteImage', imageIndex);
      } catch (error) {
        commit('closePopUp', imageIndex);

        // Pockame 180ms, kým sa zatvorí popUp a az tak zobrazime alert
        setTimeout(() => {
          alert(error.response.data);
        }, 180);
      }
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
    setExifIndex({ commit }, index) {
      commit('setExifIndex', index);
    },
    changeDeleteMenuVisibility({ commit }) {
      commit('changeDeleteMenuVisibility');
    },
    markDeleteCheckbox({ commit }, imageIndex) {
      commit('markDeleteCheckbox', imageIndex);
    },
  },
  getters: {},
};

export default images;
