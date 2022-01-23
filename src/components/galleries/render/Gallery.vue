<template>
  <div
    class="gallery"
    :class="{
      gallery_selected: gallery.popUp,
      'gallery-hover-efect': !gallery.popUp,
      scale: gallery.popUp,
    }"
  >
    <!--Vysvetlenie ":to" propu-->
    <!--Pokial je gallery.popUp nie je nastavene na true (nenachazame sa v options menu), tak router bude smerovat do Images componentu-->
    <!--Pokial je gallery.popUp nastaveny na true (nachadzame sa v options menu), tak router nás ani po kliknutí na galériu nikam nepresmeruje -->
    <router-link
      :to="
        !gallery.popUp
          ? { name: `Images`, params: { galleryName: gallery.name } }
          : ''
      "
      style="text-decoration: none; color: inherit"
      :class="{ 'cursor-default': gallery.popUp }"
    >
      <transition name="pop">
        <GalleryPopUp
          v-if="gallery.popUp"
          :galleryIndex="galleryIndex"
          @disableOverlay="disableOverlay"
        />
      </transition>
      <Preview :gallery="gallery" />
      <p class="gallery-name">{{ gallery.name.toUpperCase() }}</p>
    </router-link>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import GalleryPopUp from './GalleryPopUp.vue';
import Preview from './Preview.vue';

export default {
  components: {
    GalleryPopUp,
    Preview,
  },
  props: {
    gallery: {
      type: Object,
    },
    galleryIndex: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      count: 0,
    });

    const disableOverlay = () => {
      emit('disableOverlay');
    };

    return {
      ...toRefs(state),
      disableOverlay,
    };
  },
};
</script>

<style scoped>
.scale {
  transform: scale(1.05);
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.1s ease-in;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateX(-25%);
}

.cursor-default {
  cursor: default;
}
</style>
