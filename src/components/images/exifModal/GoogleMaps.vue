<template>
  <iframe
    width="90%"
    class="google-gps"
    frameborder="0"
    scrolling="no"
    marginheight="0"
    marginwidth="0"
    loading="lazy"
    :src="`https://maps.google.com/maps?q=${latitude},${longitude}&hl=sk&z=14&amp;output=embed`"
  >
  </iframe>
</template>

<script>
export default {
  props: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
};
</script>

<style scoped>
.google-gps {
  padding-top: 20px;
}
</style>
