import Vue from 'vue'
import App from './App.vue'

// 引入element-ui
import ElementUI from 'element-ui';
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
//引入axios
import axios from 'axios';
// 移入vue-router
import VueRouter from 'vue-router'


// 导入组件
import Login from "./pages/Login.vue"
import Admin from "./pages/Admin.vue"






// 全局注册组件
Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.config.productionTip = false;

// 配置组件
const routes = [{
    path: "/",
    redirect: "/admin"
  },
  {
    path: "/login",
    component: Login,
    meta: "登录"
  }, {
    path: "/admin",
    component: Admin,
    meta: "首页"
  },

]

const router = new VueRouter({
  routes
})


// 把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')