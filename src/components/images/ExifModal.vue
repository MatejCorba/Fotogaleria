<template>
  <div class="overlay overlay-on" @click="closeExif"></div>

  <section class="center-exif exif-modal">
    <i class="fas fa-times close"></i>
    <h1 class="exif-headline">EXIF</h1>
    <p class="exif-info">
        <pre>{{ exifData }}</pre>
    </p>
  </section>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
      exifData: {
          type: Object,
      },
  },
  setup() {
    const store = useStore()
    const state = reactive({
      count: 0,
    });

    const closeExif = () => {
        store.dispatch("images/changeExifVisibility")
    }

    return {
      ...toRefs(state),
      closeExif
    };
    
  },
};
</script>

<style lang="scss" scoped></style>
