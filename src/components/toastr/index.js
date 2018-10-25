import Vue from 'vue'
import Component from './src/toastr.vue'

let ToastConstructor = Vue.extend(Component);

/* 初始化 instance, 并且 append 到页面里面 */
Promise.prototype.onclose = function (onResolved, onRejected) {
  return this.then(onResolved, onRejected);
};

let Toastr = (content, duration = 2000)=>{
        if(typeof content !== 'string') content = JSON.stringify(content)
    /* 如果当前已经在显示的话, 不响应*/
        let instance = new ToastConstructor({
          el: document.createElement('div')
        });
        document.body.appendChild(instance.$el);
        /* 设置显示内容 */
        instance.content = content;
        instance.duration = duration;
        /* 显示 */
        instance.show = true;

      let promise =  new Promise((resolve, reject)=>{
        setTimeout(()=>{
          instance.show = false;
          resolve()
        }, instance.duration);
      });
      promise.catch((err)=>{})
      return promise
}
export default Toastr
