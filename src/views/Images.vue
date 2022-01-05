<template>
  <Header :title="galleryName.toUpperCase()" />
</template>

<script>
import { reactive, toRefs, computed } from 'vue';
import Header from '../components/Header.vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    Header,
  },
  setup() {
    const router = useRoute();
    const state = reactive({
      count: 0,
    });

    // Computed properties
    const galleryName = computed(() => router.params.galleryName);

    return {
      ...toRefs(state),
      galleryName,
    };
  },
};
</script>

<style lang="scss" scoped></style>
