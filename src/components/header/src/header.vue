<!--
    页面头部组件
    @param {string} title:   页面标题,
    @param {string} beforeClose:  关闭前的回调用，如果调用，需要手动调用第二个参数方法继续关闭，或者手动this.router.back()也行,
-->
<template>
  <div class="m-header">
    <div class="m-header__wrapper">
      <div class="m-header-left">
        <slot name="left"></slot>
      </div>
      <div class="m-header-main">
        <span class="header-title" v-if="title">{{title}}</span>
        <slot v-else></slot>
      </div>
      <div class="m-header-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MHeader',
    props: {
      title: {
        type:String,
        default: false
      },
    },
    methods: {

    }
  }
</script>
