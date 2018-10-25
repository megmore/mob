<template>
  <div class="m-operation" :class="`${type}`" @click="$emit('click')">
    <div class="m-operation--icon" :class="{'active': isActive}"></div>
    <div class="m-operation--count" v-if="count !== 'undefined'">{{getCount}}</div>
  </div>
</template>
<script>
  export default {
    name: 'MOperation',
    props: {
      type: {
        type: String,
        require: true
      },
      isActive: {
        type: [Boolean, Number],
        default: false
      },
      count:Number,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      getCount() {
        if(this.count > 0 && this.count <1000){
          return this.count;
        }else if(this.count>=1000){
          return (this.count / 1000).toFixed(1) + 'k';
        }
        return ''
      }
    }
  };
</script>
