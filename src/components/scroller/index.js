/**
 * Created by nocoolyoyo on 2017/12/6.
 */
//import AndroidScroller from './src/android.vue';
import IosScroller from './src/ios.vue';

// let MScroller = AndroidScroller
// if(/ipad|iphone|mac/gi.test(navigator.userAgent)){
//   MScroller = IosScroller
// }
let MScroller = IosScroller
MScroller.install = function(Vue) {
  Vue.component(MScroller.name, MScroller);
};

export default MScroller;
