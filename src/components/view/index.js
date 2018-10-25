/**
 * Created by nocoolyoyo on 2017/12/6.
 */
import MView from './src/view.vue';

MView.install = function(Vue) {
  Vue.component(MView.name, MView);
};

export default MView;
