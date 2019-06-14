import Vue from 'vue';
import '@/utils/request';
import auth from './auth';
import user from './user';

Vue.prototype.$api = { auth, user };
