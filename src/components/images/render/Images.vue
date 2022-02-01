<template>
  <Image
    @contextmenu.prevent="showPopUp"
    @click="markDeleteCheckbox"
    @disableOverlay="disableOverlay"
    v-for="image in images"
    :key="image._id"
    :id="image._id"
    :image="image"
    :galleryName="galleryName"
    :imageIndex="imageIndex"
  />

  <NewImageIcon />
  <DeleteMenuButtons :galleryName="galleryName" />
  <div
    v-if="showOverlay"
    class="overlay_menu overlay-on"
    @click="closePopUp"
  ></div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue';
import NewImageIcon from '../NewImageIcon.vue';
import { useStore } from 'vuex';
import Image from './Image.vue';
import DeleteMenuButtons from '../DeleteMenuButtons.vue';

export default {
  components: {
    NewImageIcon,
    Image,
    DeleteMenuButtons,
  },

  props: {
    galleryName: {
      type: String,
    },
  },
  setup() {
    const store = useStore();
    const state = reactive({
      imageIndex: 0,
      showOverlay: false,
    });

    // Computed props
    const deleteMenuEnabled = computed(
      () => store.state.images.showMultiDeleteMenu
    );
    const images = computed(() => store.state.images.images);

    const showPopUp = (event) => {
      state.showOverlay = true;
      let clicked_id = event.currentTarget.id;
      state.imageIndex = images.value.findIndex(
        (gallery) => gallery._id === clicked_id
      );

      store.dispatch('images/showPopUp', state.imageIndex);
    };

    const markDeleteCheckbox = (event) => {
      if (!deleteMenuEnabled.value) return;
      const clicked_id = event.currentTarget.id;
      const imageIndex = images.value.findIndex(
        (gallery) => gallery._id === clicked_id
      );

      store.dispatch('images/markDeleteCheckbox', imageIndex);
    };

    const closePopUp = () => {
      state.showOverlay = false;
      store.dispatch('images/closePopUp', state.imageIndex);
    };

    const disableOverlay = () => {
      state.showOverlay = false;
    };

    return {
      ...toRefs(state),
      images,
      showPopUp,
      closePopUp,
      disableOverlay,
      markDeleteCheckbox,
    };
  },
};
</script>

<style lang="scss" scoped></style>
