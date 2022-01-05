<template>
  <div v-for="image in images" :key="image._id" class="images">
    <img
      class="img"
      :src="`${config.API_IMAGES_URI(name)}${image._id}`"
      :alt="image.name"
      :title="image.name"
    />
  </div>

  <NewImageIcon />
</template>

<script>
import { reactive, toRefs, computed} from 'vue';
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
  setup() {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    const images = computed(() => {
      return store.state.images.images;
    });

    return {
      ...toRefs(state),
      config,
      images,
    };
  },
};
</script>

<style lang="scss" scoped></style>
