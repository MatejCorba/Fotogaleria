<template>
  <Image 
  v-for="image in images" 
  :key="image._id"
  :image="image" 
  :name="name"
  />

  <NewImageIcon />
</template>

<script>
import { reactive, toRefs, computed } from 'vue';
import NewImageIcon from '../NewImageIcon.vue';
import { useStore } from 'vuex';
import Image from "./Image.vue";

export default {
  components: {
    NewImageIcon,
    Image,
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
    };
  },
};
</script>

<style lang="scss" scoped></style>
