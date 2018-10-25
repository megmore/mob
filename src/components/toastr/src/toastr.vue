<template>
	<transition name="m-fade" v-on:after-leave="afterLeave">
		<div class="m-toast" v-if="show" :class="{'m-toast--center': location == 'center'|| location =='', 'm-toast--default': location == 'bottom', 'm-toast--top': location == 'top'}">
			<div class="m-toast-message" :style="toastStyle">
				<img :src="path" alt="" :style="imgStyle" v-if="path">
				<div class="m-toast__text" :style="textStyle">{{content}}</div>
			</div>
		</div>
	</transition>
</template>
<script>
  import pageChange from '../../../mixins/pageChange'
	export default {
    mixins: [pageChange],
		data () {
			return {
				show: false,
				content: '',
				duration: 2000,
				location: 'center',
				toastStyle: {},
				imgStyle: {},
				textStyle: {},
				path: '',
			}
		},
    methods: {
      afterLeave(){
          //离开动画结束后自动销毁当前的组件
        this.$destroy()
      }
    },
    destroyed(){
      //销毁完毕移除节点
      this.$el.remove()
    }
  }
</script>
