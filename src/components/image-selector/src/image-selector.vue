<template>
  <div class="m-image-selector">
    <div class="m-image--item" @click="clickImage(item)" v-for="(item, index) in value" :style="{backgroundImage: `url(${item[imgKey]})`}" :key="index">
      <div v-if="!protected" class="icon-delete" @click.stop="removeImage(index)">
        <assets-img name="clear"/>
      </div>
    </div>
    <div v-if="!protected" class="m-image--item m-image-plus" @click="chooseImage"></div>
  </div>
</template>
<script>
  import AssetsImg from '../../assets-img/src'
  export default {
  	name: 'MImageSelector',
    components: {
        AssetsImg
    },
    props: {
      value: {
      	type: Array,
        default: []
      },
      protected: {
      	type: Boolean,
        default: false
      },
      imgKey:{
	      type: String,
	      default: 'url'
      },
    },
  	data() {
      return {
        url: '',
        $image: null,
        show: false,
        initScale: 1,
        topPx: 0,
        showMore: false,
        closeTimer: null
      }
    },
    methods: {
	    removeImage(index){
	    	this.$emit('update', this.value.splice(index, 1))
        },
	    chooseImage(){
		    this.$emit('choose')
        },
	    clickImage(item){
		    this.$emit('clickImage', item)
	    }
    }
  }
</script>
