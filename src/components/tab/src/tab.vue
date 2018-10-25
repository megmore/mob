<template>
    <div class="m-tab" :class="cls">
        <slot></slot>
        <div></div>
    </div>
</template>
<script>
const component = {
    name: 'm-tab',
    provide(){
        return {
            root:this
        }
    },
    props: {
        value:{
            type:[String,Number],
            default:1
        },
	    type: {
		    type: String,
		    default: 'white'
	    },
        landscope:Boolean
    },
    data () {
        return {
            curIndex:1
        };
    },
    components: {},
    created () {
    },
    destroyed () {
    },
    mounted () {
        // if(this.landscope){
        //     let el=this.$el;
        //     let finded=false
        //     const scollerContainerCls='m-scroller-wrapper'
        //     while(el&&!finded){
        //         el=el.parentElement
        //         if(el.classList.contains(scollerContainerCls)){
        //             finded=true
        //         }
        //     }
        //     console.log(el)
        // }
    },
    computed: {
        cls(){
            const cls=[this.type]
            if(this.landscope){
                cls.push('m--landscope')
            }
            return cls
        }
    },
    methods: {
        change(val){
            this.curIndex=val
            this.$emit('input',val)
        }
    },
    watch:{
        value:{
            immediate:true,
            handler(val){
                this.curIndex=val
            }
        }
    }
};
export default component;
</script>
<style scoped lang="scss" rel="stylesheet/scss">
</style>
