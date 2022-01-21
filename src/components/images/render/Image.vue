<template>
  <div class="images images_hover_effect">
    <a
      :href="config.API_IMAGES_URI({ gallery: name, id: image._id })"
      data-lightbox="Gallery_1"
    >
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
    </a>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import config from '../../../config/config';

export default {
  props: {
      image: {
          type: Object, 
      },
      name:{
          type: String,
      }
  },
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
      config
    };
  },
};
</script>

<style lang="scss" scoped></style>
