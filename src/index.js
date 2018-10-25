import {ActionSheet,ActionSheetItem} from './components/action-sheet/index.js';
import AssetsImg from './components/assets-img/index.js';
import MAvatar from './components/avatar/index.js';
import MBadge from './components/badge/index.js';
import MBlockquto from './components/blockquto/index.js';
import MButtonGroup from './components/button-group/index.js';
import MButton from './components/button/index.js';
import MChatRoom from './components/chat-room/index.js';
import ChatsBox from './components/chats-box/index.js';
import Confirm from './components/confirm/index.js';
import Dialog from './components/dialog/index.js';
import ErrorBlock from './components/error-block/index.js';
import MFooter from './components/footer/index.js';
import Guide from './components/guide/index.js';
import MHeader from './components/header/index.js';
import HtmlBox from './components/html-box/index.js';
import MIcon from './components/icon/index.js';
import ImageBrowser from './components/image-browser/index.js';
import MImageSelector from './components/image-selector/index.js';
import MImage from './components/image/index.js';
import MInput from './components/input/index.js';
import MLabel from './components/label/index.js';
import MListItem from './components/list-item/index.js';
import Loading from './components/loading/index.js';
import MModal from './components/modal/index.js';
import MOperation from './components/operation/index.js';
import Popover from './components/popover/index.js';
import MScroller from './components/scroller/index.js';
import MScrollerMenu from './components/srcoller-menu/index.js';
import {Tab,TabItem} from './components/tab/index.js';
import MTag from './components/tag/index.js';
import MTitle from './components/title/index.js';
import Toastr from './components/toastr/index.js';
import MView from './components/view/index.js';
import {Vote,VoteItem} from './components/vote/index.js';

    
    import nativeDatePick from './directives/native-date-pick.js'
    const components=[
       ActionSheet,   ActionSheetItem,   AssetsImg,   MAvatar,   MBadge,   MBlockquto,   MButtonGroup,   MButton,   MChatRoom,   ChatsBox,   ErrorBlock,   MFooter,   Guide,   MHeader,   HtmlBox,   MIcon,   MImageSelector,   MImage,   MInput,   MLabel,   MListItem,   Loading,   MModal,   MOperation,   MScroller,   MScrollerMenu,   Tab,   TabItem,   MTag,   MTitle,   MView,   Vote,   VoteItem
    ]
    const directives=[
        nativeDatePick
    ]
    
    const install = function (Vue, opts = {}) {
        components.forEach(component => {
            if (component.name) {
                const name = component.name
                Vue.component(name, component)
            }
        });
        directives.forEach(directive => {
            if (directive.name) {
                Vue.directive(directive.name, directive)
            }
        });
        
        Vue.prototype.$confirm = Confirm;
        Vue.prototype.$toast = Toastr;
        Vue.prototype.$dialog = Dialog;
        Vue.prototype.$popover = Popover;
        Vue.prototype.$imagebrowser = ImageBrowser;
    };
    /* istanbul ignore if */
    if (typeof window !== 'undefined' && window.Vue) {
        install(window.Vue);
    }
    
    export default{
        install,
       ActionSheet,
   ActionSheetItem,
   AssetsImg,
   MAvatar,
   MBadge,
   MBlockquto,
   MButtonGroup,
   MButton,
   MChatRoom,
   ChatsBox,
   Confirm,
   Dialog,
   ErrorBlock,
   MFooter,
   Guide,
   MHeader,
   HtmlBox,
   MIcon,
   ImageBrowser,
   MImageSelector,
   MImage,
   MInput,
   MLabel,
   MListItem,
   Loading,
   MModal,
   MOperation,
   Popover,
   MScroller,
   MScrollerMenu,
   Tab,
   TabItem,
   MTag,
   MTitle,
   Toastr,
   MView,
   Vote,
   VoteItem
    }
    
    
    export {
       ActionSheet,
   ActionSheetItem,
   AssetsImg,
   MAvatar,
   MBadge,
   MBlockquto,
   MButtonGroup,
   MButton,
   MChatRoom,
   ChatsBox,
   Confirm,
   Dialog,
   ErrorBlock,
   MFooter,
   Guide,
   MHeader,
   HtmlBox,
   MIcon,
   ImageBrowser,
   MImageSelector,
   MImage,
   MInput,
   MLabel,
   MListItem,
   Loading,
   MModal,
   MOperation,
   Popover,
   MScroller,
   MScrollerMenu,
   Tab,
   TabItem,
   MTag,
   MTitle,
   Toastr,
   MView,
   Vote,
   VoteItem
    }
    // 