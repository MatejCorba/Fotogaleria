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
          :popUp="gallery.popUp"
          v-if="gallery.popUp"
          :galleryIndex="galleryIndex"
          @disableOverlay="disableOverlay"
          @changeGalleryName="changeGalleryName"
          @popUpEnabled="
            resetGalleryName();
            setCursorPosition();
          "
        />
      </transition>
      <Preview :gallery="gallery" />
      <p v-if="!gallery.popUp" class="gallery-name">
        {{ gallery.name.toUpperCase() }}
      </p>
      <input
        ref="input"
        v-model="inputValue"
        @keyup.enter="changeGalleryName"
        @input="inputToUpperCase"
        type="text"
        v-if="gallery.popUp"
        class="gallery-name input"
      />
    </router-link>
  </div>
</template>

<script>
import { reactive, ref, toRefs, computed } from 'vue';
import GalleryPopUp from './GalleryPopUp.vue';
import Preview from './Preview.vue';
import { useStore } from 'vuex';

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
    const input = ref(null);
    const store = useStore();
    const state = reactive({
      inputValue: props.gallery.name,
    });

    const disableOverlay = () => {
      emit('disableOverlay');
    };

    // Computed properties
    const galleries = computed(() => store.state.galleries.galleries);

    const changeGalleryName = () => {
      const id = galleries.value[props.galleryIndex]._id;
      // Premenovat galeriu v API
      // Prfemenovat galeriu v poli (vuex)
      store.dispatch('galleries/changeGalleryName', {
        newName: state.inputValue,
        id: id,
        index: props.galleryIndex,
      });
      // Zavrieť popUp
      setTimeout(() => {
        store.dispatch('galleries/closePopUp', props.galleryIndex);
      }, 2);

      // Zavriet overlay
      disableOverlay();
    };

    const resetGalleryName = () => {
      state.inputValue = props.gallery.name;
    };

    const inputToUpperCase = () => {
      state.inputValue = state.inputValue.toUpperCase();
    };

    const setCursorPosition = () => {
      input.value.focus();
      setTimeout(() => {
        input.value.select();
      }, 2);
    };

    return {
      ...toRefs(state),
      disableOverlay,
      changeGalleryName,
      resetGalleryName,
      inputToUpperCase,
      setCursorPosition,
      input,
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

.input {
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  font: 0.9em/1.5em 'handwriting', sans-serif;
  border: none;
  padding: 0 10px;
  margin: 0;
  width: 240px;
  background: none;
}
</style>
