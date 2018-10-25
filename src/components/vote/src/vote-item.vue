<!--
      投票组件
      @params { Array } vote: 投票数据
      -->button
<template>
  <div class="m-vote-item" :class="{'selected':isOption===1}">
    <div class="m-vote-item--selection" @click="handleClick">
      <div class="selection-name">{{name}}</div>
      <div class="selection-count">
        <span v-if="isVote">{{count}}</span>
        <m-button type="thumb" class="ml-md" :class="{'active':isOption===0}"/>
      </div>
    </div>
    <div class="progress-bar" :style="{ width: getProgress}"></div>
  </div>
</template>

<script>

  export default {
    name: 'MVoteItem',
    props: {
      name: {
        type: String,
        default: ''
      },
      isVote: {
        type: Number,
        default: 0
      },
      isOption: {
        type: Number,
        default: 0
      },
      count: {
        type: Number,
        default:  0
      },
      total: {
        type: Number,
        default:  0
      }
    },

    computed: {
      getProgress() {
        if(this.isVote===0){
          return '0%'
        }else{
          return this.count*100/this.total + '%'
        }
      }
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  }
</script>
