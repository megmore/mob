<!--
    搜索输入框
    @param type {String}: 输入框类型
              @value button:  按钮类型，不做输入
              @value textarea:  输入框会被渲染成textarea
              @value inputType: 剩下就是各种原生的input类
    @param skin {String}: 输入框皮肤  (pure, primary)
    @param focused {Boolean}: 是否自动聚焦
    @param autoFocusDelay {Number}: 自动聚焦延时
-->
<template>
  <form class="m-input" :class="[`${skin}`, `${size}`]" @click="handleClick"  @submit.stop.prevent="handleEnter">
    <slot name="prefix">
    </slot>
    <template v-if="type === 'button'">
        <assets-img v-if="preIcon"  class="m-input-pre-icon mr-sm" size="sm" name="search"/>
        <input :placeholder="placeholder" disabled="disabled"/>
    </template>
    <div v-else-if="type === 'textarea'" class="m-input--textarea">
      <div class="m-input--textarea-inner">
          <textarea ref="input"  :placeholder="placeholder"
                        :rows="rows" :maxlength="maxlength"
                    :disabled="disabled || readonly"
                        :value="currentValue" @input="handleInput" @focus="handleFocus" @blur="handleBlur"></textarea>
        <slot name="surfix">
        </slot>
      </div>
      <slot name="extra"></slot>
    </div>
    <template v-else>
        <assets-img v-if="preIcon"  class="m-input-pre-icon mr-sm" size="sm" name="search"/>
        <input ref="input" :placeholder="placeholder" :maxlength="maxlength"
               :disabled="disabled || readonly"
                      :value="currentValue" @input="handleInput" @focus="handleFocus" @blur="handleBlur"/>
        <a v-if="clearable" :style="{ opacity: toggleClearBtn? 1:0 }"  @click="clearInput">
            <assets-img  size="sm" name="clear" class="search--button-clear  ml-sm"/>
        </a>
      <slot name="surfix"></slot>
    </template>
  </form>
</template>
<script>
  import AssetsImg from "../../assets-img/src/index";
  const isIos = /ipad|iphone|mac/gi.test(navigator.userAgent)

  export default {
    components: {AssetsImg},
    name: 'MInput',
    props: {
      value: [String, Number],
      type: {
        type: String,
        default: 'text'
      },
      preIcon: {
        type: [Boolean, String],
        default: false
      },
      placeholder: {
        type: String,
        default: 'Seach for something'
      },
      skin: {
        type: String,
        default: 'pure'
      },
      size: {
        type: String,
        default: 'md'
      },
      maxlength: Number,
      readonly: Boolean,
      disabled: Boolean,
      clearable: {
      	type: Boolean,
        default: true
      },
      rows: {
        type: Number,
        default: 1
      }
    },
    data(){
        return {
          currentValue: this.value,
        }
    },
    watch: {
      'value'(val, oldValue) {
        this.setCurrentValue(val);
      }
    },
    computed: {
      toggleClearBtn() {
        return this.currentValue && this.currentValue.length !== 0
      }
    },
    methods: {
      focus(e) {
        this.$refs.input.focus();
        if(isIos){
          this.$refs.input.click();
        }
      },
      blur(e) {
        this.$refs.input.blur();
      },
      handleEnter(){
        this.$emit('enter', this.currentValue)
        return false
      },
      handleClick(e) {
        if(this.type === 'button'){
          this.$emit('click', e)
        }
      },
      setCurrentValue(val){
        if (val === this.currentValue) return
        this.currentValue = val
      },
      handleInput(e) {
        const value = e.target.value

        this.$emit('input', value)
        this.setCurrentValue(value)
      },
      handleChange(e) {
        this.$emit('change',  e.target.value)
      },
      handleFocus(e) {
        this.$emit('focus', e)
      },
      handleBlur(e) {
        this.$emit('blur', e)
      },
      clearInput() {
        this.$emit('input', '');
        this.$emit('change', '');
        this.setCurrentValue('');
        this.focus();
      }
    },
    mounted(){

    }
  };
</script>
