<template>
  <transition name="fade" v-on:after-leave="afterLeave">
    <div class="m-confirm"  v-show="show">
      <div class="m-mask"></div>
      <div class="m-confirm--main">
        <assets-img class="logo" v-if="type !== ''" :name="getLogoName"/>
        <div class="m-confirm--main-title" style="font-weight: bold; ">
          {{title}}
        </div>
        <div class="m-confirm--main-content">
          {{content}}
        </div>
        <div class="m-confirm--main-handler">
          <m-button v-if="yesText !== ''" type="primary" size="md" @click.stop="confirm">
            <span>{{yesText}}</span>
          </m-button>
          <m-button v-if="noText !== ''"  type="default" size="md" @click.stop="cancel">
            <span>{{noText}}</span>
          </m-button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import pageChange from '../../../mixins/pageChange'
  import MButton from '../../button/src/button.vue'
  import AssetsImg from '../../assets-img/src/index'
  export default {
    mixins: [pageChange],
    components: {
        MButton,
	    AssetsImg
    },
    data() {
      return {
        show: false,
        title: '提示',
        type: '',   //success
        content: '',
        logo: '',
        yesText: '确定',
        noText: ''
      }
    },
    computed: {
      getLogoName(){
        return this.type === "success" ? 'icon-check' : ''
      }
    },
    methods: {
      cancel(){
        this.show = false;
      },
      confirm(){
        this.show = false;
      },
      afterLeave(){
        //离开动画结束后自动销毁当前的组件
        this.$destroy()
      }
    },
    destroyed(){
      //销毁完毕移除节点
      this.$el.remove()
    }
  }
</script>
