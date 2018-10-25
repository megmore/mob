import Vue from 'vue'
import Component from './src/index.vue'
import merge from 'lodash/merge'

let Constructor = Vue.extend(Component);

Promise.prototype.confirm = function (onResolved, onRejected) {
  return this.then(onResolved, onRejected);
};
Promise.prototype.cancel = function (onResolved, onRejected) {
  return this.catch(onResolved, onRejected);
};

/* 初始化 instance, 并且 append 到页面里面 */

let Dialog = (options)=>{
  /* 如果当前已经在显示的话, 不响应*/
  let instance = new Constructor({
    el: document.createElement('div')
  });
  document.body.appendChild(instance.$el);
  /* 设置显示内容 */
  merge(instance.$data, options);

  //针对当前组件的promise拓展

  return new Promise((resolve, reject)=>{
    instance.show = true;
    /* 对 success 函数包裹一层 */
    let confirm = instance.confirm;
    let cancel  = instance.cancel;

    instance.confirm = () => {
      confirm();
      resolve(instance.message);
    }
    instance.cancel = () => {
      cancel();
      reject('cancel');
    }
  }).catch();

}

export default Dialog;
