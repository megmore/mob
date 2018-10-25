<!--
    头像
    @param: {String} nSrc   //图片url
    @param: {String} dSrc   //无图片url
    @param: {String} type   //类型
                     round: 圆形
                     corner: 圆角
    @param: {preset} type   //预设，一些预设的头像
                     message, whatsapp, facebook,
-->
<template>
    <div class="m-avatar"
         @click="handleClick"
         :class="[
        `${type}`,
        `${size}`
      ]">
      <transition name="fade">
        <img :src="nSrc" alt="" v-show="loaded" @load="handleLoad">
      </transition>
      <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'MAvatar',

    props: {
      nSrc: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      }
    },

    data (){
    	return {
        loaded: false
      }
    },

    methods: {
      handleClick (e){
        this.$emit('click', e);
      },
      handleLoad (e){
        this.$el.style.backgroundImage = 'none';
        this.loaded = true;
      }
    }
  };
</script>
