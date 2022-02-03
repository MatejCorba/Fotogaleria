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
export default {
  emits: ['uploaded'],
  props: {
    galleryName: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const imageUpload = (files) => {
      emit('uploaded', {
        fileArray: [...files.target.files],
        galleryName: props.galleryName,
      });
    };

    return {
      imageUpload,
    };
  },
};
</script>

<style lang="scss" scoped></style>
