<template>
  <div class="overlay overlay-on" @click="closeExif"></div>

  <section class="center-exif exif-modal">
    <i class="fas fa-times close"></i>
    <h1 class="exif-headline">EXIF</h1>
    <p class="exif-info">
      <span v-for="(exif, index) in Object.keys(exifData)" :key="index">
        {{ exif }}: {{ exifData[exif] }} <br />
      </span>
    </p>
  </section>
</template>

<script>
import { onUnmounted, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    exifData: {
      type: Object,
    },
  },
  setup() {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    const closeExif = () => {
      store.dispatch('images/changeExifVisibility');
    };

    onUnmounted(() => {
      store.commit('images/getExifData', {});
    });

    return {
      ...toRefs(state),
      closeExif,
    };
  },
};
</script>

<style lang="scss" scoped></style>
