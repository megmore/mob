<template>
  <transition name="fade" v-on:after-leave="afterLeave">
    <div class="m-image-browser" v-show="show">
      <div class="m-mask" style="background-color: rgba(0,0,0,1)" @click="close" ontouchmove="event.preventDefault()"></div>
      <img ref="image"
           :style="style"
           :src="url" alt="" class="m-image-browser--main"/>
      <m-action-sheet class="action-sheet-more" :show.sync="showMore">
        <m-action-sheet-item :name="texts.save" @click.stop="saveImage"/>
        <m-action-sheet-item :name="texts.cancel" @click.stop="closeMore"/>
      </m-action-sheet>
    </div>
  </transition>
</template>
<script>
  import MActionSheet from "../../action-sheet/src/action-sheet"
  import MActionSheetItem from "../../action-sheet/src/action-sheet-item"
  import To from './to'
  import Transform from './transform'
  import AlloyFinger from 'alloyfinger/alloy_finger' // 手势库
  import pageChange from '../../../mixins/pageChange'

  function ease(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  }

  export default {
    mixins: [pageChange],
    components: {
      MActionSheet,
      MActionSheetItem
    },
  	data() {
        return {
          url: '',
          $image: null,
          show: false,
          langscope: false,
          initScale: 1,
          topPx: 0,
          showMore: false,
          closeTimer: null,
          texts: {
            save: '保存',
            cancel: '取消',
            toastSaveSuccess: '保存成功',
            toastSaveFail: '保存失败',
          }
        }
    },
    computed: {
      style(){
	      return this.langscope ? {
            "left":`${this.topPx}px`
	      } : {
            "top":`${this.topPx}px`
          }
      }
    },
    methods: {
      saveImage(){
        this.$data.onSave(this.closeMore)
      },
      closeMore(){
        this.showMore = false
      },
      close(){
        this.show = false;
      },
      multipointStart () {
        To.stopAll();
        this.initScale = this.$image.scaleX;
      },
      /*rotate (e) {
        this.$image.rotateZ += e.angle;
      },*/
      pinch (e) {

        let zoom = this.initScale * e.zoom;

        if(zoom < 0.8){
          this.$image.scaleX = this.$image.scaleY = 0.8
        }else if(zoom > 2){
          this.$image.scaleX = this.$image.scaleY = 2
        }else{
          this.$image.scaleX = this.$image.scaleY = zoom
        }
      },
      multipointEnd () {
        To.stopAll();
        if (this.$image.scaleX < 1) {
          new To(this.$image, "scaleX", 1, 500, ease);
          new To(this.$image, "scaleY", 1, 500, ease);
        }
        if (this.$image.scaleX > 2) {
          new To(this.$image, "scaleX", 2, 500, ease);
          new To(this.$image, "scaleY", 2, 500, ease);
        }

        /*let rotation = this.$image.rotateZ % 360;
        if (rotation < 0)rotation = 360 + rotation;
        this.$image.rotateZ=rotation;

        if (rotation > 0 && rotation < 45) {
          new To(this.$image, "rotateZ", 0, 500, ease);
        } else if (rotation >= 315) {
          new To(this.$image, "rotateZ", 360, 500, ease);
        } else if (rotation >= 45 && rotation < 135) {
          new To(this.$image, "rotateZ", 90, 500, ease);
        } else if (rotation >= 135 && rotation < 225) {
          new To(this.$image, "rotateZ", 180, 500, ease);
        } else if (rotation >= 225 && rotation < 315) {
          new To(this.$image, "rotateZ", 270, 500, ease);
        }*/
      },
      pressMove (e) {
        e.preventDefault()
        /*let rects = this.$image.getBoundingClientRect()
        let screenH = window.innerHeight
        let screenW = window.innerWidth

        if(screenH > rects.height){
          if (!(
            (rects.y < 0 && e.deltaY < 0) ||
            (rects.bottom > screenH && e.deltaY > 0)
          )){
            this.$image.translateY += e.deltaY;
          }
        }else{
          if (!(
              (rects.y > 0 && e.deltaY > 0) ||
              (rects.bottom < screenH && e.deltaY < 0)
            )){
            this.$image.translateY += e.deltaY;
          }
        }
        if(screenW <= rects.width){
          if (!(
              (rects.x > 0 && e.deltaX > 0) ||
              (rects.right < screenW && e.deltaX < 0)
            )){
            this.$image.translateX += e.deltaX;
          }
        }

        e.preventDefault();*/
      },
      tap(e){
        if(this.closeTimer) return

        this.closeTimer = setTimeout(()=>{
          this.closeTimer = null
          this.close()
        }, 300)
      },
      doubleTap (e) {
        if(this.closeTimer) {
        	clearTimeout(this.closeTimer)
          this.closeTimer = null
        }
        To.stopAll();
        if (this.$image.scaleX > 1.5) {
          new To(this.$image, "scaleX", 1, 500, ease);
          new To(this.$image, "scaleY", 1, 500, ease);
          new To(this.$image, "translateX", 0, 500, ease);
          new To(this.$image, "translateY", 0, 500, ease);
        } else {
          let box = this.$image.getBoundingClientRect();
          let y = box.height - (( e.changedTouches[0].pageY - this.topPx) * 2) - (box.height / 2 - ( e.changedTouches[0].pageY - this.topPx));
          let x = box.width - (( e.changedTouches[0].pageX) * 2) - (box.width / 2 - ( e.changedTouches[0].pageX));
          new To(this.$image, "scaleX", 2, 500, ease);
          new To(this.$image, "scaleY", 2, 500, ease);
          new To(this.$image, "translateX", x, 500, ease);
          new To(this.$image, "translateY", y, 500, ease);
        }
      },
      longTap(e){
        this.showMore = true
      },
      afterLeave(){
        //离开动画结束后自动销毁当前的组件
        this.$destroy()
      }
    },
    mounted(){
      this.$image = this.$refs.image
      Transform(this.$image)
      this.Finger = new AlloyFinger(this.$image, {
        multipointStart: this.multipointStart,
        rotate: this.rotate,
        pinch: this.pinch,
        pressMove: this.pressMove,
        multipointEnd: this.multipointEnd,
        doubleTap: this.doubleTap,
        longTap: this.longTap,
        tap: this.tap,
        touchEnd: this.touchEnd,
      })
    },
    beforeDestroy() {
      //移除touch绑定
      if(this.Finger) this.Finger = this.Finger.destroy()
    },
    destroyed(){
      //销毁完毕移除节点

      this.$el.remove()
    }
  }
</script>
