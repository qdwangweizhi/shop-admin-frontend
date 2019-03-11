import Vue from 'vue'
import Vuex from 'vuex'
// 引入user.js数据;
import user from './modules/user'

//注册插件
Vue.use(Vuex)


//创建一个创库
export default new Vuex.Store({

    // 挂载数据模块到创库
    modules: {
        user
    }
})