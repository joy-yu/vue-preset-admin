import Vue from 'vue';
const authApi = Vue.prototype.$api.auth;

const mobileRegExp = /^1[0-9]{10}$/;
const emailRegExp = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

export function isMobile(value) {
  return mobileRegExp.test(value);
}
export function isEmail(value) {
  return emailRegExp.test(value);
}

export function hasThisMobile(rules, value, callback) {
  authApi.hasThisUser(value).then(res => {
    if (res.code) {
      callback(new Error('用户名重复'));
    } else {
      callback();
    }
  });
}
export function checkRegisterEmail(rules, value, callback) {
  if (value.length !== 6) {
    callback(new Error('验证码为6位'));
    return false;
  }
  authApi.checkRegisterEmail({ email_code: value }).then(res => {
    if (res.code) {
      callback(new Error('邮箱验证码错误'));
    } else {
      callback();
    }
  });
}
export function checkSMS(rules, value, callback) {
  if (value.length !== 6) {
    callback(new Error('验证码为6位'));
    return false;
  }
  authApi.checkSMS({ sms_code: value }).then(res => {
    if (res.code) {
      callback(new Error('手机验证码错误'));
    } else {
      callback();
    }
  });
}

export function isValidAccount(rules, value, callback) {
  if (mobileRegExp.test(value) || emailRegExp.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的手机号/邮箱'));
  }
}
export function isValidMobile(rules, value, callback) {
  if (mobileRegExp.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的手机号'));
  }
}
export function isValidEmail(rules, value, callback) {
  if (emailRegExp.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的邮箱'));
  }
}
export function isValidPwd(rules, value, callback) {
  const len = value.length;

  if (/\W/.test(value)) {
    callback(new Error('密码仅限数字/字母/下划线'));
  }
  if (len < 6 || len > 20) {
    callback(new Error('请输入6-20位密码'));
  }
  callback();
}
