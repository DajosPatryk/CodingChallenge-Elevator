import {createApp} from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

// I18n
import { createI18n } from 'vue-i18n'
import {getLocale, getMessages} from "@/lang/langSetup";
const messages = getMessages();
const locale = getLocale();
const i18n = createI18n({
    locale: locale,
    fallbackLocale: 'en',
    messages,
})

// Vuetify
import 'vuetify/styles'
import {vuetifyInstance} from "@/style/vuetify.js";

// Vue Screen Size
import VueScreenSize from 'vue-screen-size';

createApp(App)
    .use(vuetifyInstance)
    .use(router)
    .use(i18n)
    .use(VueScreenSize)
    .mount("#app");
