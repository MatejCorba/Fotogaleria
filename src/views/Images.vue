<template>
  <Header :title="$route.params.GalleryName.toUpperCase()" />
</template>

<script>
import { reactive, toRefs } from 'vue';
import Header from '../components/Header.vue';

export default {
  components: {
    Header,
  },
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
