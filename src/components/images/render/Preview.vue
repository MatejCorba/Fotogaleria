<template>
  <img
    class="img"
    :src="
      config.API_IMAGES_URI({
        gallery: name,
        id: image._id,
        preview: true,
      })
    "
    :alt="image.name"
    :title="image.name"
  />
</template>

<script>
import { reactive, toRefs } from 'vue';
import config from '../../../config/config';

export default {
  props: {
    image: {
      type: Object,
    },
    name: {
      type: String,
    },
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

<style lang="scss" scoped></style>
