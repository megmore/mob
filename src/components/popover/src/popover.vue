<template>
	<transition name="m-fade" v-on:after-leave="afterLeave">
		<div class="m-popover" :style="{width: width}" v-if="show" :class="`m-popover--${location}`">
			<div class="m-popover-message">
				{{message}}
			</div>
		</div>
	</transition>
</template>
<script>
  import pageChange from '../../../mixins/pageChange'
	export default {
    mixins: [ pageChange ],
	data () {
		return {
			show: false,
			message: '',
			duration: 2000,
			location: 'top',
			path: '',
			width: '50vw'
		}
	},
    methods: {
      afterLeave(){
        this.$destroy()
      }
    },
    destroyed(){
      //销毁完毕移除节点
      this.$el.remove()
    }
  }
</script>
