<!--
    列表单元组件
    @slot: cover  //列表封面插槽,
    @slot: content    //列表主体插槽
    @slot: notice  //列表提示消息插槽
    @slot: info    //列表拓展信息插槽
    @param: isArrow {Boolean}  //列表指示箭头
-->
<template>
    <!--<transition name="fade">-->
    <div class="m-list--item" @click="handleClick" :style="{zIndex:belowContentActive?30:0}">
        <div class="m-list-body" ref="body" :style="bodyStyle">
            <div class="cover" v-if="$slots['cover']">
                <slot name="cover"></slot>
            </div>
            <div class="m-list--main">
                <div class="content-box">
                    <slot name="content"></slot>
                    <slot name="tag"></slot>
                </div>
                <slot name="time"></slot>
            </div>
            <slot name="notice"></slot>
            <slot name="info"></slot>
            <div v-if="isArrow" class="arrow"></div>
            <div :style="belowStyle" class="m-list--below" @touchend.stop>
                <slot name="below-content">
                </slot>
            </div>
        </div>
        <slot name="extra"></slot>
    </div>
    <!--</transition>-->
</template>
<script>
import Vue from 'vue'
import scrollerMix from '../../scroller/src/mixins'
const scrollerClass = Vue.extend(scrollerMix)
import { getClient } from 'es-treasure/lib/device'
export default {
  name: 'MListItem',
  inject: {
    scroller: {default: () => new scrollerClass()}
  },
  props: {
    isArrow: {
      type: Boolean,
      default: true
    },
    belowWidth: {
      type: Number,
      default: 80
    }
  },
  data () {
    return {
      xDistance: 0,//X轴滑动
      startPoint: null,
      hasBelowContent: false,
      isHorizontalFlag: null,
      client:getClient()
    }
  },
  beforeDestroy () {
    this.body.removeEventListener('touchmove', this.handleToucheMove)
    this.body.removeEventListener('touchend', this.handleToucheEnd)
    this.body.removeEventListener('touchstart', this.handleToucheStart)
    if (this.scroller) {
      this.scroller.removeListItem(this)
    }
  },
  methods: {
    handleClick (evt) {
      this.xDistance = 0
      this.$emit('click', evt);
    },
    touchInit () {
      if (this.$slots['below-content']) {
        this.hasBelowContent = true
      }
      this.body.addEventListener('touchstart', this.handleToucheStart)
      this.body.addEventListener('touchmove', this.handleToucheMove)
      this.body.addEventListener('touchend', this.handleToucheEnd)
    },
    handleToucheStart (e) {
      const touch = e.touches[0]
      this.startPoint = touch
    },
    handleToucheMove (e) {
      const touch = e.touches[0]
      if (this.isHorizontalFlag === null) {//开始时判断滑动方向
        this.isHorizontalFlag = this.isHorizontal(touch)
      }
      if (this.isHorizontalFlag === true) {
        e.stopPropagation()
      }
    },
    handleToucheEnd (e) {
      const touch = e.changedTouches[0]
      const direction = this.getDirection(e)
      const {isHorizontalFlag} = this
      this.isHorizontalFlag = null
      if (isHorizontalFlag === true) {
        e.stopPropagation()
      } else {
        return
      }
      if (!this.hasBelowContent) {
        return
      }
      if (this.scroller) {
        this.scroller.hideItemBlowContent()
      }
      if (direction === 'left') {
        if(this.client.lang==='ar'){
          return this.xDistance = 0
        }
        this.xDistance = this.belowWidth
      } else if (direction === 'right') {
        if(this.client.lang==='ar'){
          return this.xDistance = this.belowWidth
        }
        this.xDistance = 0
      }
    },
    getDirection (e) {
      if (!this.startPoint) {
        return
      }
      const start = this.startPoint
      const end = e.changedTouches[0]
      if (!end) {
        return ''
      }
      if (end.pageX - start.pageX < 0) {
        return 'left'
      } else {
        return 'right'
      }
    },
    isHorizontal (point) {
      const start = this.startPoint
      const result = Math.abs(point.pageX - start.pageX) > Math.abs(point.pageY - start.pageY)
      return result
    }
  },
  computed: {
    belowStyle () {
      return {
        width: `${this.belowWidth}px`
      }
    },
    body () {
      return this.$refs.body
    },
    bodyStyle () {
      if(this.client.lang==='ar'){
        return {
          'transform': `translate3d(${this._xDistance}px,0,0)`
        }
      }
      return {
        'transform': `translate3d(-${this._xDistance}px,0,0)`
      }
    },
    _xDistance () {
      if (this.xDistance >= this.belowWidth) {
        return this.belowWidth
      }
      if (this.xDistance <= 0) {
        return 0
      }
      return this.xDistance
    },
    belowContentActive(){
      return this._xDistance>0
    }
  },
  mounted () {
    this.touchInit()
    if (this.scroller) {
      this.scroller.addListItem(this)
    }
  },
  watch: {
    isHorizontalFlag (val) {
      console.log(val)
    }
  }
};
</script>
