import Vue from 'vue'
import App from './App.vue'

export const Bus1 = new Vue();

export const Bus2 = new Vue();
export const Bus3 = new Vue();



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
