<template>
  <div v-for="image in images" :key="image._id" class="images">
    <a :href="config.API_IMAGES_URI(name, image._id)" data-lightbox="Gallery_1">
      <img
        class="img"
        :src="config.API_IMAGES_URI(name, image._id, (preview = true))"
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
import { config } from '../../config/config';
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
  setup() {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    const images = computed(() => store.state.images.images);

    return {
      ...toRefs(state),
      images,
      config,
    };
  },
};
</script>

<style lang="scss" scoped></style>
