<template>
  <div
    class="images"
    :class="{
      img_selected: image.popUp,
      images_hover_effect: !image.popUp,
      scale: image.popUp,
    }"
  >
    <transition name="pop">
      <ImagePopUp v-if="image.popUp" />
    </transition>

    <a :class="{ 'cursor-default': image.popUp }" v-if="image.popUp">
      <Preview :image="image" :name="name" />
    </a>

    <a
      :href="config.API_IMAGES_URI({ gallery: name, id: image._id })"
      data-lightbox="Gallery_1"
      :class="{ 'cursor-default': image.popUp }"
      v-if="!image.popUp"
    >
      <Preview :image="image" :name="name" />
    </a>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import config from '../../../config/config';
import ImagePopUp from './ImagePopUp.vue';
import Preview from './Preview.vue';

export default {
  props: {
    image: {
      type: Object,
    },
    name: {
      type: String,
    },
  },
  components: {
    ImagePopUp,
    Preview,
  },
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
      config,
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
</style>
