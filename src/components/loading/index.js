import Vue from 'vue'
import Component from './src/index.vue'
import merge from 'lodash/merge'

let LoadingConstructor = Vue.extend(Component);

let  Loading = new LoadingConstructor({
  el: document.createElement('div')
});

document.body.appendChild(Loading.$el);
/* 初始化 instance, 并且 append 到页面里面 */

export default Loading;
