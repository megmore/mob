<template>
  <transition name="fade" @after-leave="afterLeave">
    <div class="m-action-sheet" v-if="toggle">
      <div class="m-mask" @click="close"></div>
      <div class="m-action-sheet--main">
        <div class="m-action-sheet--title" v-if="title !== ''">{{title}}</div>
        <slot>
        </slot>
      </div>
    </div>
  </transition>
</template>
<script>
import modal from '../../../mixins/modal';

export default {
  name: 'MActionSheet',
  mixins: [modal],
  props: {
    title: {
    	type: String,
        default: ''
    }
  },
  methods: {
    afterLeave(){
      this.$emit('afterLeave')
    }
  },
  mounted () {
    document.body.appendChild(this.$el);
    window.addEventListener('hashchange', this.afterLeave);
    window.addEventListener('popstate', this.afterLeave);
    window.addEventListener('pagehide', this.afterLeave);
  },
  beforeDestroy(){
    window.removeEventListener('hashchange', this.afterLeave);
    window.removeEventListener('popstate', this.afterLeave);
    window.removeEventListener('pagehide', this.afterLeave);
  },
};
</script>
