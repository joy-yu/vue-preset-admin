// import Vue from 'vue';

// Vue.filter('capitalize', function (value) {
//   if (!value) {
//     return '';
//   }
//   value = value.toString();
//   return value.charAt(0).toUpperCase() + value.slice(1);
// });

// Vue.filter('toFixed', function (value, len = 2) {
//   if (typeof value === 'number') {
//     return value.toFixed(len);
//   } else {
//     const fValue = parseFloat(value);
//     if (isNaN(fValue)) {
//       return '-';
//     }
//     return fValue.toFixed(len);
//   }
// });

// Vue.filter('phoneNumberMask', function (v) {
//   try {
//     return v.substr(0, 3) + '****' + v.substr(7);
//   } catch (e) {
//     return v;
//   }
// });
