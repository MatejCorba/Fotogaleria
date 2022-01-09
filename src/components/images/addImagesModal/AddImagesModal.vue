<template>
  <div class="overlay overlay-on" @click="changeModalVisibility"></div>
  <section class="center-add-img add-image-modal">
    <i class="fas fa-times close" @click="changeModalVisibility"></i>
    <h1 class="text-addImg">PRIDAJ FOTKY</h1>
    <DragDrop :galleryName="galleryName" @uploadReady="enableUploadButton" />
    <button class="img-btn" @click="uploadImagesToAPI">
      <i class="fas fa-plus"></i> Pridať
    </button>
    <span v-if="uploadEnabled">Počet nahraných obrázkov: {{ imageNum }}</span>
  </section>
</template>

<script>
import { reactive, toRefs } from 'vue';
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
    });

    const changeModalVisibility = () =>
      store.dispatch('images/changeModalVisibility');

    const enableUploadButton = (files) => {
      // Pocet nahranych obrazkov
      state.imageNum = files.fileArray.length;

      state.uploadEnabled = true;
      state.filesToUpload = files;
    };

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

<style lang="scss" scoped></style>
