<template>
  <Header />

  <div class="grid-container">
    <Galleries />
  </div>
  <NewGalleryModal v-if="showGalleryModal" />

  <footer></footer>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import Galleries from '../components/galleries/Galleries.vue';
import Header from '../components/Header.vue';
import NewGalleryModal from '../components/galleries/NewGalleryModal.vue';

export default {
  components: {
    Galleries,
    Header,
    NewGalleryModal,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    onMounted(() => {
      store.dispatch('galleries/getGalleriesFromAPI');
    });

    // Computed properties
    const showGalleryModal = computed(
      () => store.state.galleries.showGalleryModal
    );

    return {
      ...toRefs(state),
      showGalleryModal,
    };
  },
};
</script>

<style lang="scss" scoped></style>
