/**
 * Created by nocoolyoyo on 2017/12/6.
 */
import Tab from './src/tab';
import TabItem from './src/tab-item';

Tab.install = function(Vue) {
    Vue.component(Tab.name, Tab);
};
TabItem.install = function(Vue) {
    Vue.component(TabItem.name, TabItem);
};

export {Tab, TabItem };
