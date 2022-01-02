<template>
  <div
    v-for="image in $store.getters.getImages"
    :key="image.id"
    class="gallery gallery-hover-efect"
  >
    <img
      class="img-gallery"
      :src="image.path"
      :alt="image.name"
      :title="image.name"
    />
    <p class="gallery-name">{{ image.name }}</p>
  </div>

</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
