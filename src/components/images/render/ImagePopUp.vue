<template>
  <ul class="img_menu menu_on">
    <li @click="deleteImage">
      <a class="option_menu option_menu_hover" href="#"
        ><i class="fas fa-trash"></i> ZMAZAŤ</a
      >
    </li>

    <li @click="showExifModal">
      <a class="option_menu option_menu_hover" href="#">
        <i class="fas fa-info"></i> ZOBRAZIŤ EXIF</a
      >
    </li>

    <li @click="setNewPreviewImage">
      <a class="option_menu option_menu_hover" href="#">
        <i class="fas fa-image"></i> NASTAVIŤ AKO NÁHĽAD</a
      >
    </li>
  </ul>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import config from '../../../config/config';

export default {
  props: {
    name: {
      type: String,
    },
    imageIndex: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    const images = computed(() => store.state.images.images);
    const id = images.value[props.imageIndex]._id;

    const deleteImage = () => {
      store.dispatch('images/deleteImage', {
        galleryName: props.name,
        imageIndex: props.imageIndex,
        imageId: id,
      });
      emit('disableOverlay');
    };

    const showExifModal = () => {
      emit('disableOverlay');
      setTimeout(() => {
        store.dispatch('images/closePopUp', props.imageIndex);
      }, 2);

      // Pokial obrazok neobsahuje exif udaje tak posleme alert
      if (images.value[props.imageIndex].exif == null)
        return alert('Obrázok neobsahuje žiadne exif údaje.');

      // Pokial obrazok obsahuje exif udaje, tak ho zobrazime v exif modal

      // tato metoda zmeni viditelnost exif modalu
      store.dispatch('images/changeExifVisibility');

      // tato metoda zapise do VUEX state index galerie, ktorej exif chceme zobrazit
      store.dispatch('images/setExifIndex', props.imageIndex);
    };

    const setNewPreviewImage = async () => {
      try {
        await axios.put(
          config.API_IMAGES_URI({
            gallery: props.name,
            id: id,
          })
        );
      } catch (error) {
        console.error(error);
        alert('Náhľadový obrázok sa nepodarlilo nastaviť.');
      }

      store.dispatch('images/closePopUp', props.imageIndex);
      emit('disableOverlay');
    };

    onMounted(() => console.log('hi'));

    return {
      deleteImage,
      showExifModal,
      setNewPreviewImage,
    };
  },
};
</script>
