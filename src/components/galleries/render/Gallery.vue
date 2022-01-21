<template>
  <div
    class="gallery gallery-hover-efect"
    :class="{ gallery_selected: gallery.popUp }"
  >
    <router-link
      :to="{ name: `Images`, params: { galleryName: gallery.name } }"
      style="text-decoration: none; color: inherit"
    >
      <GalleryPopUp v-if="gallery.popUp" />
      <img
        class="img-gallery"
        :src="config.API_GALLERIES_URI({ id: gallery._id, preview: true })"
        :alt="gallery.name"
        :title="gallery.name"
      />
      <p class="gallery-name">{{ gallery.name.toUpperCase() }}</p>
    </router-link>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import GalleryPopUp from './GalleryPopUp.vue';
import config from '../../../config/config';

export default {
  components: {
    GalleryPopUp,
  },
  props: {
    gallery: {
      type: Object,
    },
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

<style lang="scss" scoped></style>
