<template>
  <div class="btn-container">
    <button class="btn-black">
      <i class="fas fa-times btn-close"></i> ZRUŠ VÝBER
    </button>
    <button class="btn-black">
      <i class="fas fa-trash"></i> ZMAZAŤ OBRÁZKY
    </button>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
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
