import { createSSRApp, createApp, h } from 'vue';
import isSSR from '@/_base/isSSR'
import App from './App.vue';
import createRouter from './router';
import * as nativeStore from './store/useNativeStore';
import * as vuexStore from './store/useVuexStore';

// Hlavne css
import './css/main.css';

// Modals
import './css/addNewGallery.css';
import './css/addNewImage.css';
import './css/exif.css';

// PopUps
import './css/menu_gallery.css';
import './css/menu_images.css';


export default function (args) {
  const rootComponent = {
    render: () => h(App),
    components: { App },
    setup() {
      nativeStore.provideStore(args.nativeStore)
      vuexStore.provideStore(args.vuexStore)
    }
  }

  const app = (isSSR ? createSSRApp : createApp)(rootComponent);

  const router = createRouter();

  app.use(router);
  app.use(args.vuexStore);

  return {
    app,
    router,
  };
}

