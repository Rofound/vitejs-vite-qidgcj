import { createApp } from 'vue';
import { createPinia } from 'pinia';

// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';

// element-plus style
import 'element-plus/theme-chalk/el-table.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
// app.use(ElementPlus);

app.mount('#app');
