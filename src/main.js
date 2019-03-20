import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../public/less/_theme.less'

//全局组件
import MyButton from './components/my-components/MyButton'
import MyCell from './components/my-components/MyCell'
Vue.component('my-button',MyButton)
Vue.component('my-cell',MyCell)

Vue.use(Mint)
//axios不支持Vue.use  可以添加原型使用
Vue.prototype.$axios = axios

//处理图片
Vue.prototype.dealImgUrl = function (url,replaceInfo='128.180') {
  return url.replace(/w\.h/,replaceInfo)
}
//日期格式化  yyyy-mm-dd
Vue.prototype.formatDate = function(str='-'){
  let year = new Date().getFullYear();
  let month = new Date().getMonth()+1;
  let day = new Date().getDate();
  if(month<10)month = '0'+month;
  if(day<10)day = '0'+day;
  return `${year}${str}${month}${str}${day}`
},

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
