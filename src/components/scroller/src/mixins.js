export default {
  provide(){
    return {
      scroller: this
    }
  },
  data () {
    return {
      listItems: [] //listitem组件实例
    }
  },
  methods: {
    //对scroller中的lisitem组件的provide
    addListItem (item) {
      this.listItems.push(item)
    },
    removeListItem (item) {
      this.listItems = this.listItems.filter(i => i !== item)
    },
    hideItemBlowContent () {//隐藏侧滑内容
      this.listItems.forEach(item => {
        item.xDistance = 0
      })
    }
  }
}
