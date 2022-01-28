<template>
  <div class="overlay overlay-on" @click="closeExif"></div>

  <section class="center-exif">
    <i class="fas fa-times exif-close" @click="closeExif"></i>
    <div class="exif-overflow exif-modal">
      <h1 class="exif-headline">EXIF</h1>
      <p class="exif-info">
        <span v-for="(exif, index) in Object.keys(exifData)" :key="index">
          {{ exif }}: {{ exifData[exif] }} <br />
        </span>
      </p>
    </div>
  </section>
</template>

<script>
import { reactive, toRefs, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    exifIndex: {
      type: Number,
    },
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      count: 0,
    });

    const closeExif = () => {
      store.dispatch('images/changeExifVisibility');
    };

    const images = computed(() => store.state.images.images);
    const exifData = images.value[props.exifIndex].exif;

    return {
      ...toRefs(state),
      closeExif,
      exifData,
    };
  },
};
</script>

<style lang="scss" scoped></style>
