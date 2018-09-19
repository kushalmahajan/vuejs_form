import Vue from 'vue';
import App from './App.vue';
import wrap from '@vue/web-component-wrapper';

Vue.config.productionTip = false;
const CustomElm = wrap(Vue, App);

window.customElements.define('custom-elem', CustomElm);
new Vue({
	render: h => h(App),
}).$mount('#app');
