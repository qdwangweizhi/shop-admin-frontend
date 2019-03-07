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
import CategoryList from "./pages/category/CategoryList.vue"
import GoodaList from "./pages/goods/GoodsList.vue"
import GoodsAdd from "./pages/goods/GoodsAdd.vue"




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
    meta: "首页",
    redirect: "/admin/goods-list",
    children: [{
        path: "goods-list",
        component: GoodaList,
        meta: "商品列表"
      },
      {
        path: "goods-add",
        component: GoodsAdd,
        meta: "新增列表"
      },
      {
        path: "category-list",
        component: CategoryList,
        meta: "栏目列表"
      }
    ]
  },

]

const router = new VueRouter({
  routes
})


// 把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;
// 给axios给次请求自动加上域名
axios.defaults.baseURL = 'http://localhost:8899';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')