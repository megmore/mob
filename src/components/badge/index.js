/**
 * Created by nocoolyoyo on 2017/12/6.
 */
import MBadge from './src/badge.vue';

MBadge.install = function(Vue) {
  Vue.component(MBadge.name, MBadge);
};

export default MBadge;
