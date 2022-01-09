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
    <UploadButton :galleryName="galleryName" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import UploadButton from './UploadButton.vue';
import { useStore } from 'vuex';

export default {
  props: {
    galleryName: {
      type: String,
    },
  },
  components: {
    UploadButton,
  },
  setup(props) {
    const store = useStore();
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
      store.dispatch('images/uploadImagesToAPI', {
        fileArray: [...files.dataTransfer.files],
        galleryName: props.galleryName,
      });
    };

    return {
      ...toRefs(state),
      changeBorderSolid,
      changeBorderDotted,
      imageUpload,
    };
  },
};
</script>

<style lang="scss" scoped></style>
