<template>
  <el-container class="home-page">
    <!--左侧导航菜单-->
    <el-aside class="home-aside" :width="collapsed ? '60px' : '250px'">
      <!--头部 logo和名称-->
      <a class="home-logo" :href="rootUrl">
        <img class="logo-img" src="@/assets/logo.svg" alt="logo" />
        <h1 class="logo-title">{{ title }}</h1>
      </a>

      <el-menu router class="home-menu" :default-active="$route.path" :collapse="collapsed" :collapse-transition="false">
        <template v-for="(item, index) in asideRouter">
          <!--多个子菜单-->
          <el-submenu :key="item.index" :index="index + ''" v-if="item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              <span class="menu-title">{{ item.name }}</span>
            </template>
            <el-menu-item :key="child.path" :index="child.path" :to="child.path" v-for="child in item.children">{{ child.name }}</el-menu-item>
          </el-submenu>

          <!--单个菜单-->
          <el-menu-item :key="item.path" :index="item.path" :to="item.path" v-else>
            <i :class="item.icon"></i>
            <span class="menu-title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>

    <el-container>
      <!--右侧头部-->
      <el-header class="home-header">
        <div @click="collapsed = !collapsed" class="collapse-tool">
          <i :class="collapsed ? `el-icon-s-unfold` : `el-icon-s-fold`"></i>
        </div>
        <!--头部 右侧导航-->
        <div class="header-nav">
          <el-dropdown>
            <div class="userinfo">
              <span>{{ userInfo.chinese_name }}</span>
              <img src="@/assets/avatar.png" class="userinfo-avatar" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <!--右侧主体-->
      <el-main class="home-main">
        <!--主体头部-->
        <div class="main-head">
          <h2>{{ $route.name }}</h2>
        </div>

        <!--主体内容-->
        <transition mode="out-in" name="fade">
          <div class="main-content">
            <router-view></router-view>
          </div>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { aside } from '@/router';

export default {
  data() {
    return {
      rootUrl: process.env.BASE_URL,
      title: process.env.VUE_APP_NAME,
      collapsed: false,
      asideRouter: aside
    };
  },
  methods: {
    //退出登录
    logout() {
      this.$store.commit('logout');
    }
  },
  mounted() {
    console.log(aside);
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  }
};
</script>

<style lang="scss">
.home-page {
  height: 100vh;
  background-color: #f0f2f5;

  .home-aside {
    display: flex;
    flex-direction: column;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    background-color: $color-aside-bg;
    transition: width 0.2s;
  }
  .home-logo {
    flex: 0 0 auto;
    display: block;
    height: 60px;
    line-height: 60px;
    padding-left: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .logo-img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }
    .logo-title {
      font-size: 22px;
      display: inline-block;
      vertical-align: middle;
      color: #fff;
      margin-left: 12px;
    }
  }

  .home-menu {
    border: none;
    overflow: auto;
  }
  .el-submenu__title,
  .el-menu-item {
    &:hover {
      color: #fff;
    }
    .el-submenu__icon-arrow {
      color: inherit;
    }
  }
  .el-menu-item {
    &.is-active {
      background-color: $color-primary;
      color: #fff;
    }
  }
  .el-submenu .el-menu {
    background-color: #000;
  }

  .home-main {
    display: flex;
    flex-direction: column;
    .main-head {
      display: flex;
      justify-content: space-between;
      align-content: center;
      margin-bottom: 16px;
    }
    .main-content {
      flex: 1 1 auto;
      background-color: #fff;
      padding: 20px;
    }
  }
  .home-header {
    padding-left: 0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    position: relative;
    z-index: 1;

    .collapse-tool {
      height: 100%;
      line-height: 60px;
      width: 60px;
      text-align: center;
      transition: background-color 0.5s;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        background-color: #f0f2f5;
      }
    }
    .header-nav {
      .userinfo {
        cursor: pointer;
      }
      .userinfo-avatar {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        vertical-align: middle;
        margin-left: 10px;
      }
    }
  }
}
</style>
