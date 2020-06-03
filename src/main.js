import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import { Indicator } from 'mint-ui';

Vue.prototype.$axios=axios; 
Vue.use(MintUI);
Vue.config.productionTip = false
//请求拦截:请求操作时出现加载动画
axios.interceptors.request.use(config=>{
  //加载动画
  Indicator.open();
  return config;
},error=>{
  return Promise.reject(error)
})
//响应拦截:响应时关闭加载动画
axios.interceptors.response.use(response=>{
  Indicator.close();
  return response;
},error=>{
  Indicator.close();
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
