import { createApp } from "vue";
import emission from "./views/airquality.vue";
import store from "./store/modules/airquality";
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
const app = createApp(emission);
app.use(store);
app.use(ElementPlus);
app.mount('#app');
