/**
 * Created by nocoolyoyo on 2017/12/6.
 */
import ActionSheet from './src/action-sheet.vue'
import ActionSheetItem from './src/action-sheet-item.vue'

ActionSheet.install = function(Vue) {
  Vue.component(ActionSheet.name, ActionSheet)
}
ActionSheetItem.install = function(Vue) {
  Vue.component(ActionSheetItem.name, ActionSheetItem)
}

export {
  ActionSheet,
  ActionSheetItem
}
