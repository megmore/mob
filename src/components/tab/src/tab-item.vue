<template>
    <div class="m-tab-item" :class="{active:active}" @click="root.change(name)">
        <slot>

        </slot>
    </div>
</template>
<script>
const component = {
    name: 'm-tab-item',
    inject:['root'],
    props: {
        name:[String,Number]
    },
    computed: {
        active(){
            return this.name === this.root.curIndex
        }
    }
};
export default component;
</script>
<style scoped lang="scss" rel="stylesheet/scss">

</style>