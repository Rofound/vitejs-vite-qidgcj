import { createRouter, createWebHashHistory } from 'vue-router';
import HiddenDangerRectification from '../components/HiddenDangerRectification.vue';
import WorkTracking from '../components/WorkTracking.vue';
import SafeCulturePropaganda from '../components/SafeCulturePropaganda.vue';
import EstimationMode from '../components/EstimationMode.vue';
import Chart1 from '../components/Chart1.vue';
import Chart2 from '../components/Chart2.vue';
import Chart3 from '../components/Chart3.vue';
import Chart4 from '../components/Chart4.vue';
import Chart5 from '../components/Chart5.vue';
import Chart6 from '../components/Chart6.vue';
import Chart7 from "../components/Chart7.vue";
import Chart8 from "../components/Chart8.vue";

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
    {
      path: '/8',
      name: 'safeCulturePropaganda',
      meta: {
        title: '',
      },
      component: SafeCulturePropaganda,
    },
    {
      path: '/estimationMode',
      name: 'estimationMode',
      meta: {
        title: '单位安全评估模型',
      },
      component: EstimationMode,
    },
    {
      path: '/chart1',
      name: 'chart1',
      meta: {
        title: '单位安全评估模型',
      },
      component: Chart1,
    },
    {
      path: '/chart2',
      name: 'chart2',
      meta: {
        title: '单位安全评估模型',
      },
      component: Chart2,
    },
    {
      path: '/chart3',
      name: 'chart3',
      meta: {
        title: '单位安全评估模型',
      },
      component: Chart3,
    },
    {
      path: '/chart4',
      name: 'chart4',
      meta: {
        title: '单位安全评估模型',
      },
      component: Chart4,
    },
    {
      path: '/chart5',
      name: 'chart5',
      meta: {
        title: '单位安全评估模型',
      },
      component: Chart5,
    },
    {
      path: '/chart6',
      name: 'chart6',
      meta: {
        title: '单位安全评估模型',
      },
      component: Chart6,
    },
    {
      path: '/chart7',
      name: 'chart7',
      meta: {
        title: '单位安全评估模型',
      },
      component: Chart7,
    },
    {
      path: '/chart8',
      name: 'chart8',
      meta: {
        title: '单位安全评估模型',
      },
      component: Chart8,
    },
  ],
});

export default router;
