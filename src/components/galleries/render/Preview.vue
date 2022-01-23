<template>
  <img
    class="img-gallery"
    :src="
      config.API_GALLERIES_URI({ id: gallery._id, preview: true }) +
      `&random=${Math.random()}`
    "
    :alt="gallery.name"
    :title="gallery.name"
  />
</template>

<script>
import config from '../../../config/config';
export default {
  props: {
    gallery: {
      type: Object,
    },
  },
  setup() {
    return {
      config,
    };
  },
};
</script>
