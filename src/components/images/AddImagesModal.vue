<template>
  <div class="overlay overlay-on" @click="changeModalVisibility"></div>
  <section class="center-add-img add-image-modal">
    <i class="fas fa-times close" @click="changeModalVisibility"></i>
    <h1 class="text-addImg">PRIDAJ FOTKY</h1>
    <div class="drop-images">
      <i class="fas fa-camera"></i>
      <p class="text-center">
        SEM PRESUNTE FOTKY <br />
        alebo
      </p>
      <label class="image-upload-button" for="actual-btn">VYBERTE SÚBORY</label>
    </div>
    <button class="img-btn"><i class="fas fa-plus"></i> Pridať</button>
  </section>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    const changeModalVisibility = () =>
      store.dispatch('images/changeModalVisibility');

    return {
      ...toRefs(state),
      changeModalVisibility
    };

  },
};
</script>

<style lang="scss" scoped></style>
