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
        <iframe
        width = 90%
        class="google-gps"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ><a href="https://www.gps.ie/golf-gps/">buy golf golf</a></iframe>
      </p>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
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
.google-gps{
  padding-top: 20px;
}
</style>
