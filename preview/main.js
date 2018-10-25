import Vue from 'vue';
import App from './App.vue';
import lib from '../src'
Vue.config.productionTip = false;
// import  '../src/directives/lazy-load'
Vue.use(lib)
console.log(lib)
const theme = 'default'
//const theme = 'night'

;(async () => {
	await import (`../src/theme/${theme}/style.scss`)
	document.documentElement.setAttribute('data-theme', theme)

	new Vue({
		render: h => h(App),
	}).$mount('#app')
})()
