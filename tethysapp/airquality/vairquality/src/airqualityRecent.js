import { createApp } from "vue";
import emission from "./views/airqualitynpRecent.vue";
import store from "./store/modules/airqualityRecent";
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import 'ol-ext/dist/ol-ext.css'
import {library,dom} from "@fortawesome/fontawesome-svg-core";
import {faHandPointer,faTimes,faMapMarkerAlt,faDrawPolygon,faPrint,faInfo,faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


library.add(faHandPointer);
library.add(faTimes);
library.add(faMapMarkerAlt);
library.add(faDrawPolygon);
library.add(faPrint);
library.add(faInfo);
library.add(faInfoCircle);
dom.watch();


const app = createApp(emission);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(ElementPlus);
app.mount('#app');

