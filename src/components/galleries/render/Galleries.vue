<template>
  <Gallery
    @mouseleave="galleryUnhovered"
    @mouseover="galleryHovered"
    @contextmenu.prevent="showPopUp"
    @disableOverlay="disableOverlay"
    v-for="gallery in galleries"
    :key="gallery._id"
    :id="gallery._id"
    :gallery="gallery"
    :galleryIndex="galleryIndex"
  />

  <div
    v-if="showOverlay"
    class="overlay_menu overlay-on"
    @click="closePopUp"
  ></div>
  <NewGalleryIcon />
</template>

<script>
import { reactive, toRefs, computed } from 'vue';
import NewGalleryIcon from '../NewGalleryIcon.vue';
import { useStore } from 'vuex';
import Gallery from './Gallery.vue';

export default {
  components: {
    NewGalleryIcon,
    Gallery,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      showOverlay: false,
      galleryIndex: 0,
    });

    // Computed properties
    const galleries = computed(() => store.state.galleries.galleries);

    const showPopUp = (event) => {
      state.showOverlay = true;
      let clicked_id = event.currentTarget.id;
      state.galleryIndex = galleries.value.findIndex(
        (gallery) => gallery._id === clicked_id
      );

      store.dispatch('galleries/showPopUp', state.galleryIndex);
    };
    const disableOverlay = () => (state.showOverlay = false);

    const closePopUp = () => {
      state.showOverlay = false;

      store.dispatch('galleries/closePopUp', state.galleryIndex);
    };
    const galleryHovered = (event) => {
      const id = event.currentTarget.id;
      const hoveredIndex = galleries.value.findIndex(gallery => gallery._id == id);
      store.dispatch("galleries/galleryHovered", hoveredIndex);

    };

    const galleryUnhovered = (event) => {
      const id = event.currentTarget.id;
      const hoveredIndex = galleries.value.findIndex(gallery => gallery._id == id);
      
      store.dispatch("galleries/galleryUnhovered", hoveredIndex);
    };

    return {
      ...toRefs(state),
      galleries,
      disableOverlay,
      showPopUp,
      closePopUp,
      galleryHovered,
      galleryUnhovered,
    };
  },
};
</script>
