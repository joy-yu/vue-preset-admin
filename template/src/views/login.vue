<template>
  <el-form :model="loginForm" :rules="loginFormRule" class="login-container" ref="loginForm">
    <h2 class="title">{{ title }}</h2>

    <el-form-item prop="username">
      <el-input placeholder="账号" type="text" v-model="loginForm.username"></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input placeholder="密码" type="password" v-model="loginForm.password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button :loading="loginLoading" @click.prevent="login" native-type="submit" style="width:100%;" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      title: process.env.VUE_APP_NAME,
      loginLoading: false,
      loginForm: {
        username: '18551656881@qq.com',
        password: '',
        is_backend: true
      },
      loginFormRule: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            this.loginLoading = true;
            const login_resp = await this.$api.auth.requestLogin(this.loginForm);
            if (login_resp.code) {
              this.loginLoading = false;
              return;
            }
            localStorage.setItem('token', `${login_resp.token_type} ${login_resp.access_token}`);
            const resp = await this.$api.auth.loginStatus();
            this.loginLoading = false;
            this.$store.commit('updateUserInfo', resp.data.user);
            this.$router.push({ name: '首页' });
            this.$message.success('欢迎您登录，' + resp.data.user.chinese_name);
          } catch (error) {
            this.loginLoading = false;
            this.$message.error('账号或密码错误！');
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login-container {
  position: absolute;
  border-radius: 5px;
  width: 400px;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -35%);
  padding: 35px 35px 25px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin-bottom: 40px;
    text-align: center;
    color: #505458;
  }
}
</style>
