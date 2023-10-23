import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// import './assets/main.css'

const app = createApp(App)
const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};
  
app.use(router)
app.use(VueSweetalert2, options)

app.mount('#app')
