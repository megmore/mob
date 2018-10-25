<!--
    页面框架组件
-->
<template>
  <div class="m-view" :class="viewClass">
    <slot name="head"></slot>
    <div class="m-view--body">
      <!--加载中-->
      <div class="m-view--loading" v-if="status === 'loading'">
        <div class="m-view--loader" style="height: 2rem; width: 2rem"></div>
      </div>
      <!--异常-->
      <div class="m-view--error" v-else-if="status === 'fail'">
        <slot v-if="$slots['error']" name="error"></slot>
        <error-block v-else  name="content"/>
      </div>
      <!--正常-->
      <slot v-else></slot>
    </div>
    <slot name="foot"></slot>
  </div>
</template>
<script>
  const isIphoneX = /iphone/gi.test(navigator.userAgent) &&
                    window.screen.height === 812 &&
                    window.screen.width === 375
  if(isIphoneX){
  	document.body.classList.add('is-iphoneX')
  }
  export default {
    name: 'MView',

    props: {
      status: {
        type: String,
        default: 'loading'
      },
      isHeader: {
        type: Boolean,
        default: true
      },
      noBg: false,
      emptyCover: String,
      emptyMsg: '',
    },

    computed: {
      viewClass(){
      	let result = "";
      	if(this.$slots['head']){
          result += ' with-head '
        }
        if(this.$slots['foot']){
          result += ' with-foot '
        }
        return result
      }
    },
  };
</script>

