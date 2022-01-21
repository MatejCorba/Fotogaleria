<template>
  <div>
    <ul class="menu menu_on">
      <li>
        <a class="option_menu option_menu_hover" href="#"
          ><i class="fas fa-trash"></i> ZMAZAŤ</a
        >
      </li>

      <li>
        <a class="option_menu option_menu_hover" href="#"
          ><i class="far fa-edit"></i> PREMENOVAŤ</a
        >
      </li>
    </ul>
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

<style scoped></style>
