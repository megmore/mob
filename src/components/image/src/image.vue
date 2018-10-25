<!--
    图片
    @param: {String} nSrc   //图片url
    @param: {String} dSrc   //无图片url
-->
<!--:class="{'rendered': src !== ''}"-->
<template>
  <div class='m-image'
       :class="{'rendered': src !== ''}"
       style="width: 100%"
       :style="style"
       @click="handleClick"
  >
    <!--<img :src="src" style="width: 100%">-->
  </div>
</template>
<script>
	import { imageLoaded } from 'es-treasure'
    const baseFontSize = Number(getComputedStyle(document.body)['font-size'].substring(0,2))
    let postWidth = window.screen.width - baseFontSize * 2
    console.log(postWidth)
	//let postWidth = 0

	export default {
		name: 'MImage',
		props: {
			nSrc: {
				type: String,
				default: ''
			},
			height:{
				type: [String, Number],
				default: ''
			},
			width:{
				type: [String, Number],
				default: ''
			},
			lockType: {
				type: String,
				default: ''
			},
		},
		watch: {
			'nSrc'(newVal, oldVal){
				this.updateImage()
			},
		},
		data(){
			return {
				src: '',
				ratio: 1,
				renderWith: 0
			}
		},
		computed: {
			style(){
				let styles = { height: this.ratio * this.renderWith + 'px'}
				if(this.src !== '') styles.backgroundImage = `url(${this.src})`
				return styles
			},
		},
		methods: {
			async updateImage(){
				await imageLoaded(this.nSrc)
				this.src = this.nSrc
			},
			handleClick(){
				this.$emit('click')
			}
		},
		mounted(){
			if(this.lockType === 'post'){
				if(postWidth === 0){
					postWidth = this.$el.clientWidth === 0 ? this.$el.clientWidth : this.$el.offsetWidth
				}
				this.renderWith = postWidth
			}else{
				this.renderWith = this.$el.clientWidth === 0 ? this.$el.clientWidth : this.$el.offsetWidth
			}
			this.ratio = Number(this.height) / Number(this.width)
			this.updateImage()
		}
	};
</script>
