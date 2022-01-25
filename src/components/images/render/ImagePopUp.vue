<template>
  <div>
    <ul class="img_menu menu_on">
      <li @click="deleteImage">
        <a class="option_menu option_menu_hover" href="#"
          ><i class="fas fa-trash"></i> ZMAZAŤ</a
        >
      </li>

      <li>
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

    // Meno galerie
    // id obrazka
    // index obrazka
    const deleteImage = () => {
      const id = images.value[props.imageIndex]._id;
      store.dispatch('images/deleteImage', {
        galleryName: props.name,
        imageIndex: props.imageIndex,
        imageId: id,
      });
      emit('disableOverlay');
    };

    return {
      ...toRefs(state),
      deleteImage,
    };
  },
};
</script>

<style lang="scss" scoped></style>
