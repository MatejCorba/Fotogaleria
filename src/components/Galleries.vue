<template>
  <div
    v-for="gallery in $store.getters[`galleries/getGalleries`]"
    :key="gallery._id"
    class="gallery gallery-hover-efect"
  >
    <img
      class="img-gallery"
      :src="`${config.API_GALLERIES_URI}${gallery._id}`"
      :alt="gallery.name"
      :title="gallery.name"
    />
    <p class="gallery-name">{{ gallery.name.toUpperCase() }}</p>
  </div>

  <NewGalleryIcon />
</template>

<script>
import { reactive, toRefs } from 'vue';
import { config } from '../config';
import NewGalleryIcon from '../components/NewGalleryIcon.vue';

export default {
  components: {
    NewGalleryIcon,
  },
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
      config,
    };
  },
};
</script>
