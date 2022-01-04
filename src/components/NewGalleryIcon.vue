<template>
  <div class="plus" @click="plusIconClicked">
    <i class="fas fa-plus"></i>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    const plusIconClicked = () => {
      store.dispatch(`galleries/changeModalVisibility`)
    }


    return {
      ...toRefs(state),
      plusIconClicked
    };
  },
};
</script>

<style scoped>
  .plus {
    cursor: pointer;
  }
</style>
