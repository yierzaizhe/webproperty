import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from "./util/http";
import ElFilter from 'el-filter' //搜索
import { MessageBox } from 'element-ui' //删除确认
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(ElFilter);
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
