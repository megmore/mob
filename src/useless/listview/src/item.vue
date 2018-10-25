<!--
    ListviewBox组件
-->
<template>
  <div class="listview-item" :style="{ minHeight: height + 'px'}">
    <slot v-if="show"></slot>
  </div>
</template>
<script>
  export default {
    name: 'ListviewItem',

    data() {
      return {
      	height: 0,
        show: true,
      }
    },

    methods: {
    	update(){

      }
    },

    mounted(){
      this.$nextTick(()=>{
      	setTimeout(()=>{
          this.height = this.$el.offsetHeight
        },200)
      })
    }
  };
</script>
