import { createApp } from "vue";
import emission from "./views/airqualitynpArchive.vue";
import store from "./store/modules/airqualityArchive";
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import 'ol-ext/dist/ol-ext.css';

// fontawesome


import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {faHandPointer,faTimes,faMapMarkerAlt,faDrawPolygon,faPrint,faInfoCircle} from "@fortawesome/free-solid-svg-icons";

library.add(faHandPointer);
library.add(faTimes);
library.add(faMapMarkerAlt);
library.add(faDrawPolygon);
library.add(faPrint);
library.add(faInfoCircle);


const app = createApp(emission);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(ElementPlus);
app.mount('#app');