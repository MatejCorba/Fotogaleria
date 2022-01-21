<template>
  <Header :title="galleryName.toUpperCase()" />
  <ArrowBack />
  <div class="images-container">
    <GalleryImages :name="galleryName" />
  </div>
  <AddImagesModal v-if="showImageModal" :galleryName="galleryName" />
</template>

<script>
import { reactive, toRefs, computed, onMounted, onUnmounted } from 'vue';
import Header from '../components/Header.vue';
import { useRoute } from 'vue-router';
import GalleryImages from '../components/images/render/GalleryImages.vue';
import { useStore } from 'vuex';
import ArrowBack from '../components/images/ArrowBack.vue';
import AddImagesModal from '../components/images/addImagesModal/AddImagesModal.vue';

export default {
  components: {
    Header,
    GalleryImages,
    ArrowBack,
    AddImagesModal,
  },
  setup() {
    const store = useStore();
    const router = useRoute();
    const state = reactive({
      count: 0,
    });

    // Computed properties
    const galleryName = computed(() => router.params.galleryName).value;
    const showImageModal = computed(() => store.state.images.showImageModal);

    onMounted(() => {
      store.dispatch('images/getImagesFromAPI', galleryName);
    });

    onUnmounted(() => {
      store.state.images.images = [];
    });

    return {
      ...toRefs(state),
      galleryName,
      showImageModal,
    };
  },
};
</script>

<style lang="scss" scoped></style>
