<template>
  <div class="plus-images">
    <i class="fas fa-plus" @click="changeModalVisibility"></i>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    const changeModalVisibility = () =>
      store.dispatch('images/changeModalVisibility');

    return {
      ...toRefs(state),
      changeModalVisibility,
    };
  },
};
</script>

<style scoped>
.plus-images {
  cursor: pointer;
}
</style>
