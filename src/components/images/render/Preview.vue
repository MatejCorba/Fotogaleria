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
      src="images/Checkbox-filled.png"
      class="checkbox"
      v-if="image.checkboxMarked"
    />
    <img src="images/Checkbox.png" class="checkbox" v-else />
  </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue';
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
    const state = reactive({
      count: 0,
    });

    const deleteMenuEnabled = computed(
      () => store.state.images.showMultiDeleteMenu
    );

    return {
      ...toRefs(state),
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
