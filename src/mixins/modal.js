/**
 * Created by nocoolyoyo on 2018/1/4.
 */
export default {
  props: {
    show: Boolean,
  },
  data(){
    return {
      toggle: this.show
    }
  },
  watch: {
    show (newVal, oldVal){
      this.toggle = newVal
    },
  },
  methods: {
    close(e) {
      console.log(e)
      this.$emit('update:show', false)
    }
  }
}




