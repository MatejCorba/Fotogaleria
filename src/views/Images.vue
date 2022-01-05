<template>
  <Header :title="galleryName.toUpperCase()" />
  <div class="images-container">
    <GalleryImages :name="galleryName" />
  </div>
</template>

<script>
import { reactive, toRefs, computed, onMounted, onUnmounted } from 'vue';
import Header from '../components/Header.vue';
import { useRoute } from 'vue-router';
import GalleryImages from '../components/images/GalleryImages.vue';
import { useStore } from 'vuex';

export default {
  components: {
    Header,
    GalleryImages,
  },
  setup() {
    const store = useStore();
    const router = useRoute();
    const state = reactive({
      count: 0,
    });

    // Computed properties
    const galleryName = computed(() => router.params.galleryName).value;

    onMounted(() => {
      store.dispatch('images/getImagesFromAPI', galleryName);
    });

    onUnmounted(() => {
      store.state.images.images = [];
    });

    return {
      ...toRefs(state),
      galleryName,
    };
  },
};
</script>

<style lang="scss" scoped></style>
