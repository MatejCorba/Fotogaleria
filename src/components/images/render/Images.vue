<template>
  <Image
    @contextmenu.prevent="showPopUp"
    v-for="image in images"
    :key="image._id"
    :id="image._id"
    :image="image"
    :name="name"
  />

  <NewImageIcon />
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

export default {
  components: {
    NewImageIcon,
    Image,
  },

  props: {
    name: {
      type: String,
    },
  },
  setup() {
    const store = useStore();
    const state = reactive({
      imageIndex: 0,
      showOverlay: false,
    });

    const images = computed(() => store.state.images.images);

    const showPopUp = (event) => {
      state.showOverlay = true;
      let clicked_id = event.currentTarget.id;
      state.imageIndex = images.value.findIndex(
        (gallery) => gallery._id === clicked_id
      );

      store.dispatch('images/showPopUp', state.imageIndex);
    };

    const closePopUp = () => {
      state.showOverlay = false;
      store.dispatch('images/closePopUp', state.imageIndex);
    };

    return {
      ...toRefs(state),
      images,
      showPopUp,
      closePopUp,
    };
  },
};
</script>

<style lang="scss" scoped></style>
