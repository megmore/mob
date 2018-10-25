import Vue from 'vue'
import Component from './src/popover.vue'

let PopoverConstructor = Vue.extend(Component);


let Popover = ($target, message, { duration = 2000, size = '50vw' })=>{

        /* 如果当前已经在显示的话, 不响应*/
        let instance = new PopoverConstructor({
          el: document.createElement('div')
        });

        if(typeof $target === 'string'){ $target = document.querySelector($target) }
        if(typeof message !== 'string'){ message = JSON.stringify(message) }

        console.log(getComputedStyle($target)['position'])
        if(getComputedStyle($target)['position'] === 'static'){
	        $target.style.position = 'relative'
        }
        $target.appendChild(instance.$el)
        /* 设置显示内容 */
        instance.message = message
        instance.duration = duration
	    instance.size = size
        /* 显示 */
        instance.show = true

        let promise =  new Promise((resolve, reject)=>{
            setTimeout(()=>{
                instance.show = false
                resolve()
            }, instance.duration)
        })
        promise.catch((err)=>{})
        return promise
}

export default Popover
