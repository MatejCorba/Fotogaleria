import { createStore } from 'vuex';
import { inject, provide } from 'vue';
import galleries from './galleries';
import images from './images';

const StoreSymbol = Symbol('vuex-store');

export function _createStore() {
  return createStore({
    modules: {
      galleries: galleries,
      images: images,
    },
  });
}

export function provideStore(store) {
  provide(StoreSymbol, store);
}

export default function useStore() {
  const store = inject(StoreSymbol);
  if (!store) {
    throw Error('no store provided');
  }
  return store;
}
