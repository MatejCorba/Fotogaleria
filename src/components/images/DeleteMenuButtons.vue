<template>
  <div class="btn-container">
    <button
      class="btn-black"
      v-if="deleteButtonClicked"
      @click="closeDeleteMenu"
    >
      <i class="fas fa-times btn-close"></i> ZRUŠ VÝBER
    </button>
    <button class="btn-black" @click="showDeleteMenu">
      <i class="fas fa-trash"></i> {{ deleteButtonText }}
    </button>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const state = reactive({
      count: 0,
      deleteButtonClicked: false,
      deleteButtonText: 'ZMAZAŤ OBRÁZKY',
    });

    // Computed props
    const images = computed(() => store.state.images.images);

    const showDeleteMenu = () => {
      state.deleteButtonClicked = true;
      state.deleteButtonText = 'ZMAZAŤ';
      store.dispatch('images/changeDeleteMenuVisibility');
    };

    const closeDeleteMenu = () => {
      state.deleteButtonClicked = false;
      state.deleteButtonText = 'ZMAZAŤ OBRÁZKY';
      store.dispatch('images/changeDeleteMenuVisibility');
      for (let image of images.value) {
        if (image.checkboxMarked) {
          store.dispatch(
            'images/markDeleteCheckbox',
            images.value.indexOf(image)
          );
        }
      }
    };

    return {
      ...toRefs(state),
      showDeleteMenu,
      closeDeleteMenu,
    };
  },
};
</script>

<style lang="scss" scoped></style>
