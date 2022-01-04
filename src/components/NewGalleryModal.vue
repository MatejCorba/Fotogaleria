<template>
  <div class="overlay overlay-on"></div>
  <section class="center modal">
    <i class="fas fa-times close" @click="galleryModalClosed"></i>
    <h1 class="add">PRIDAJ KATEGÓRIU</h1>
    <input
      class="input-gallery-name"
      type="text"
      placeholder="Zadaj názov kategórie"
      v-model="inputText"
    />
    <button class="add-btn"><i class="fas fa-plus"></i> Pridať</button>
    <hr class="hr-galleries" />
  </section>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    const galleryModalClosed = () => {
        store.dispatch("galleries/changeModalVisibility")
    }

    return {
      ...toRefs(state),
      galleryModalClosed
    };
  },
};
</script>

<style lang="scss" scoped></style>
