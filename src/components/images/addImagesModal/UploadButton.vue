<template>
  <input
    type="file"
    id="actual-btn"
    name="Files"
    hidden
    multiple
    @change="imageUpload"
  />
  <label class="image-upload-button" for="actual-btn">VYBERTE SÚBORY</label>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    galleryName: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    const imageUpload = (files) => {
      store.dispatch('images/uploadImagesToAPI', {
        fileArray: [...files.target.files],
        galleryName: props.galleryName,
      });
    };

    return {
      ...toRefs(state),
      imageUpload,
    };
  },
};
</script>

<style lang="scss" scoped></style>
