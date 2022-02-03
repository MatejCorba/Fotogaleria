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
  <div v-if="deleteMenuEnabled">
    <img
      src="img/Checkbox-filled.png"
      class="checkbox"
      v-if="image.checkboxMarked"
    />
    <img src="img/Checkbox.png" class="checkbox" v-else />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
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
    const store = useStore();

    const deleteMenuEnabled = computed(
      () => store.state.images.showMultiDeleteMenu
    );

    return {
      config,
      deleteMenuEnabled,
    };
  },
};
</script>

<style scoped>
.checkbox {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 25px;
  height: 25px;
}
</style>
