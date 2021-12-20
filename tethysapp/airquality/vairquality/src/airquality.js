import { createApp } from "vue";
import emission from "./views/airquality.vue";
import store from "./store/modules/airquality";
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

import {library,dom} from "@fortawesome/fontawesome-svg-core";
import {faHandPointer,faTimes,faMapMarkerAlt,faDrawPolygon,faPrint} from "@fortawesome/free-solid-svg-icons";

library.add(faHandPointer);
library.add(faTimes);
library.add(faMapMarkerAlt);
library.add(faDrawPolygon);
library.add(faPrint);
dom.watch();

const app = createApp(emission);
app.use(store);
app.use(ElementPlus);
app.mount('#app');

