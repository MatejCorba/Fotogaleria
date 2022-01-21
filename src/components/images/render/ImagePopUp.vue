<template>
  <div>
    <ul class="img_menu menu_on">
      <li>
        <a class="option_menu option_menu_hover" href="#"
          ><i class="fas fa-trash"></i> ZMAZAŤ</a
        >
      </li>

      <li>
        <a class="option_menu option_menu_hover" href="#">
          <i class="fas fa-info"></i> ZOBRAZIŤ EXIF</a
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

<style lang="scss" scoped></style>
