<template>
  <div class="btn-container">
    <button
      class="btn-black"
      v-if="deleteButtonClicked"
      @click="closeDeleteMenu"
    >
      <i class="fas fa-times btn-close"></i> ZRUŠ VÝBER
    </button>

    <button
      class="btn-black"
      @click="showDeleteMenu"
      v-if="!deleteButtonClicked"
    >
      <i class="fas fa-trash"></i> VYBRAŤ OBRǍZKY
    </button>

    <button v-else class="btn-black" @click="deteteMarkedImages">
      <i class="fas fa-trash"></i> ZMAZAŤ
    </button>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    galleryName: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      count: 0,
      deleteButtonClicked: false,
    });

    // Computed props
    const images = computed(() => store.state.images.images);

    const showDeleteMenu = () => {
      state.deleteButtonClicked = true;
      store.dispatch('images/changeDeleteMenuVisibility');
    };

    const closeDeleteMenu = () => {
      state.deleteButtonClicked = false;
      store.dispatch('images/changeDeleteMenuVisibility');
      for (let image of images.value) {
        if (image.checkboxMarked)
          store.dispatch(
            'images/markDeleteCheckbox',
            images.value.indexOf(image)
          );
      }
    };

    const deteteMarkedImages = () => {
      const imagesToDelete = images.value.filter(
        (image) => image.checkboxMarked
      );
      store.dispatch('images/deleteMultipleImages', {
        galleryName: props.galleryName,
        images: imagesToDelete,
      });
      state.deleteButtonClicked = false;
      store.dispatch('images/changeDeleteMenuVisibility');
    };

    onUnmounted(() => closeDeleteMenu());

    return {
      ...toRefs(state),
      showDeleteMenu,
      closeDeleteMenu,
      deteteMarkedImages,
    };
  },
};
</script>
