<template>
  <div>
    <ul class="menu menu_on">
      <li @click="deleteGallery">
        <a class="option_menu option_menu_hover" href="#"
          ><i class="fas fa-trash"></i> ZMAZAŤ</a
        >
      </li>

      <li @click="changeGalleryName">
        <a class="option_menu option_menu_hover" href="#"
          ><i class="far fa-edit"></i> PREMENOVAŤ</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    galleryIndex: {
      type: Number,
    },
    popUp: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    // Computed properties
    const galleries = computed(() => store.state.galleries.galleries);

    const deleteGallery = () => {
      const id = galleries.value[props.galleryIndex]._id;
      store.dispatch('galleries/deleteGallery', id);
      emit('disableOverlay');
    };
    const changeGalleryName = () => {
      emit('changeGalleryName');
    };

    onMounted(() => {
      if (props.popUp) {
        emit('resetGalleryName');
      }
    });

    return {
      ...toRefs(state),
      deleteGallery,
      changeGalleryName,
    };
  },
};
</script>

<style scoped></style>
