<!--
    滚动容器组件
    @param { Function } onBottom: 滚动到底部回调
    @param { Function } onTop: 滚动到顶部部回调
    @param { Function } onScroll: 滚动回调
    @param { Number } scrollTo: 初始化后滚动到某个位置（暂无添加）
    @param { Boolean } scrollKeep: 是否记住滚动条位置
-->
<template>
  <div class="m-scroller ios-scroller">
    <div v-if="enableRefresh" v-show="refresherStatus === 'rolling'" ref="refresher" class="m-refresher"
         :class="refresherStatus"></div>
    <div ref="scroller" class="m-scroller-wrapper" :class="refresherStatus">
      <div style="padding:0; min-height: 100%">
        <slot></slot>
        <div v-if="enableMore && moreStatus!=='hide'" class="m-scroller--more-status">
          <span v-if="moreStatus !== ''"  >{{moreStatus}}</span>
          <!--<img v-else class="more-loader" src="./loader.png">-->
          <div v-else class="m-loader"></div>
        </div>
      </div>
      <div class="fix-holder" style="background-color: transparent;height: 101vh"></div>
    </div>
  </div>
</template>
<script>
  import { getStyle, strStyle } from 'es-treasure'
  //import { } from ''
  import AlloyFinger from 'alloyfinger/alloy_finger' // 手势库
  import mix from './mixins'
  //为了下拉刷新动画的流畅，直接原生操作节点，不做vue过渡
  let htmlFs = 0
  let refresherSize = 50,
    refresherOffsetY = 0,
    refresherActiveY = 100,
    refresherMaxY = 200


  export default {
    name: 'MScroller',
    mixins:[mix],
    data() {
      return {
        //判断是否要开启绑定滚动判断方法
        isTop: true,
        isBottom: false,
        lastScrollVal: 0,
        pending: false,
        refresherLastY: refresherOffsetY,
        pulling: false,
        animating: false,
        touchStartY: 0,
        Finger: null,
        scrollKeepY: 0,
        enableWatchScroll : false,
        enableRefresh : false,
        enableMore : false,
        refresherStatus: 'normal'    //refresherStatus动画状态
      }
    },
    props: {
      scrollKeep:  {
        type: Boolean,   //保留组件滚动位置
        default: true
      },
      autoRefresh: {
        type: Boolean,
        default: false
      },
      moreStatus: ''      //loading, noMore
    },
    methods: {
      scrollTo(target){
        if(typeof target === 'number') {
          this.$refs.scroller.scrollTop = target
        }else if(typeof target === 'string') {
          let $target= this.$el.querySelector(target);
          let topVal = $target.offsetTop === 0? $target.clientTop : $target.offsetTop

          this.$refs.scroller.scrollTop = topVal
        }
      },
      handleScroll(e) {
        this.isTop = (this.$refs.scroller.scrollTop === 0)
        this.isBottom = (this.$refs.scroller.scrollTop + this.$refs.scroller.offsetHeight + 5 > this.$refs.scroller.scrollHeight)   //加1的浮点计算误差

        if (this.$listeners.scroll){
          const direction = this.$refs.scroller.scrollTop === this.lastScrollVal ? '↕' :
                            this.$refs.scroller.scrollTop > this.lastScrollVal ? '↓' : '↑'
          this.$emit('scroll',[e, this.$refs.scroller.scrollTop, this.isTop, this.isBottom, direction])
          this.lastScrollVal = this.$refs.scroller.scrollTop
        }
        //滚动加载
        if(this.enableMore && !this.pending && this.isBottom) {
          this.pending =true
          this.$emit('more', ()=>{
            this.pending =false
          });
        }
      },
      //以下方法只有当存在onRefresh生效
      touchStart(e){
        if(!this.pending && this.isTop){
          this.touchStartY = e.changedTouches[0].pageY
        }
      },
      pressMove(e) {

        if(!this.pending && this.isTop &&  e.changedTouches[0].pageY > this.touchStartY ){
          if(this.refresherStatus !== 'pulling') this.refresherStatus = 'pulling'
          this.refresherLastY += e.deltaY / 2;
//          console.log(123)
//          this.$refs.scroller.style.transform = 'translateY(' + this.refresherLastY + 'px)';
          if( this.refresherLastY > refresherMaxY ) {
            this.refresherLastY = refresherMaxY ;
            return
          }else{
            this.$refs.scroller.style.transform = 'translateY(' + this.refresherLastY + 'px)';
//            this.$refs.scroller.style.top = this.refresherLastY + 'px';
          }
          e.preventDefault();
        }
      },
      touchEnd(e){
        //下拉刷新
        if(!this.pending && this.isTop &&  this.refresherLastY !== refresherOffsetY  ) {
          this.refresherStatus = 'rolling'
          if(this.refresherLastY > refresherActiveY){
            //进入下拉刷新
            this.refreshStart();
          }else{
            //中断下拉刷新
            this.refreshStop();
          }
        }
      },
      //自动刷新的开始动作
      refreshBegin(e) {
        this.refresherStatus = 'rolling'
        this.$refs.scroller.style.transform = 'translateY(' + refresherActiveY + 'px)';
        this.refresherLastY = refresherActiveY;
        this.animating = true;
        this.pending = true;
        this.$emit('refresh', this.refreshEnd);
      },
      //中断下拉刷新的结束动作
      refreshStop(e) {
        this.refresherStatus = 'finish'
        this.$refs.scroller.style.transform = 'translateY(' + refresherOffsetY + 'px)';
        this.refresherLastY = refresherOffsetY;
        this.animating = false;
      },
      //下拉刷新的开始动作
      refreshStart(e) {
        this.$refs.scroller.style.transform = 'translateY(' + refresherActiveY + 'px)';
        this.refresherLastY = refresherActiveY
        this.animating = true;
        this.pending = true;
        this.$emit('refresh', this.refreshEnd);
      },
      //确定进入下拉刷新的结束动作
      refreshEnd(e){
        this.refresherLastY = refresherOffsetY;
        this.animating = false;
        setTimeout(()=> {
          this.refresherStatus = 'finish'
          this.$refs.scroller.style.transform = 'translateY(' + refresherOffsetY + 'px)';
          this.pending =false
        },200)
      },
      update(){
      }
    },
    mounted(){
      //修复IOS不满一页内容无法滚动BUG
      this.$el.querySelector('.fix-holder').style.display = 'none'

      if( this.$listeners.more || this.$listeners.refresh || this.$listeners.scroll ) this.enableWatchScroll = true;
      if( this.$listeners.refresh ) this.enableRefresh = true;
      if( this.$listeners.more ) this.enableMore = true;

      //添加scroll绑定
      if(this.enableWatchScroll){
        this.$refs.scroller.addEventListener('scroll', this.handleScroll.bind(this))
      }
      //添加touch绑定
      if(this.enableRefresh){
        this.Finger = new AlloyFinger(this.$refs.scroller, {
          touchStart: this.touchStart,
          touchMove: this.touchMove,
          touchEnd:  this.touchEnd,
          pressMove: this.pressMove,
        });
      }
    },
    activated () {
      if(this.autoRefresh) {
        setTimeout(()=>{
          this.refreshBegin()
        }, 500)
      }
      //恢复滚动位置
      if(this.scrollKeep && (this.scrollKeepY !== this.$refs.scroller.scrollTop)) {
        this.$refs.scroller.scrollTop = this.scrollKeepY
      }
    },
    deactivated () {
      //记录滚动位置
      if(this.scrollKeep && (this.scrollKeepY !== this.$refs.scroller.scrollTop)) {
        this.scrollKeepY = this.$refs.scroller.scrollTop;
      }
    },
    beforeDestroy() {
      //移除scroll绑定
      if(this.enableWatchScroll){
        this.$refs.scroller.removeEventListener('scroll', this.handleScroll.bind(this))
      }
      //移除touch绑定
      if(this.enableRefresh){
        this.Finger = this.Finger.destroy();
      }
    }
  }
</script>
