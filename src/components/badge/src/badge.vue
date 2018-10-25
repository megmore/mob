<!--
      提醒标志组件
      -->
<template>
    <span class="m-badge" v-if="num !== 0">
        <!--<m-icon name="redpot" style="font-size: 2rem"></m-icon>-->
        <span class="m-badge-number">{{num > maxNum? override : num}}</span>
    </span>
</template>

<script>
  export default {
    name: 'MBadge',
      props: {
        num: {
          type: Number,
          default: 0
        },
        maxNum: {
          type: Number,
          default:  99
        },
        override: {
          type: String,
          default: 'N'
        }
      }
  }
</script>

