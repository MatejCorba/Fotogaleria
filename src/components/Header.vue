<template>
  <div class="bcg"></div>
  <ArrowBack v-if="" />
  <div class="text-block">
    <h1>Fotogaléria</h1>
    <h3>{{ title }}</h3>
  </div>

</template>

<script>
import ArrowBack from "./images/ArrowBack.vue"

export default {
    components: {
      ArrowBack,
    },
    props: {
        title: {
            type: String,
            default: "Kategórie"
        },
    },

}
</script>

