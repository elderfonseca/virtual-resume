import './assets/styles/index.css';

import { createApp } from 'vue';

import AnimationPlugin from './plugins/animations';
import i18n from './plugins/i18n';
import App from './App.vue';

/**
 * Initialize the Vue application with all necessary plugins
 * - i18n for internationalization
 * - AnimationPlugin for scroll-based animations using anime.js
 */
const app = createApp(App);

// Register plugins
app.use(i18n);
app.use(AnimationPlugin);

// Mount the application
app.mount('#app');
