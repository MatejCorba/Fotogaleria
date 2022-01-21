<template>
  <Gallery
    @contextmenu.prevent="showPopUp"
    v-for="gallery in galleries"
    :key="gallery._id"
    :id="gallery._id"
    :gallery="gallery"
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

      store.state.galleries.galleries[state.galleryIndex].popUp = true;
    };

    const closePopUp = () => {
      state.showOverlay = false;
      store.state.galleries.galleries[state.galleryIndex].popUp = false;
    };

    return {
      ...toRefs(state),
      galleries,
      showPopUp,
      closePopUp,
    };
  },
};
</script>
