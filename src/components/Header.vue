<template>
  <div class="bcg"></div>
  <div class="text-block">
    <h1>Fotogaléria</h1>
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Kategórie',
    },
  },
};
</script>
