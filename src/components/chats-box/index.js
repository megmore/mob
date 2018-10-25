/**
 * Created by nocoolyoyo on 2017/12/6.
 */
import ChatsBox from './src/index.vue';

ChatsBox.install = function(Vue) {
  Vue.component(ChatsBox.name, ChatsBox);
};

export default ChatsBox;
