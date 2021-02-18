import Vue from 'vue'
import App from './index.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'lodash'
import 'xe-utils'
import VXETable from 'vxe-table'
// import VXETablePluginElement from 'vxe-table-plugin-element'


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VXETable)
// VXETable.use(VXETablePluginElement)


new Vue({
  render: h => h(App),
}).$mount('#app');
