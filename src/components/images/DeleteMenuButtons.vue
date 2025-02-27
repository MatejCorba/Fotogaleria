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
      v-if="!deleteButtonClicked && !popUpEnabled && !exifModalEnabled"
    >
      <i class="fas fa-trash"></i> VYBRAŤ OBRÁZKY
    </button>

    <button
      v-if="deleteButtonClicked"
      class="btn-black"
      @click="deteteMarkedImages"
    >
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
    imageIndex: {
      type: Number,
    },
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      deleteButtonClicked: false,
    });

    // Computed props
    const images = computed(() => store.state.images.images);
    const popUpEnabled = computed(
      // "?." => Optional chaining operator
      () => store.state.images.images[props.imageIndex]?.popUp
    );
    const exifModalEnabled = computed(() => store.state.images.showExifModal);

    const showDeleteMenu = () => {
      if (popUpEnabled.value) return;
      state.deleteButtonClicked = true;
      store.dispatch('images/enableDeleteMenu');
    };

    const closeDeleteMenu = () => {
      state.deleteButtonClicked = false;
      store.dispatch('images/disableDeleteMenu');
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
      store.dispatch('images/disableDeleteMenu');
    };

    onUnmounted(() => closeDeleteMenu());

    return {
      ...toRefs(state),
      showDeleteMenu,
      closeDeleteMenu,
      deteteMarkedImages,
      popUpEnabled,
      exifModalEnabled,
    };
  },
};
</script>
