<!--
    滚动容器组件
    @param { Function } onBottom: 滚动到底部回调
    @param { Function } onTop: 滚动到顶部部回调
    @param { Function } onScroll: 滚动回调
    @param { Number } scrollTo: 初始化后滚动到某个位置（暂无添加）
    @param { Boolean } scrollKeep: 是否记住滚动条位置
-->
<!--<style scoped>-->
  <!--.m-refresher {-->
    <!--display: flex;-->
    <!--/*margin: 0 auto;*/-->
    <!--color: #2196f3;-->
    <!--align-items: center;-->
    <!--justify-content: center;-->
    <!--background-color: #fff;-->
    <!--border-radius: 50%;-->
    <!--box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);-->
    <!--/*position: absolute;*/-->
    <!--/*left: 50%;*/-->
    <!--/*margin-left: -18px;*/-->
    <!--/*margin-top: 24px;*/-->
    <!--/*z-index: 90;*/-->
  <!--}-->
<!--</style>-->
<template>
    <div class="m-scroller android-scroller">
      <img v-if="enableRefresh"
           src="./android-refresher.png"
           ref="refresher"
           class="m-refresher"
           :class="refresherStatus" />
      <!--<div v-if="enableRefresh"-->
           <!--ref="refresher"-->
           <!--class="m-refresher"-->
           <!--:class="refresherStatus">-->
        <!--<div class="m-loader dark"></div>-->
      <!--</div>-->
      <div ref="scroller" class="m-scroller-wrapper">
        <div style="padding:0; min-height: 100%">
          <slot></slot>
          <div v-if="enableMore && moreStatus!=='hide'" class="m-scroller--more-status">
            <span v-if="moreStatus !== ''"  >{{moreStatus}}</span>
            <div v-else class="m-loader"></div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import { getStyle } from 'es-treasure'
  import AlloyFinger from 'alloyfinger/alloy_finger' // 手势库
  import mix from './mixins'
  //为了下拉刷新动画的流畅，直接原生操作节点，不做vue过渡
  let htmlFs = 0
  let refresherSize = 1.1 * htmlFs,
      refresherOffsetY = - refresherSize,
      refresherActiveY = refresherSize,
      refresherMaxY = 2 * refresherSize


  export default {
    name: 'MScroller',
    mixins:[mix],
    data (){
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
         enableWatchScroll: false,
         enableRefresh: false,
         enableMore: false,
         refresherStatus: 'normal',    //refresherStatus动画状态
       }
    },
    props: {
      scrollKeep: {
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
      handleScroll (e){
        this.isTop = (this.$refs.scroller.scrollTop === 0)
        this.isBottom = (this.$refs.scroller.scrollTop + this.$refs.scroller.offsetHeight + 5>this.$refs.scroller.scrollHeight)  //加5的浮点计算误差

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
      swipe(e){
        console.log(e)
      },
      //以下方法只有当存在onRefresh生效
      touchStart (e){
        if(!this.pending && this.isTop){
          this.touchStartY = e.changedTouches[0].pageY
        }
      },
      // 触摸移动
      pressMove (e){

          if(!this.pending && this.isTop &&  e.changedTouches[0].pageY > this.touchStartY ){
            if(this.refresherStatus !== 'pulling') this.refresherStatus = 'pulling'
            this.refresherLastY += e.deltaY/2;
            if( this.refresherLastY > refresherMaxY ) {
              this.refresherLastY = refresherMaxY ;
              return
            }else{
              this.$refs.refresher.style.top = this.refresherLastY + 'px';
              this.$refs.refresher.style.transform = `rotate(${this.refresherLastY*3}deg)`;
            }
            e.preventDefault();
          }

      },
      touchEnd (e){
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
      refreshBegin (e){
        this.refresherStatus = 'rolling'
        this.$refs.refresher.style.top = refresherActiveY + 'px';
        this.refresherLastY = refresherActiveY;
        this.animating = true;
        this.pending = true;
        this.$emit('refresh', this.refreshEnd);
      },
      //中断下拉刷新的结束动作
      refreshStop (e){
        this.refresherStatus = 'finish'
        this.$refs.refresher.style.top = refresherOffsetY + 'px';
        this.refresherLastY = refresherOffsetY;
        this.animating = false;
      },
      //下拉刷新的开始动作
      refreshStart (e){
        this.$refs.refresher.style.top = refresherActiveY + 'px'
        this.refresherLastY = refresherActiveY
        this.animating = true;
        this.pending = true;
        this.$emit('refresh', this.refreshEnd);
      },
      //确定进入下拉刷新的结束动作
      refreshEnd (e){
        this.refresherLastY = refresherOffsetY;
        this.animating = false;
        setTimeout( ()=> {
          this.refresherStatus = 'finish'
          this.$refs.refresher.style.top = refresherOffsetY + 'px';
          this.pending =false
        },200)
      },
      update(){

      }
  },
  mounted(){
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
         swipe: this.swipe
       });
     }

    this.$nextTick(()=>{
      if(htmlFs === 0 && document.querySelector('.m-refresher')){
        htmlFs = getStyle(document.querySelector('.m-refresher'), 'height')
        htmlFs = htmlFs.substr(0, htmlFs.length -2)
        refresherSize = htmlFs
        refresherOffsetY = - refresherSize
        refresherActiveY = refresherSize
        refresherMaxY = 2 * refresherSize
        this.refresherLastY = refresherOffsetY
      }
    })

  },
  activated () {
    if(this.autoRefresh) {
      setTimeout(()=>{
        this.refreshBegin()
      }, 500)
    }
    //恢复滚动位置
    if(this.scrollKeep && this.scrollKeepY !== this.$refs.scroller.scrollTop) {
      this.$refs.scroller.scrollTop = this.scrollKeepY
    }
  },
  deactivated () {
    //记录滚动位置
    if(this.scrollKeep && this.scrollKeepY !== this.$refs.scroller.scrollTop) {
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
