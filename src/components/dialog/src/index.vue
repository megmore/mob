
<template>
  <transition name="fade" v-on:after-leave="afterLeave">
    <div class="m-dialog"  v-show="show">
       <div class="m-mask"></div>
       <div class="m-dialog--main">
         <div class="m-dialog--main-title">
           {{title}}
         </div>
         <div v-if="content !== ''" class="m-dialog--main-content">
           {{content}}
         </div>
         <m-input class="m-dialog--main-input"  :rows="rows" :placeholder="placeholder" v-model="message" type="textarea"/>

         <div class="m-dialog--main-handler">
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
  import MInput from '../../input/src/input'
  import MButton from '../../button/src/button'

  export default {
    mixins: [ pageChange ],
    components: { MInput, MButton },
    data() {
        return {
          show: false,
          title: '提示',
          content: '',
          message: '',
          rows: 1,
          placeholder:'',
          yesText: '确定',
          noText: '取消'
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
