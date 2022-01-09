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

export default {
  emits: ['uploaded'],
  props: {
    galleryName: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      count: 0,
    });

    const imageUpload = (files) => {
      emit('uploaded', {
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
