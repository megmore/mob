/**
 * Created by nocoolyoyo on 2017/12/6.
 */
import Listview from './src/listview.vue'
import ListviewItem from './src/listview-item.vue'

Listview.install = function(Vue) {
  Vue.component(Listview.name, Listview);
}
ListviewItem.install = function(Vue) {
  Vue.component(ListviewItem.name, ListviewItem);
}

export {
  Listview,
  ListviewItem
}
