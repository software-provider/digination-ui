import Vue from 'vue'
import App from './App.vue'
import DiginationUI from '../packages/index'
// import DiginationUI from '../index.js'
// import VueModelViewer from '../index.js'
// import VueModelViewer from '../lib/vue-model-viewer.umd.js'
// import VueModelViewer from 'vue-model-viewer'
Vue.config.productionTip = false
Vue.use(DiginationUI)
new Vue({
  render: h => h(App)
}).$mount('#app')
