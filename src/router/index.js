import { createRouter, createWebHashHistory } from 'vue-router';
import HiddenDangerRectification from '../components/HiddenDangerRectification.vue';
import WorkTracking from '../components/WorkTracking.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/6',
      name: 'home',
      meta: {
        title: '六、隐患整改',
      },
      component: HiddenDangerRectification,
    },
    {
      path: '/7',
      name: 'WorkTracking',
      meta: {
        title: '七、重点/专项/重大隐患工作跟踪',
      },
      component: WorkTracking,
    },
  ],
});

export default router;
