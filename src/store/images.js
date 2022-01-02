export const images = {
  state: () => ({
    galleries: [
      {
        id: 1,
        path: 'obrazky/car.jpg',
        name: 'Auta',
      },
      {
        id: 2,
        path: 'obrazky/house.jpg',
        name: 'Dom',
      },

      {
        id: 3,
        path: 'obrazky/food.jpg',
        name: 'Jedlo',
      },

      {
        id: 4,
        path: 'obrazky/phone.jpg',
        name: 'Mobil',
      },

      {
        id: 5,
        path: 'obrazky/back1.jpg',
        name: 'Foto',
      },
    ],
  }),

  mutations: {},
  actions: {},
  getters: {
    getImages(state) {
      return state.galleries;
    },
  },
};
