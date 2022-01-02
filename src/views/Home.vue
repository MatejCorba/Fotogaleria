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
import { reactive, toRefs, onMounted } from 'vue';
import { useStore } from 'vuex'
import Images from '../components/Images.vue';
import AddNewGallery from "../components/AddNewGallery.vue";

export default {
  components: {
    Images,
    AddNewGallery
  },
  setup() {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    onMounted(() => {
        store.dispatch("getGalleriesFromAPI");
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
