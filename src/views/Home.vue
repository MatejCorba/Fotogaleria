<template>
  <div class="bcg"></div>
  <div class="text-block">
    <h1>Fotogaléria</h1>
    <h3>Kategórie</h3>
  </div>

  <div class="grid-container">
    <Images />
    <AddNewGallery /> 
  </div>

  <footer></footer>
</template>

<script>
import { reactive, toRefs } from 'vue';
import Images from '../components/Images.vue';
import AddNewGallery from "../components/AddNewGallery.vue";

export default {
  components: {
    Images,
    AddNewGallery
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
