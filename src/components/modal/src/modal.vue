<template>
  <transition name="fade">
    <div class="m-modal" v-show="toggle">
      <div class="m-modal-mask" @click="handleMask"></div>
      <div class="m-modal-main">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'MModal',
    props: {
      show: Boolean,
    },
    data(){
      return {
        toggle: this.show
      }
    },
    watch: {
      show (newVal, oldVal){
        this.toggle = newVal
      },
    },
    methods: {
      handleMask(evt) {
        this.$emit('update:show', false)
      }
    }
  };
</script>
