import Vue from 'vue'
import Component from './src/index.vue'
import merge from 'lodash/merge'
import { imageLoaded } from 'es-treasure'

let globalConfig = {

}
let ConfirmConstructor = Vue.extend(Component)

let langscope = false

/* 初始化 instance, 并且 append 到页面里面 */
let ImageBrowser = (params = {})=>{
  imageLoaded(params.url).then((size)=> {
    /* 如果当前已经在显示的话, 不响应*/
    let instance = new ConfirmConstructor({
      el: document.createElement('div')
    })
    let topPx = 0
    let langscope = document.documentElement.getAttribute('landscope') !== null
    if(langscope){
	    topPx = parseInt(window.innerWidth/2-(size.width *window.innerHeight/size.height)/2)
    }else{
	    topPx = parseInt(window.innerHeight/2-(size.height *window.innerWidth/size.width)/2)
    }

    let options = {
      langscope,
      topPx,
      ...params
    }
    merge(instance.$data, globalConfig)
    merge(instance.$data, options)
    document.body.appendChild(instance.$el)

    instance.show = true
    //挂载保存回调
    if(params.onSave) instance.$data.onSave = params.onSave

  }).catch((err)=>{
    console.log(err)
  })
}

export function setTexts(texts = {}){
  merge(globalConfig.texts, texts)
}

export default ImageBrowser
