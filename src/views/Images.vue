<template>
  <Header :title="galleryName.toUpperCase()" />
  <ArrowBack />
  <div class="images-container">
    <Images :galleryName="galleryName" />
  </div>
  <AddImagesModal v-if="showImageModal" :galleryName="galleryName" />
  <ExifModal v-if="showExifModal" :exifData="exif"/>
</template>

<script>
import { reactive, toRefs, computed, onMounted, onUnmounted } from 'vue';
import Header from '../components/Header.vue';
import { useRoute } from 'vue-router';
import Images from '../components/images/render/Images.vue';
import { useStore } from 'vuex';
import ArrowBack from '../components/images/ArrowBack.vue';
import AddImagesModal from '../components/images/addImagesModal/AddImagesModal.vue';
import ExifModal from '../components/images/ExifModal.vue';

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
    const state = reactive({
      count: 0,
    });

    // Computed properties
    const galleryName = computed(() => router.params.galleryName).value;
    const showImageModal = computed(() => store.state.images.showImageModal);
    const showExifModal = computed(() => store.state.images.showExifModal);
    const exif = computed(() => store.state.images.exif);

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
      showExifModal,
      exif
    };
  },
};
</script>

<style lang="scss" scoped></style>
