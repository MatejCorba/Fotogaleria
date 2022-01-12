<template>
  <div
    v-for="gallery in galleries"
    :key="gallery._id"
    class="gallery gallery-hover-efect"
  >
    <router-link
      :to="{ name: `Images`, params: { galleryName: gallery.name } }"
      style="text-decoration: none; color: inherit"
    >
      <img
        class="img-gallery"
        :src="config.API_GALLERIES_URI(gallery._id, (preview = true))"
        :alt="gallery.name"
        :title="gallery.name"
      />
      <p class="gallery-name">{{ gallery.name.toUpperCase() }}</p>
    </router-link>
  </div>

  <NewGalleryIcon />
</template>

<script>
import { reactive, toRefs, computed } from 'vue';
import { config } from '../../config/config';
import NewGalleryIcon from './NewGalleryIcon.vue';
import { useStore } from 'vuex';

export default {
  components: {
    NewGalleryIcon,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    // Computed properties
    const galleries = computed(() => store.state.galleries.galleries);

    return {
      ...toRefs(state),
      config,
      galleries,
    };
  },
};
</script>
