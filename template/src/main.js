import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App';
import '@/api';
import router from './router';
import store from './store';
import '@/styles/theme.scss';
import '@/styles/app-main.scss';

Vue.use(ElementUI, { size: 'small' });

Vue.config.productionTip = false;

const AppConstructor = Vue.extend(App);

(async function() {
  // await store.dispatch('fetchUserInfo');

  new AppConstructor({
    el: '#app',
    router,
    store
  });
})();
