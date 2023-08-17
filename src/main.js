import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'; // Importa el archivo CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap'; // Importa el archivo JavaScript de Bootstrap

// Configurar la base URL para las solicitudes HTTP
axios.defaults.baseURL = 'http://localhost:3001'; // Cambia el puerto si es necesario

createApp(App).mount('#app');





