<template>
  <Header />
  
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
import Header from "../components/Header.vue";

export default {
  components: {
    Images,
    AddNewGallery,
    Header
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
