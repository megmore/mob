<template>
  <div class="m-button"
       :class="classes"
       @click="handleClick">
    <div v-if="pending" class="m-loader" :class="{ 'dark': type === 'clean'}"></div>
    <slot v-else></slot>
  </div>
</template>
<script>
  export default {
    name: 'MButton',
    props: {
      type: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: 'primary'
      },
      variety: {
	    type: String,
        default: 'normal'
      },
      shape: {
        type: String,
        default: 'square'
      },
      size: {
        type: String,
        default: 'md'
      },
      block: {
        type: Boolean,
        default: false
      },
      pending: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes(){
        const { size, color, variety, shape, block, elevation } = this
        const isNormal = this.variety === 'normal'
        const isOutline = this.variety === 'outline'

        return {
          [`m--${size}`]: true,
          [`m--${variety}`]: true,
          [`m--${shape}`]: true,
          [`m--${block}`]: this.block,
          [`m--color-${color}`]: !isNormal,
          [`m--border-${color}`]: isOutline,
          [`m--bg-${color}`]: isNormal,
          [`m--elevation-${elevation}`]: true,
        }
      }
    },
    methods: {
      handleClick(e) {
      	if (this.pending || this.disabled) { return }
        this.$emit('click', e)
      },
    }
  };
</script>
