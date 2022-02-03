const {
  createRouter,
  createMemoryHistory,
  createWebHistory,
} = require('vue-router');

import Home from '../views/Home';
import Images from '../views/Images';


const isServer = typeof window === 'undefined';

let history = isServer ? createMemoryHistory() : createWebHistory();

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // Dynamic route
  // Máme iba jeden route ktorý linkuje na všetko (), posielame mu parameter (:id) a na základe neho sa sám (dynamicky) vygeneruje
  {
    path: '/:pathMatch(.)*/:galleryName',
    name: 'Images',
    component: Images,
    props: true
  },
];

export default function () {
  return createRouter({ routes, history });
}
