<template>
  <div>
    <ul class="img_menu menu_on">
      <li @click="deleteImage">
        <a class="option_menu option_menu_hover" href="#"
          ><i class="fas fa-trash"></i> ZMAZAŤ</a
        >
      </li>

      <li @click="showExifModal">
        <a class="option_menu option_menu_hover" href="#">
          <i class="fas fa-info"></i> ZOBRAZIŤ EXIF</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    name: {
      type: String,
    },
    imageIndex: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    const images = computed(() => store.state.images.images);
    const id = images.value[props.imageIndex]._id;

    const deleteImage = () => {
      store.dispatch('images/deleteImage', {
        galleryName: props.name,
        imageIndex: props.imageIndex,
        imageId: id,
      });
      emit('disableOverlay');
    };

    const showExifModal = () => {
      emit('disableOverlay');
      // Zistime exif udaje obrazka
      store.dispatch('images/getExifData', {
        galleryName: props.name,
        imageId: id,
      });

      // Zobrazime exif modal
      store.dispatch('images/changeExifVisibility');
      setTimeout(() => {
        store.dispatch('images/closePopUp', props.imageIndex);
      }, 2);

      // Po zobrazeni modalu vyresetujeme exif data
      setTimeout(() => {
        store.commit('images/getExifData', {});
      }, 4);
    };

    return {
      ...toRefs(state),
      deleteImage,
      showExifModal,
    };
  },
};
</script>

<style lang="scss" scoped></style>
