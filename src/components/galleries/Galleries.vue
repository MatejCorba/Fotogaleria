<template>
  <div
    @contextmenu.prevent="showPopUp"
    v-for="gallery in galleries"
    :key="gallery._id"
    :id="gallery._id"
    class="gallery gallery-hover-efect"
    :class="{ gallery_selected: gallery.popUp }"
  >
    <router-link
      :to="{ name: `Images`, params: { galleryName: gallery.name } }"
      style="text-decoration: none; color: inherit"
    >
      <GalleryPopUp v-if="gallery.popUp"/>
      <img
        class="img-gallery"
        :src="config.API_GALLERIES_URI({ id: gallery._id, preview: true })"
        :alt="gallery.name"
        :title="gallery.name"
      />
      <p class="gallery-name">{{ gallery.name.toUpperCase() }}</p>
    </router-link>
  </div>

  <div v-if="showOverlay" class="overlay_menu overlay-on" @click="closePopUp"></div>
  <NewGalleryIcon />
</template>

<script>
import { reactive, toRefs, computed } from 'vue';
import config from '../../config/config';
import NewGalleryIcon from './NewGalleryIcon.vue';
import { useStore } from 'vuex';
import GalleryPopUp from './GalleryPopUp.vue';

export default {
  components: {
    NewGalleryIcon,
    GalleryPopUp,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      showOverlay: false,
      galleryIndex: 0
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
      
    }

    return {
      ...toRefs(state),
      config,
      galleries,
      showPopUp,
      closePopUp
    };
  },
};
</script>
