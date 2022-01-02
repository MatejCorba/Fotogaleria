<template>
    <div class="bcg"></div>
    <div class="text-block">
    <h1>Fotogaléria</h1>
    <h3>Kategórie</h3>
    </div>

    <div class="grid-container">

        <div class="gallery gallery-hover-efect">
            <img class="img-gallery" src="obrazky/car.jpg" alt="gallery_name" title="name">
            <p class="gallery-name" >Auta</p>
        </div>


        <div class="gallery gallery-hover-efect">
            <img class="img-gallery" src="obrazky/house.jpg" alt="gallery_name" title="name">
            <p class="gallery-name" >Dom</p>
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

        <div class="plus">
            <i class="fas fa-plus"></i>
        </div>
    </div>

<footer></footer>
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