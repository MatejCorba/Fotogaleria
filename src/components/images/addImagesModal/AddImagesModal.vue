<template>
  <div class="overlay overlay-on" @click="changeModalVisibility"></div>
  <section class="center-add-img add-image-modal">
    <i class="fas fa-times close" @click="changeModalVisibility"></i>
    <h1 class="text-addImg">PRIDAJ FOTKY</h1>
    <DragDrop :galleryName="galleryName" />
    <button class="img-btn"><i class="fas fa-plus"></i> Pridať</button>
  </section>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import DragDrop from './DragDrop.vue';

export default {
  props: {
    galleryName: {
      type: String,
    },
  },
  components: {
    DragDrop,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    const changeModalVisibility = () =>
      store.dispatch('images/changeModalVisibility');

    return {
      ...toRefs(state),
      changeModalVisibility,
    };
  },
};
</script>

<style lang="scss" scoped></style>
