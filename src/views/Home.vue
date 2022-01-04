<template>
  <Header />

  <div class="grid-container">
    <Galleries />
    <NewGalleryIcon />
  </div>
  <NewGalleryModal v-if="$store.state.galleries.newGalleryClicked" />

  <footer></footer>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import { useStore } from 'vuex';
import Galleries from '../components/Galleries.vue';
import NewGalleryIcon from '../components/NewGalleryIcon.vue';
import Header from '../components/Header.vue';
import NewGalleryModal from '../components/NewGalleryModal.vue';

export default {
  components: {
    Galleries,
    NewGalleryIcon,
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
