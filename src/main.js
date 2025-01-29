import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "vue-toastification/dist/index.css";
import "./assets/styles.css";

// Создаем экземпляр приложения первым
const app = createApp(App);

// Инициализируем Pinia
const pinia = createPinia();

// Подключаем плагины
app.use(pinia);
app.use(router);

// Монтируем приложение
app.mount("#app");
