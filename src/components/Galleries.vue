<template>
  <div
    v-for="gallery in $store.getters[`galleries/getGalleries`]"
    :key="gallery._id"
    class="gallery gallery-hover-efect"
  >
    <img
      class="img-gallery"
      :src="`http://localhost:3000/api/galleries/${gallery._id}`"
      :alt="gallery.name"
      :title="gallery.name"
    />
    <p class="gallery-name">{{ gallery.name.toUpperCase() }}</p>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
