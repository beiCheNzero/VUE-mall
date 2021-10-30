import Vue from 'vue'
import App from './App'
import router from "./router";
import {request} from "./network/request";
import store from './store';

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from "./components/common/toast";

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyload, {
  loading: require('../src/assets/img/common/photo.png'),//加载中图片，一定要有，不然会一直重复加载占位图
  error: require('../src/assets/img/common/photo.png')  //加载失败图片
});

Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装我们自定义的插件
Vue.use(toast)

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  el: '#app',
  router,
  store,
})
  // .$mount('#app')

// request({
//   url: '/home/multidata'
// }).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.log(err);
// })
