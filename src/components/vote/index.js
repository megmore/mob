/**
 * Created by nocoolyoyo on 2017/12/6.
 */
import Vote from './src/vote.vue';
import VoteItem from './src/vote-item.vue';

Vote.install = function(Vue) {
  Vue.component(Vote.name, Vote);
};
VoteItem.install = function(Vue) {
  Vue.component(VoteItem.name, VoteItem);
};


export {
  Vote,
  VoteItem
};
