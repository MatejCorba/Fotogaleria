<template>
  <div class="plus-images" :class="{ 'cusor-pointer': !deleteMenuEnabled }">
    <i class="fas fa-plus" @click="changeModalVisibility"></i>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    // Computed props
    const deleteMenuEnabled = computed(
      () => store.state.images.showMultiDeleteMenu
    );

    const changeModalVisibility = () => {
      if (deleteMenuEnabled.value) return;
      store.dispatch('images/changeModalVisibility');
    };

    return {
      changeModalVisibility,
      deleteMenuEnabled,
    };
  },
};
</script>

<style scoped>
.cusor-pointer {
  cursor: pointer;
}
</style>
