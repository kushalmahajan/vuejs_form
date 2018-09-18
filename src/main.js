import Vue from 'vue';
import App from './App.vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import wrap from '@vue/web-component-wrapper';

Vue.use(VueMaterial);

Vue.config.productionTip = false;
const CustomElm = wrap(Vue, App);

window.customElements.define('custom-elem', CustomElm);
// new Vue({
// 	render: h => h(App),
// }).$mount('#app');
