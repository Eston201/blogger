import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap';
import App from './App.vue'
import router from './router'

gsap.registerPlugin(ScrollTrigger);

// Style Sheets
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './assets/scss/style.scss'

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark'
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        },
    },
});
const pinia = createPinia();
const app = createApp(App);
app.use(vuetify);
app.use(pinia);
app.use(router);
app.mount('#app');