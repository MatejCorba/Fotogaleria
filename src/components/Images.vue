<template>
    <div class="gallery gallery-hover-efect">
        <img class="img-gallery" src="obrazky/car.jpg" alt="gallery_name" title="name">
        <p class="gallery-name" >Auta</p>
    </div>


    <div class="gallery gallery-hover-efect">
        <img class="img-gallery" src="obrazky/house.jpg" alt="gallery_name" title="name">
        <p class="gall ery-name" >Dom</p>
    </div>

    <div class="gallery gallery-hover-efect">
        <img class="img-gallery" src="obrazky/food.jpg" alt="gallery_name" title="name">
        <p class="gallery-name" >Jedlo</p>
    </div>

    <div class="gallery gallery-hover-efect">
        <img class="img-gallery" src="obrazky/phone.jpg" alt="gallery_name" title="name">
        <p class="gallery-name">Mobil</p>
    </div>

    <div class="gallery gallery-hover-efect">
        <img class="img-gallery" src="obrazky/back1.jpg" alt="gallery_name" title="name">
        <p class="gallery-name">Foto</p>
    </div>

</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
        }
    }
}
</script>

<style lang="scss" scoped>

</style>