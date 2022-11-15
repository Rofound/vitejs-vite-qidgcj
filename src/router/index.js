import { createRouter, createWebHistory } from 'vue-router';
import HiddenDangerRectification from '../components/HiddenDangerRectification.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HiddenDangerRectification,
    },
  ],
});

export default router;
