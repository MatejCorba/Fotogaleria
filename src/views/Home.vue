<template>
  <Header />

  <div class="grid-container">
    <Galleries />
    <AddNewGallery />
  </div>
  <NewGalleryModal v-if="$store.state.galleries.newGalleryClicked" />

  <footer></footer>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import { useStore } from 'vuex';
import Galleries from '../components/Galleries.vue';
import AddNewGallery from '../components/AddNewGallery.vue';
import Header from '../components/Header.vue';
import NewGalleryModal from '../components/NewGalleryModal.vue';

export default {
  components: {
    Galleries,
    AddNewGallery,
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

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
