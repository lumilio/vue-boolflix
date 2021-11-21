import Vue from 'vue'
import App from './App.vue'

export const Bus1 = new Vue(); /* data from SearchBox to CardBox */
export const Bus2 = new Vue(); /* data from SearchBox to ArrowBox */
export const Bus3 = new Vue(); /* data from ArrowBox to CardBox */





Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
