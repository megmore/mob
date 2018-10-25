<!--
    ListviewBox组件
-->
<template>
  <div class="listview-box" style="height: 100%">
    <slot></slot>
  </div>
</template>
<script>
  const refreshLimit = 100
  export default {
    name: 'ListviewBox',
    props: {
	    showArea: {
	    	type: Number,
            default: 2500
        }
    },
    data() {
      return {
      	limit: 60,
        curScrollTop: 0,
        curIndex: 0,
      	$items: [ ],
        reportTimer: null,
      }
    },

    methods: {
      run(scrollTop){
        if(scrollTop > this.curScrollTop + refreshLimit){
	        // console.log(scrollTop)
          this.handleRun(scrollTop, 'down')
          this.curScrollTop = scrollTop;
        }else if(scrollTop < this.curScrollTop - refreshLimit){
	        // console.log(scrollTop)
          this.handleRun(scrollTop, 'up')
          this.curScrollTop = scrollTop;
        }

      },
      handleRun(scrollTop, direction){
        this.$items = this.$el.querySelectorAll('.listview-item');
        this.$items.forEach($item => {
        	const $v = $item.__vue__
          // 滚动条高度+视窗高度 = 可见区域底部高度
          const visibleBottom = scrollTop + document.documentElement.clientHeight + this.showArea;
          // 可见区域顶部高度
          const visibleTop = scrollTop;

          const centerY = $item.offsetTop + ($item.offsetHeight * 1.2);
          const show = centerY > visibleTop && centerY < visibleBottom;
          if(show) {
            $v.$data.show = true
          }else{
            $v.$data.show = false
          }
        })
      },
      update(){

      },
      // runReport(){
      //   if(!this.reportTimer){
      //     this.reportTimer = setInterval(()=>{
      //       this.$emit('report', this)
      //     }, 3000)
      //   }
      // },
      // stopReport(){
      //   if(this.reportTimer) {
      //     clearInterval(this.reportTimer)
      //     this.reportTimer = null
      //   }
      // }
    },
    activated(){
      // this.runReport()
    },
    deactivated(){
      // this.stopReport()
    },
    beforeDestroy(){
      // this.stopReport()
    },
    mounted(){
	    console.log(this.showArea)
      // this.runReport()
    }
  };
</script>
