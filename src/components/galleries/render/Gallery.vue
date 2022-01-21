<template>
  <div
    class="gallery"
    :class="{
      gallery_selected: gallery.popUp,
      'gallery-hover-efect': !gallery.popUp,
      scale: gallery.popUp,
    }"
  >
    <router-link
      :to="{ name: `Images`, params: { galleryName: gallery.name } }"
      style="text-decoration: none; color: inherit"
    >
      <transition name="pop">
        <GalleryPopUp v-if="gallery.popUp" />
      </transition>
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

<style scoped>
.scale {
  transform: scale(1.05);
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.1s ease-in;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateX(-25%);
}
</style>
