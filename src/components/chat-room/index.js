/**
 * Created by nocoolyoyo on 2017/12/6.
 */
import MChatRoom from './src/chat-room.vue';

MChatRoom.install = function(Vue) {
  Vue.component(MChatRoom.name, MChatRoom);
};

export default MChatRoom;
