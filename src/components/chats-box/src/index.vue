<!--
    聊天滚动容器组件
    @param { Function } onBottom: 滚动到底部回调
    @param { Function } onTop: 滚动到顶部部回调
    @param { Number } scrollTo: 初始化后滚动到某个位置（暂无添加）
    @param { Boolean } scrollKeep: 是否记住滚动条位置
-->
<template>
    <div class="chats-box">
      <div ref="scroller" class="chats-box-wrapper">
        <slot></slot>
        <div v-if="moreStatus !== 'hide'" class="chats-box--more-status">
          <span v-if="moreStatus !== ''"  >{{moreStatus}}</span>
            <div v-else class="m-loader"></div>
        </div>

      </div>
    </div>
</template>
<script>
  export default {
    name: 'ChatsBox',
    data() {
       return {
         scrollTop: 0,
         isTop: true,
         isBottom: false,
       }
    },
    props: {
      scrollKeep:  {
        type: Boolean,   //保留组件滚动位置
        default: true
      },
      pending:  {
        type: Boolean,
        default: false      //pending的时候，@refresh, @more将不会触发回调
      },
      moreStatus: ''      //loading, noMore
    },
    methods: {
      handleScroll(e) {
        this.isTop = (this.$refs.scroller.scrollTop === 0) ? true: false
        this.isBottom = (this.$refs.scroller.scrollTop + this.$refs.scroller.offsetHeight + 1>this.$refs.scroller.scrollHeight)? true: false   //加1的浮点计算误差
        if (this.$listeners.scroll){
          this.$emit('scroll',[e, this.$refs.scroller.scrollTop, this.isTop, this.isBottom]);
        }
        //滚动加载
        if(!this.pending && this.isBottom) {
          this.$emit('more', ()=>{});
        }
      },
      toBottom(){
        setTimeout(()=>{
          this.$refs.scroller.scrollTop = 0
        },50)
      }
  },
  mounted(){
    //添加scroll绑定
    this.$refs.scroller.addEventListener('scroll', this.handleScroll.bind(this))
  },
  activated () {
    //恢复滚动位置
    if(this.scrollKeep && this.scrollTop !== this.$refs.scroller.scrollTop) {
      this.$refs.scroller.scrollTop = this.scrollTop
    }
  },
  deactivated () {
    //记录滚动位置
    if(this.scrollKeep && this.scrollTop !== this.$refs.scroller.scrollTop) {
      this.scrollTop = this.$refs.scroller.scrollTop;
    }
  },
  beforeDestroy() {
    //移除scroll绑定
    this.$refs.scroller.removeEventListener('scroll', this.handleScroll.bind(this))
  }
}
</script>

