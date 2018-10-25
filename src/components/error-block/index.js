/**
 * Created by nocoolyoyo on 2017/12/6.
 */
import ErrorBlock from './src/index';

ErrorBlock.install = function(Vue) {
  Vue.component(ErrorBlock.name, ErrorBlock);
};

export default ErrorBlock;
