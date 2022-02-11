<template>
  <Header :title="galleryName.toUpperCase()" />
  <ArrowBack />
  <div class="images-container">
    <Images :galleryName="galleryName" />
  </div>
  <AddImagesModal v-if="showImageModal" :galleryName="galleryName" />
  <ExifModal v-if="showExifModal" :exifIndex="exifIndex" />
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';
import Header from '../components/Header.vue';
import { useRoute } from 'vue-router';
import Images from '../components/images/render/Images.vue';
import { useStore } from 'vuex';
import ArrowBack from '../components/images/ArrowBack.vue';
import AddImagesModal from '../components/images/addImagesModal/AddImagesModal.vue';
import ExifModal from '../components/images/exifModal/ExifModal.vue';

export default {
  components: {
    Header,
    Images,
    ArrowBack,
    AddImagesModal,
    ExifModal,
  },
  setup() {
    const store = useStore();
    const router = useRoute();

    // Computed properties
    const galleryName = computed(() => router.params.galleryName).value;
    const showImageModal = computed(() => store.state.images.showImageModal);
    const showExifModal = computed(() => store.state.images.showExifModal);
    const exifIndex = computed(() => store.state.images.exifIndex);

    onMounted(() => {
      store.dispatch('images/getImagesFromAPI', galleryName);
    });

    onUnmounted(() => {
      store.state.images.images = [];
    });

    return {
      galleryName,
      showImageModal,
      showExifModal,
      exifIndex,
    };
  },
};
</script>

<style lang="scss" scoped></style>
