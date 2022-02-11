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
        <GoogleMaps
          v-if="exifData?.longitude && exifData?.latitude"
          :longitude="exifData?.longitude"
          :latitude="exifData?.latitude"
        ></GoogleMaps>
      </p>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import GoogleMaps from './GoogleMaps.vue';

export default {
  components: {
    GoogleMaps,
  },
  props: {
    exifIndex: {
      type: Number,
    },
  },
  setup(props) {
    const store = useStore();

    const closeExif = () => {
      store.dispatch('images/changeExifVisibility');
    };

    const images = computed(() => store.state.images.images);
    const exifData = images.value[props.exifIndex].exif;

    return {
      closeExif,
      exifData,
    };
  },
};
</script>

<style scoped>
.google-gps {
  padding-top: 20px;
}
</style>
