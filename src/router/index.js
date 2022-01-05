import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home';
import Images from '../views/Images';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // Dynamic route
  // Máme iba jeden route ktorý linkuje na všetko (), posielame mu parameter (:id) a na základe neho sa sám (dynamicky) vygeneruje
  {
    path: '/:pathMatch(.)*/:GalleryName',
    name: 'Images',
    component: Images,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
