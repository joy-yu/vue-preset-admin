import Vue from 'vue';
import Vuex from 'vuex';
import userStore from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user: userStore
  }
});

export default store;
