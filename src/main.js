import Vue from 'vue'
import App from './index.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'lodash'


Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app');