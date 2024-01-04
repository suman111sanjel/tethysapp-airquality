import { createApp } from "vue";
import current from "./views/current.vue";
import store from "./store/modules/current";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(current);
app.use(store);
app.use(ElementPlus);
app.mount('#app');
