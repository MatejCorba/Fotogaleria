<template>
  <div class="overlay overlay-on" @click="changeModalVisibility"></div>
  <section class="center-add-img add-image-modal">
    <i class="fas fa-times close" @click="changeModalVisibility"></i>
    <h1 class="text-addImg">PRIDAJ FOTKY</h1>
    <DragDrop :galleryName="galleryName" @uploadReady="enableUploadButton" />
    <button class="img-btn" @click="uploadImagesToAPI">
      <i class="fas fa-plus"></i> Pridať
    </button>

    <span v-if="uploadEnabled" class="images-uploaded"
      >Počet nahraných obrázkov: {{ imageNum }}</span
    >
    <span v-if="sameImages" class="images-same"
      >Obrázok "{{ sameImageName }}" sa už v tejto galérii nachádza</span
    >
  </section>
</template>

<script>
import { reactive, toRefs, computed } from 'vue';
import { useStore } from 'vuex';
import DragDrop from './DragDrop.vue';

export default {
  props: {
    galleryName: {
      type: String,
    },
  },
  components: {
    DragDrop,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      uploadEnabled: false,
      filesToUpload: {},
      imageNum: 0,

      sameImages: false,
      sameImageName: '',
    });

    const changeModalVisibility = () =>
      store.dispatch('images/changeModalVisibility');

    const enableUploadButton = (files) => {
      state.sameImages = false;
      state.uploadEnabled = false;

      const sameImage = checkIfSameImages(files);
      if (sameImage) return sameImageError(sameImage);

      // Pocet nahranych obrazkov
      state.imageNum = files.fileArray.length;

      state.uploadEnabled = true;
      state.filesToUpload = files;
    };

    const checkIfSameImages = (files) => {
      for (let image of files.fileArray) {
        for (let uploadedImage of images.value) {
          if (image.name == uploadedImage.path) return image.name;
        }
      }

      return false;
    };

    const sameImageError = (sameImageName) => {
      state.sameImages = true;
      state.sameImageName = sameImageName;
    };

    const images = computed(() => store.state.images.images);

    const uploadImagesToAPI = () => {
      if (!state.uploadEnabled) return;

      store.dispatch('images/uploadImagesToAPI', state.filesToUpload);
      store.dispatch('images/changeModalVisibility');
    };

    return {
      ...toRefs(state),
      changeModalVisibility,
      enableUploadButton,
      uploadImagesToAPI,
    };
  },
};
</script>

<style scoped>
.images-uploaded {
  color: darkblue;
  margin-left: 12px;
}

.images-same {
  color: red;
  margin-left: 12px;
}

.img-btn {
  cursor: pointer;
}
</style>
