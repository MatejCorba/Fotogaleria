<template>
  <div class="overlay overlay-on" @click="galleryModalClosed"></div>

  <section class="center modal">
    <i class="fas fa-times close" @click="galleryModalClosed"></i>
    <h1 class="add">PRIDAJ KATEGÓRIU</h1>
    <input
      ref="input"
      class="input-gallery-name"
      type="text"
      placeholder="Zadaj názov kategórie"
      v-model="inputText"
      @keyup.enter="newGalleryAdded"
      @input="inputToUpperCase"
    />
    <button class="add-btn" @click="newGalleryAdded">
      <i class="fas fa-plus"></i> Pridať
    </button>
    <hr class="hr-galleries" />
  </section>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const input = ref(null);
    const store = useStore();
    const state = reactive({
      inputText: '',
    });

    const galleryModalClosed = () => {
      store.dispatch('galleries/changeModalVisibility');
    };

    const newGalleryAdded = () => {
      store.dispatch('galleries/addNewGallery', state.inputText);
      store.dispatch('galleries/changeModalVisibility');
    };

    const setCursorPosition = () => {
      input.value.focus();
    };

    const inputToUpperCase = () => {
      state.inputText = state.inputText.toUpperCase();
    };

    onMounted(() => {
      setCursorPosition();
    });

    return {
      ...toRefs(state),
      galleryModalClosed,
      newGalleryAdded,
      inputToUpperCase,
      input,
    };
  },
};
</script>
