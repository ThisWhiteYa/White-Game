/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import { createPinia } from "pinia";
import PinInput from 'v-pin-input'
import { VueWindowSizePlugin } from 'vue-window-size/plugin';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(PinInput)
app.use(VueWindowSizePlugin);
registerPlugins(app);

app.mount("#app");
