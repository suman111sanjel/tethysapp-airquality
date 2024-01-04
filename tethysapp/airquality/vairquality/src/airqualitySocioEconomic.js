import { createApp } from "vue";
import SocioEconomic from "./views/SocioEconomic";
import store from "./store/modules/SocioEconomic";
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';



import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {faHandPointer,faTimes,faMapMarkerAlt,faDrawPolygon,faPrint,faInfoCircle} from "@fortawesome/free-solid-svg-icons";

library.add(faHandPointer);
library.add(faTimes);
library.add(faMapMarkerAlt);
library.add(faDrawPolygon);
library.add(faPrint);
library.add(faInfoCircle);



const app = createApp(SocioEconomic);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(ElementPlus);
app.mount('#app');
