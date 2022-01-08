<template>
  <div class="drop-images">
    <i class="fas fa-camera"></i>
    <p class="text-center">
      SEM PRESUNTE FOTKY <br />
      alebo
    </p>
    <UploadButton />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import UploadButton from './UploadButton.vue';

export default {
  components: {
    UploadButton,
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
