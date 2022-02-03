<template>
  <div class="plus" @click="plusIconClicked">
    <i class="fas fa-plus"></i>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const plusIconClicked = () =>
      store.dispatch(`galleries/changeModalVisibility`);

    return {
      plusIconClicked,
    };
  },
};
</script>

<style scoped>
.plus {
  cursor: pointer;
}
</style>
