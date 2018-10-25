<template>
    <transition name="fade">
        <div class="guide" v-if="toggle" @click="handleClick">
            <div class="m-mask"></div>
            <div class="guide-content" :class="{'reverse-x': reverseX, 'reverse-y': reverseY}" :style="style">
                <div>{{message}}</div>
            </div>
        </div>
    </transition>
</template>
<script>
  import modal from '../../../mixins/modal'

  export default {
    name: 'Guide',
    mixins: [ modal ],
    props: {
        message: {
            type: String,
            require: true,
        },
        position: {
	        default: () => {
	        	return {
			        left: '0',
			        top: '0',
                }
            },
        },
        width: {
	        type: String,
	        default: '15rem',
        },
	    height: {
	        type: String,
	        default: '7rem',
        },
        reverseX: {
            type: Boolean,
            default: false,
        },
	    reverseY:{
		    type: Boolean,
		    default: false,
	    },
    },
    methods: {
	    handleClick(){
	    	this.$emit('click')
        }
    },
    computed: {
        style(){
        	return Object.assign(this.position, {
		        height: this.height,
		        width: this.width,
	        })
        }
    },
    mounted(){
	    document.body.appendChild(this.$el);
    }
  }
</script>