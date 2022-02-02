<template>
  <div
    class="gallery"
    :class="{
      gallery_selected: gallery.popUp,
      'gallery-hover-efect': !gallery.popUp,
      scale: gallery.popUp,
      'gallery-hovered': gallery.hovered,
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
      <div v-if="!gallery.popUp">
        <p class="gallery-name">
          {{ gallery.name.toUpperCase() }}
        </p>
        <span v-if="isGalleryHovered">Počet obrázkov: {{ imageNumber }}</span>
      </div>

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
import { reactive, ref, toRefs, computed, watch } from 'vue';
import GalleryPopUp from './GalleryPopUp.vue';
import Preview from './Preview.vue';
import { useStore } from 'vuex';
import axios from 'axios';
import config from '../../../config/config';

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
      imageNumber: 0,
      isGalleryHovered: false,
    });

    const disableOverlay = () => {
      emit('disableOverlay');
    };

    // Computed properties
    const galleries = computed(() => store.state.galleries.galleries);
    name;

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
    const galleryHovered = () => {
      setTimeout(() => {
        // Pockame 120ms, kym sa skonci animacia zvacsovania sa a az tak vypiseme pocet obrazkov
        state.isGalleryHovered = props.gallery.hovered;
      }, 120);
    };

    watch(
      () => props.gallery?.hovered,
      async () => {
        if (props.gallery?.hovered) {
          const response = await axios.get(
            config.API_IMAGES_URI({ gallery: props.gallery.name })
          );
          state.imageNumber = response.data.length;
        }
        galleryHovered();
      }
    );

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
span {
  padding: 0;
  margin: 0;
  bottom: 5px;
  position: relative;
  color: gray;
  font-size: 17px;
}
p {
  padding: 0;
  margin: 0;
  bottom: 0px;
  position: relative;
}
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
.gallery-hovered {
  height: 310px;
}
</style>
