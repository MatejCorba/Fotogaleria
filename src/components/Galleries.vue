<template>
  <div
    v-for="gallery in $store.getters[`galleries/getGalleries`]"
    :key="gallery._id"
    class="gallery gallery-hover-efect"
  >
    <img
      class="img-gallery"
      :src="`${config.GALLERIES_URI}${gallery._id}`"
      :alt="gallery.name"
      :title="gallery.name"
    />
    <p class="gallery-name">{{ gallery.name.toUpperCase() }}</p>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { config } from '../config';

export default {
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
