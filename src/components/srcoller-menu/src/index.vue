<!--
  @param {String}  type: 类型，可选值[ success, danger, warning, info,sticky]
  @param {String}  size:  尺寸，可选值[xs, sm, md, lg, xl]
-->
<template>
  <div class="scroller-menu">
    <div class="scroller-menu--wrapper">
      <slot></slot>
      <!--<div class="scroller-menu__item" @click="switcherSection(index)" :class="{'active':index == currentIndex}" v-for="(item,index) in sections">-->
        <!--<span>{{item.title}}</span>-->
        <!--<img v-if="$store.state.veteranSectionUnreadMap['section:' + item.sectionId] == 1" class="scroller-menu__item-redpoint" src="../../assets/img/onemt_redpoint.png">-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MScrollerMenu',
  };
</script>
