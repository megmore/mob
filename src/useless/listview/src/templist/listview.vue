<!--
    ListviewBox组件
-->
<style lang="scss">
  .listview {
    position: relative;
  }
</style>
<script lang="jsx">
  const refreshLimit = 100
  const showArea = 2500

  export default {
    name: 'Listview',
    props: {
        data: {
            type: Array,
            default: []
        },
        limit: {
            type: Number,
            default: 20
        }
    },
    data(){
        return {
	        limit: 60,
	        curScrollTop: 0,
	        curIndex: 0,
        }
    },
    methods: {
      handleScroll(e){
      	const scrollTop = e.target.scrollTop
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
	      const visibleBottom = scrollTop + document.documentElement.clientHeight + this.showArea;
	      // 可见区域顶部高度
	      const visibleTop = scrollTop;

      	console.log(this.$children)
          // this.$items = this.$el.querySelectorAll('.listview-item');
          this.$items.forEach($item => {
              const $v = $item.__vue__
              // 滚动条高度+视窗高度 = 可见区域底部高度
              const visibleBottom = scrollTop + document.documentElement.clientHeight + this.showArea;
              // 可见区域顶部高度
              const visibleTop = scrollTop;

              const centerY = $item.offsetTop + ($item.offsetHeight * 1.2);
	          $v.$data.show = centerY > visibleTop && centerY < visibleBottom;
          })
      },
    },
    computed: {
      style(){
        return {
          minHeight : this.viewHeight + 'px'
        }
      },
    },
    render(h){
        const { data, style, $scopedSlots } = this

        return (
        	<div class="listview" style={style}>
              { data.map(item => ($scopedSlots.default({ item })))}
            </div>
        )
    },
    mounted(){
        console.log(this.$parent)
	    this.$parent.$refs.scroller.addEventListener('scroll',  this.handleScroll)
    }
  };
</script>
