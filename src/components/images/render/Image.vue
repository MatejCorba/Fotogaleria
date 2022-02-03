<template>
  <div
    class="images"
    :class="{
      img_selected: image.popUp,
      'hover-effect': !image.popUp && !deleteMenuEnabled,
      scale: image.popUp,
    }"
  >
    <!--Router link zabráni tomu, aby stránka po zmazaní fotografie alebo zobrazení exif neposunula scrollbar smerom hore-->
    <router-link to="">
      <transition name="pop">
        <ImagePopUp
          v-if="image.popUp"
          :name="galleryName"
          :imageIndex="imageIndex"
          @disableOverlay="disableOverlay"
        />
      </transition>
    </router-link>
    <a
      :href="config.API_IMAGES_URI({ gallery: galleryName, id: image._id })"
      data-lightbox="Gallery_1"
      :class="{ 'cursor-default': image.popUp }"
      v-if="!image.popUp && !deleteMenuEnabled"
    >
      <Preview :image="image" :name="galleryName" />
    </a>

    <a
      :class="{
        'cursor-default': image.popUp,
        'cursor-pointer': deleteMenuEnabled,
      }"
      v-else
    >
      <Preview :image="image" :name="galleryName" />
    </a>
  </div>
</template>

<script>
import { computed } from 'vue';
import config from '../../../config/config';
import ImagePopUp from './ImagePopUp.vue';
import Preview from './Preview.vue';
import { useStore } from 'vuex';

export default {
  props: {
    image: {
      type: Object,
    },
    galleryName: {
      type: String,
    },
    imageIndex: {
      type: Number,
    },
  },
  components: {
    ImagePopUp,
    Preview,
  },
  setup(props, { emit }) {
    const store = useStore();

    const deleteMenuEnabled = computed(
      () => store.state.images.showMultiDeleteMenu
    );
    const disableOverlay = () => {
      emit('disableOverlay');
    };

    return {
      config,
      disableOverlay,
      deleteMenuEnabled,
    };
  },
};
</script>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: all 0.1s ease-in;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateX(-25%);
}

.scale {
  transform: scale(1.05);
}

.cursor-default {
  cursor: default;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
