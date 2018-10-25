<!--
    列表单元组件
    @slot: cover  //列表封面插槽,
    @slot: content    //列表主体插槽
    @slot: notice  //列表提示消息插槽
    @slot: info    //列表拓展信息插槽
    @param: isArrow {Boolean}  //列表指示箭头
-->
<template>
  <transition name="fade">
      <div class="m-loading" v-if="show">
        <div class="m-mask"></div>
        <div class="m-loading--main">
          <icon name="circle-o-notch" scale="4" :spin="show"></icon>
        </div>
      </div>
  </transition>
</template>
<script>
  export default {
    name: 'Loading',
    data(){
    	return {
        show: false
      }
    }
  };
</script>
