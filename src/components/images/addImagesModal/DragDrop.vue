<template>
  <div
    class="drop-images"
    :class="{ 'drop-border-solid': borderSolid }"
    @dragover.prevent="changeBorderSolid"
    @dragend.prevent="changeBorderDotted"
    @dragleave.prevent="changeBorderDotted"
    @drop.prevent="imageUpload"
  >
    <i class="fas fa-camera"></i>
    <p class="text-center">
      SEM PRESUNTE FOTKY <br />
      alebo
    </p>
    <UploadButton :galleryName="galleryName" @uploaded="uploadedButton" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import UploadButton from './UploadButton.vue';

export default {
  emits: ['uploadReady'],
  props: {
    galleryName: {
      type: String,
    },
  },
  components: {
    UploadButton,
  },
  setup(props, { emit }) {
    const state = reactive({
      borderSolid: false,
    });

    const changeBorderSolid = () => {
      state.borderSolid = true;
    };
    const changeBorderDotted = () => {
      state.borderSolid = false;
    };
    const imageUpload = (files) => {
      /*
      store.dispatch('images/uploadImagesToAPI', {
        fileArray: [...files.dataTransfer.files],
        galleryName: props.galleryName,
      });
      */
      emit('uploadReady', {
        fileArray: [...files.dataTransfer.files],
        galleryName: props.galleryName,
      });
    };

    const uploadedButton = (files) => emit('uploadReady', files);

    return {
      ...toRefs(state),
      changeBorderSolid,
      changeBorderDotted,
      imageUpload,
      uploadedButton,
    };
  },
};
</script>

<style lang="scss" scoped></style>
