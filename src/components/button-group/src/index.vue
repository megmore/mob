<!--
    按钮组件
    @param: type {String}   //按钮皮肤
                    primary default
    @param: status {String}   //按钮状态，normal, pending, disable,其中pending和disable会使按钮禁止点击
    @param: size {String}   //按钮尺寸， md,sm, lg
    @param: preset {String}   //按钮预设，一些图片按钮
                      tab1,account1,account2, thumb
-->
<template>
  <div class="m-button-group">
  <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'MButtonGroup',
  };
</script>
