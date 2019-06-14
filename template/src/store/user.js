import Vue from 'vue';
import router from '@/router';

const api = Vue.prototype.$api;

export default {
  state: {
    userInfo: {}
  },
  mutations: {
    updateUserInfo(state, data) {
      state.userInfo = data;
    },
    logout(state) {
      router.push('/login');
      api.auth.requestLogout();
      state.userInfo = {};
      localStorage.removeItem('token');
    }
  },
  actions: {
    async fetchUserInfo({ commit }) {
      try {
        const resp = await api.auth.loginStatus();
        commit('updateUserInfo', resp.data.user);
      } catch (error) {
        router.replace({ name: '登录' });
      }
    }
  },
  getters: {
    hasLogin(state) {
      return !!state.userInfo.id;
    }
  }
};
