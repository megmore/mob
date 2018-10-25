<!--
    ListviewBox组件
-->
<style lang="scss">
  .listview {
    position: relative;
  }
</style>
<script lang="jsx">
  export default {
    name: 'Listview',
    props: {
        items: {
            type: Array,
            default: []
        },
    },
    data(){
        return {
	        activeItems: [],
            heightsMap: [],
            topBuffer: 0,
            bottomBuffer: 0,
        }
    },
    watch: {
      data () {
          this.computeDisplayItems()
      },
    },
    provide(){
    	const vm = this
    	return {
		    appendHeight(val){
			    vm.heightsMap.push(val)
		    },
        }
    },
    methods: {
        handleScroll(e){
	        const scrollTop = e.target.scrollTop
            this.computeDisplay(scrollTop)
        },
        computeDisplay (scrollTop) {
            console.log(scrollTop)
            this.activeItems = this.items

            // const blockNumber = this.blockSize === 0 ? 0 : Math.floor(scrollTop / this.blockSize),
            //     blockStart = this.blockSize * blockNumber,
            //     blockEnd = blockStart + this.blockSize,
            //     apertureTop = Math.max(0, blockStart - this.preloadSize),
            //     apertureBottom = Math.min(this.totalScrollableHeight, blockEnd + this.preloadSize),
            //     displayIndexStart = Math.floor(apertureTop / this.itemHeight),
            //     nonZeroIndex = Math.ceil(apertureBottom / this.itemHeight),
            //     displayIndexEnd = nonZeroIndex > 0 ? nonZeroIndex - 1 : nonZeroIndex
            //
            // if (displayIndexStart === this.preStart && displayIndexEnd === this.preEnd) {
            //     return
            // }
            // this.preStart = displayIndexStart
            // this.preEnd = displayIndexEnd
            // this.activeItems = this.items.slice(displayIndexStart, displayIndexEnd + 1)
            // this.topBufferStyle.height = displayIndexStart * this.itemHeight + 'px'
            // this.bottomBufferStyle.height = Math.max(0, (this.items.length - displayIndexEnd - 1) * this.itemHeight) + 'px'
            //
            // if (displayIndexEnd + 1 >= this.items.length && !this.loading) {
            //     this.$emit('onInfiniteLoad')
            // }
        },
    },
    render(h){

        const { activeItems, topBuffer, bottomBuffer, $scopedSlots } = this

        return (<div class="listview">
                  <div class="listview-topBuffer" style={ topBuffer + 'px' } />
                  { activeItems.map(item => ($scopedSlots.default({ item }))) }
                  <div class="listview-topBuffer" style={ bottomBuffer + 'px' } />
                </div>)
    },
    mounted(){
    	// console.log()
	    this.$parent.$refs.scroller.addEventListener('scroll',  this.handleScroll)
	    this.computeDisplay()
    }
  };
</script>
