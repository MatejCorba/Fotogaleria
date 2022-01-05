<template>
  <div v-for="image in images" :key="image._id" class="images">
    <a :href="`${api_images_uri}${image._id}`" data-lightbox="Gallery_1">
      <img
        class="img"
        :src="`${api_images_uri}${image._id}`"
        :alt="image.name"
        :title="image.name"
      />
    </a>
  </div>

  <NewImageIcon />
</template>

<script>
import { reactive, toRefs, computed } from 'vue';
import NewImageIcon from './NewImageIcon.vue';
import { config } from '../../config';
import { useStore } from 'vuex';

export default {
  components: {
    NewImageIcon,
  },

  props: {
    name: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    const images = computed(() => store.state.images.images);

    const api_images_uri = config.API_IMAGES_URI(props.name);

    return {
      ...toRefs(state),
      images,
      api_images_uri,
    };
  },
};
</script>

<style lang="scss" scoped></style>
