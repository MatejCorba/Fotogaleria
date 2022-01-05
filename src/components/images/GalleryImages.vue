<template>
    <div class="images">
      <img class="img" src="obrazky/car.jpg" alt="gallery_name" title="name" />
    </div>
    <div class="images">
      <img
        class="img"
        src="obrazky/house.jpg"
        alt="gallery_name"
        title="name"
      />
    </div>

    <div class="images">
      <img class="img" src="obrazky/food.jpg" alt="gallery_name" title="name" />
    </div>

    <div class="images">
      <img
        class="img"
        src="obrazky/phone.jpg"
        alt="gallery_name"
        title="name"
      />
    </div>

    <div class="images">
      <img
        class="img"
        src="obrazky/back1.jpg"
        alt="gallery_name"
        title="name"
      />
    </div>

    <NewImageIcon />
  
</template>

<script>
import { reactive, toRefs } from 'vue';
import NewImageIcon from './NewImageIcon.vue';

export default {
  components: {
    NewImageIcon,
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
