import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/home.vue';
import Login from '@/views/login.vue';
import User from '@/views/user.vue';
import NotFound from '@/views/404.vue';

Vue.use(Router);

const handleRoute = arr => {
  return arr.map(v => ({
    path: '/',
    name: v.children ? v.name : '',
    component: Home,
    children: v.children || [v]
  }));
};

export const aside = [
  {
    path: '/user',
    name: '用户管理',
    icon: 'el-icon-info',
    component: User
  },
  {
    name: 'aa',
    icon: 'el-icon-info',
    children: [
      {
        path: '/bb',
        name: 'bb',
        component: User
      }
    ]
  }
];

const other = [];

let appRoutes = [
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/',
    name: '首页',
    component: Home,
    redirect: { name: '用户管理' }
  },
  ...handleRoute(aside),
  ...handleRoute(other),
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: appRoutes
});

router.afterEach(to => {
  document.title = `${process.env.VUE_APP_NAME} | ${to.name}`;
});

export default router;
