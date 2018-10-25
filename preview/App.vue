<template>
    <div id="app">
        <m-view :status="status">
            <m-header slot="head" title="SDK基础组件">
                <m-button slot="left">
                    <m-icon name="arrow_back" />
                </m-button>
                <!--<m-button slot="right" class="btn-follow" @click="changeStatus"/>-->
            </m-header>
                <m-scroller v-if="showHome" id="home" @refresh="handleRefresh" @more="handleMore" @scroll="handleScroll">
                    <m-list-item @click="clickItem">
                        <div style="color: #fff" slot="content">
                            adasadasadasadasadas
                        </div>
                        <div slot="below-content">
                            X
                        </div>
                    </m-list-item>
                    <div>
                        <m-title type="board" name="头部导航" />
                        <m-header title="头部导航组件">
                            <m-button slot="right" class="btn-follow"/>
                        </m-header>
                    </div>
                    <div>
                        <m-title type="board" name="按钮" />
                        <div class="px-md">
                            <m-button class="my-sm" type="primary" size="md">primary</m-button>
                            <m-button class="my-sm" type="default" size="md">default</m-button>
                            <m-button class="my-sm" type="pure" size="md">pure</m-button>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="输入框" />
                        <div class="px-md">
                            <m-input class="my-sm" skin="default" type="text" placeholder="skin default" />
                            <m-input class="my-sm"  type="text" placeholder="preicon" :preIcon=true />
                            <m-input class="my-sm" :rows="4" type="textarea" placeholder="textarea" />
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="模态框" />
                        <div class="px-md">
                            <m-button @click="modal=!modal" type="primary" size="md">打开Modal</m-button>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="Popover" />
                        <div class="px-md">
                            <a @click="openPopover($event)" class="color-info" style="cursor:pointer;text-align: center;display: block;">打开Popover</a>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="ActionSheet" />
                        <div class="px-md">
                            <m-button @click="bindActions.show = true" type="primary" size="md">打开actionSheet</m-button>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="comfirm" />
                        <div class="px-md">
                            <m-button type="primary" size="md" @click="handleConfirm">打开comfirm</m-button>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="dialog" />
                        <div class="px-md">
                            <m-button type="primary" size="md" @click="handleDialog">打开dialog</m-button>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="toast" />
                        <div class="px-md">
                            <m-button type="primary" size="md" @click="handleToast">打开toast</m-button>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="分割线" />
                        <div class="px-md">
                            <div style="text-align: center">
                                scss: @extend %divider-card
                                <br>
                                class: m-divider card
                            </div>
                            <div class="m-divider card"></div>
                            <div class="m-divider night"></div>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="native时间选择" />
                        <div class="px-md">
                            <m-button v-native-date-pick:date  @dateSelect="callBack"  type="primary" size="md">打开时间选择</m-button>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="图片选择，图片画廊" />
                        <div class="px-md">
                            <m-image-selector v-model="Images"></m-image-selector>
                            <m-image-selector :protected="true" v-model="Images"></m-image-selector>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="图片浏览" />
                        <div class="px-md">
                            <m-image @click="showImage(src)" style="max-height: 40rem" v-for="src in datas" width="600" height="400"  :n-src="src"/>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="tab" />
                        <div>
                            <m-tab value="123">
                                <m-tab-item name="123">xxxxxxxxxx</m-tab-item>
                                <m-tab-item :name="2">xxxxxxxxxx</m-tab-item>
                                <m-tab-item :name="3">xxxxxxxxxx</m-tab-item>
                            </m-tab>
                            <m-tab value="123" type="dark">
                                <m-tab-item name="123">xxxxxxxxxx</m-tab-item>
                                <m-tab-item :name="2">xxxxxxxxxx</m-tab-item>
                                <m-tab-item :name="3">xxxxxxxxxx</m-tab-item>
                            </m-tab>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="badge" />
                        <div class="px-md">
                            <m-badge :num="5"/>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="icons" />
                        <div class="px-md" style="display: flex;">
                            <!--<m-icon name="VETERAN" size="20" type="warning"/>-->
                            <m-label name="ADMIN" />
                            <m-label name="NEW" />
                            <m-label name="MOD" />
                            <m-label name="GM" />
                            <m-label name="VETERAN" />
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="投票" />
                        <div v-for="data in posts"  class="px-md">
                            <m-vote v-if="data.type==='vote'" :class="{'is-voted':data.isVote}" >
                                <m-vote-item v-for="(option, index) in data.optionList"
                                             :key="index"
                                             :count="option.optionVoteCount"
                                             :total="data.voteCount"
                                             :is-vote="data.isVote"
                                             :is-option="option.isOption"
                                             :name="option.optionContent"
                                             @click.stop="handleVote(option)"/>
                            </m-vote>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="error-block" />
                        <div class="px-md">
                            <error-block v-for="item in ErrorBlocks" :name="item" :message="item"></error-block>
                        </div>
                    </div>
                    <div>
                        <m-title type="board" name="chatroom" />
                        <chats-box style="height: 300px">
                            <div class="m-chat-room">
                                <div class="chat-item"  :class="{ 'item-me': item.isMe, 'item-other': !item.isMe}" v-for="item in ChatRoom">
                                    <div class="item-head">
                                        <m-avatar class="item-avatar" size="sm" type="round" :n-src="item.avatar"/>
                                        <div class="item-author">
                                            <span class="item-name" v-html="item.name"></span>
                                        </div>
                                    </div>
                                    <div class="item-body">
                                        <div class="item-content-box">
                                            <div>
                                                <div v-html="item.content"></div>
                                                <m-image style="width: 150px;height: 150px;margin-top: .2rem;" class="item-content-img" :n-src="item.thumbPic"/>
                                            </div>
                                            <div class="item-content-link">
                                                <div>连接连接连接连接连接连接连接连接连接连接连接</div>
                                            </div>
                                        </div>
                                        <div class="item-time">{{item.time}}</div>
                                    </div>
                                </div>
                            </div>
                        </chats-box>
                    </div>
                </m-scroller>

                <m-modal :show.sync="modal"></m-modal>
                <m-action-sheet class="action-sheet-share" title="绑定方式" :show.sync="bindActions.show">
                    <m-action-sheet-item>
                        哈哈实打实的拉萨的吗
                    </m-action-sheet-item>
                    <m-action-sheet-item preset="facebook"/>
                    <m-action-sheet-item preset="twitter"/>
                    <m-action-sheet-item preset="whatsapp"/>
                    <m-action-sheet-item preset="instagram"/>
                </m-action-sheet>


            <!--<m-footer slot="foot">-->
            <!--<m-tab v-model="index" style="height:100%" type="dark">-->
            <!--<m-tab-item name="home" class="pt-sm" style="width: calc(100%/4)">-->
            <!--<m-icon name="home" size="18" />-->
            <!--<span class="mt-xs">Home</span>-->
            <!--</m-tab-item>-->
            <!--<m-tab-item name="find" class="pt-sm" style="width: calc(100%/4)">-->
            <!--<m-icon name="find" size="18" />-->
            <!--<span class="mt-xs">Find</span>-->
            <!--<m-icon class="color-danger" name="redpot" style="position: absolute;top:.6rem;right:2.2rem;" size="10" />-->
            <!--</m-tab-item>-->
            <!--<m-tab-item name="message" class="pt-sm" style="width: calc(100%/4)">-->
            <!--<m-icon name="message" size="18" />-->
            <!--<span class="mt-xs">Message</span>-->
            <!--<m-badge style="top:.2rem;right:1.5rem;position: absolute" num="1" />-->
            <!--</m-tab-item>-->
            <!--<m-tab-item name="myzone" class="pt-sm" style="width: calc(100%/4)">-->
            <!--<m-icon name="person" size="18" />-->
            <!--<span class="mt-xs">My</span>-->
            <!--</m-tab-item>-->
            <!--</m-tab>-->
            <!--</m-footer>-->
        </m-view>
    </div>
</template>
<script>
	import { ImageBrowser } from '../src'
	import statistReport from 'onemt-statist-report'
	import Toastr from '../src/components/toastr'

	let statusIndex = 0

	export default {
		data(){
			return {
				index: 'home',
				modal:false,
				showHome: true,
				showGuide: true,
				Images: [{
					url:'http://img1.imgtn.bdimg.com/it/u=3666618469,3718107238&fm=27&gp=0.jpg',
				}, {
					url:'http://img1.imgtn.bdimg.com/it/u=3666618469,3718107238&fm=27&gp=0.jpg',
				}],
				status: 'done',
				datas: [
					"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534233184&di=b0dc9431d3cd51a7bb47a685278857aa&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dc195951d604a8012193a3a885a2.jpg%401280w_1l_2o_100sh.jpg"
				],
				posts: (()=>{
					let result = []
					for(let i=0; i<1; i++){
						result = result.concat(   [{"id":1448,"content":"你觉得你是谁","boardId":114,"boardName":"en-普通投票11","boardIcon":"https://hayyaimagedebug.onemt.co/board/20171016/dda03a85-57ae-4b5e-ac44-3f9c98293fad.png","isPopular":1,"type":"vote","likeCount":0,"commentCount":2,"isSuggested":0,"pictures":[{"original":{"width":"3831","webpUrl":"https://hayyaimagedebug.onemt.co/post/20180606/19cafdd5-dfdc-4185-b099-a081b5eeb2c7.jpg","relativeUrl":"post/20180606/19cafdd5-dfdc-4185-b099-a081b5eeb2c7.jpg","url":"https://hayyaimagedebug.onemt.co/post/20180606/19cafdd5-dfdc-4185-b099-a081b5eeb2c7.jpg","height":"2554"}}],"video":"","createTime":1528255021,"isBoardFollow":1,"isLike":0,"avatar":"https://hayyaimagedebug.onemt.co/appuser/20170627/120x97_0d7809a9-255b-41ba-8f87-f216b5e7382b.png","nickname":"管理员","appUserId":101005,"identity":"admin","likes":[],"actionTypes":["report"],"postVideo":null,"userId":"256eda75dd68cd31d0dda5a5e4eb8a19","lastReplyTime":1528255021,"shareUrl":"http://10.0.0.52:8102/p/1448","isSticky":0,"shareCount":3,"optionList":[{"optionId":158,"optionContent":"大神","optionVoteCount":0,"isOption":0},{"optionId":159,"optionContent":"傻逼","optionVoteCount":1,"isOption":1}],"isVote":1,"voteCount":1},{"id":1447,"content":"NBA总冠军是？","boardId":114,"boardName":"en-普通投票11","boardIcon":"https://hayyaimagedebug.onemt.co/board/20171016/dda03a85-57ae-4b5e-ac44-3f9c98293fad.png","isPopular":0,"type":"vote","likeCount":0,"commentCount":0,"isSuggested":0,"pictures":[{"original":{"width":"640","webpUrl":"https://hayyaimagedebug.onemt.co/post/20180606/dd68487f-dd45-4f4f-9610-add08b78bc79.jpeg","relativeUrl":"post/20180606/dd68487f-dd45-4f4f-9610-add08b78bc79.jpeg","url":"https://hayyaimagedebug.onemt.co/post/20180606/dd68487f-dd45-4f4f-9610-add08b78bc79.jpeg","height":"640"}}],"video":"","createTime":1528253855,"isBoardFollow":1,"isLike":0,"avatar":"https://hayyaimagedebug.onemt.co/appuser/20170627/120x97_0d7809a9-255b-41ba-8f87-f216b5e7382b.png","nickname":"管理员","appUserId":101005,"identity":"admin","likes":[],"actionTypes":["report"],"postVideo":null,"userId":"256eda75dd68cd31d0dda5a5e4eb8a19","lastReplyTime":1528253855,"shareUrl":"http://10.0.0.52:8102/p/1447","isSticky":0,"shareCount":0,"optionList":[{"optionId":155,"optionContent":"勇士","optionVoteCount":1,"isOption":1},{"optionId":156,"optionContent":"骑士","optionVoteCount":0,"isOption":0},{"optionId":157,"optionContent":"湖人","optionVoteCount":0,"isOption":0}],"isVote":1,"voteCount":1},{"id":1446,"content":"你喜欢男人还是女人","boardId":114,"boardName":"en-普通投票11","boardIcon":"https://hayyaimagedebug.onemt.co/board/20171016/dda03a85-57ae-4b5e-ac44-3f9c98293fad.png","isPopular":1,"type":"vote","likeCount":0,"commentCount":6,"isSuggested":0,"pictures":[{"original":{"width":"600","webpUrl":"https://hayyaimagedebug.onemt.co/post/20180606/1c7496ca-be00-47c7-a6cb-ae9e54fb70a7.jpg","relativeUrl":"post/20180606/1c7496ca-be00-47c7-a6cb-ae9e54fb70a7.jpg","url":"https://hayyaimagedebug.onemt.co/post/20180606/1c7496ca-be00-47c7-a6cb-ae9e54fb70a7.jpg","height":"600"}}],"video":"","createTime":1528253184,"isBoardFollow":1,"isLike":0,"avatar":"https://hayyaimagedebug.onemt.co/appuser/20170627/120x97_0d7809a9-255b-41ba-8f87-f216b5e7382b.png","nickname":"管理员","appUserId":101005,"identity":"admin","likes":[],"actionTypes":["report"],"postVideo":null,"userId":"256eda75dd68cd31d0dda5a5e4eb8a19","lastReplyTime":1528253184,"shareUrl":"http://10.0.0.52:8102/p/1446","isSticky":0,"shareCount":0,"optionList":[{"optionId":151,"optionContent":"男人","optionVoteCount":1,"isOption":1},{"optionId":152,"optionContent":"女人","optionVoteCount":0,"isOption":0},{"optionId":153,"optionContent":"都喜欢","optionVoteCount":0,"isOption":0},{"optionId":154,"optionContent":"都不喜欢","optionVoteCount":0,"isOption":0}],"isVote":1,"voteCount":1},{"id":698,"content":"投票11111❤️","boardId":114,"boardName":"en-普通投票11","boardIcon":"https://hayyaimagedebug.onemt.co/board/20171016/dda03a85-57ae-4b5e-ac44-3f9c98293fad.png","isPopular":1,"type":"vote","likeCount":0,"commentCount":0,"isSuggested":0,"pictures":[{"low":{"width":"108","webpUrl":"https://hayyaimagedebug.onemt.co/post/20171016/dbad74af-d944-4275-9e9a-6ce17fde79be.webp","relativeUrl":"post/20171016/dbad74af-d944-4275-9e9a-6ce17fde79be.png","url":"https://hayyaimagedebug.onemt.co/post/20171016/dbad74af-d944-4275-9e9a-6ce17fde79be.png","height":"108"},"original":{"width":"108","webpUrl":"https://hayyaimagedebug.onemt.co/post/20171016/dbad74af-d944-4275-9e9a-6ce17fde79be.webp","relativeUrl":"post/20171016/dbad74af-d944-4275-9e9a-6ce17fde79be.png","url":"https://hayyaimagedebug.onemt.co/post/20171016/dbad74af-d944-4275-9e9a-6ce17fde79be.png","height":"108"},"medium":{"width":"108","webpUrl":"https://hayyaimagedebug.onemt.co/post/20171016/108x108_dbad74af-d944-4275-9e9a-6ce17fde79be.webp","relativeUrl":"post/20171016/108x108_dbad74af-d944-4275-9e9a-6ce17fde79be.png","url":"https://hayyaimagedebug.onemt.co/post/20171016/108x108_dbad74af-d944-4275-9e9a-6ce17fde79be.png","height":"108"}}],"video":"","createTime":1508136868,"isBoardFollow":1,"isLike":0,"avatar":"https://hayyaimagedebug.onemt.co/appuser/20170627/120x97_0d7809a9-255b-41ba-8f87-f216b5e7382b.png","nickname":"管理员","appUserId":101005,"identity":"admin","likes":[],"actionTypes":["report"],"postVideo":null,"userId":"256eda75dd68cd31d0dda5a5e4eb8a19","lastReplyTime":1508136868,"shareUrl":"http://10.0.0.52:8102/p/698","isSticky":0,"shareCount":0,"optionList":[{"optionId":119,"optionContent":"100000000000000001","optionVoteCount":2,"isOption":1},{"optionId":120,"optionContent":"200000000000000002","optionVoteCount":1,"isOption":0},{"optionId":121,"optionContent":"300000000000000003","optionVoteCount":1,"isOption":0}],"isVote":1,"voteCount":4}])
					}
					return result
				})(),
				bindActions:{
					show: false
				},
                ErrorBlocks: [  'content',
                                'message',
                                'following',
                                'post',
                                'face',
                                'notice',
                                'favorite' ],
				ChatRoom: [{
					isMe: true,
                    name: '二万人',
                    avatar: 'https://s3.eu-central-1.amazonaws.com/hayya-debug/gamesysphoto/19/head_m_002.png?v=2018062101  ',
                    content: 'nothim dsfsd sfdsfewfe wefdf  look like as week long time a shit hahaa',
                    time: '2017-08-12 15:55:55'
                },{
					isMe: false,
					name: '二万人',
					avatar: 'https://s3.eu-central-1.amazonaws.com/hayya-debug/gamesysphoto/19/head_m_002.png?v=2018062101  ',
					content: 'nothim dsfsd sfdsfewfe wefdf  look like as a shit hahaa',
					time: '2017-08-12 15:55:55'
				}]
			}
		},

		watch: {
			'index'(val){
				this.showHome = val === 'home'
			},
			'showGuide'(val){
				console.log(val)
			}
		},
		methods: {
			callBack(val){
				Toastr(val)
			},
			handleRefresh(finish){
				setTimeout(finish, 2000)
			},
			handleMore(finish){
				setTimeout(finish, 999999)
            },
			handleScroll(params){
				console.log(params)
			},

			openPopover(e){
				this.$popover(e.target, '测试消息够长就可以够得到月亮和太阳', { duration: 99999 })
			},
			handleToast(){
				this.$toast('呵呵哒呵呵哒呵呵哒')
			},
			handleConfirm(){
				this.$confirm({
					content:'qweqweqweqwe',
					title:'qweqwe',
					type: 'success',
                    noText: 'sdk_cancel_button'
				}).confirm((res)=>{
                  console.log("confirm");
				}).cancel((res)=>{
					console.log("cancel");
				});
			},
			handleDialog(){
				this.$dialog({
					content:'qweqweqweqwe',
					title:'qweqwe',
					type: 'success'
				}).confirm((res)=>{
					next();
				}).cancel((res)=>{
					console.log("cancel");
				});
			},
			changeStatus(){
				if(statusIndex === 0){
					this.status = 'loading'
				}else if(statusIndex === 1){
					this.status = 'fail'
				}else{
					this.status = 'done'
				}
				statusIndex ++
				if(statusIndex > 2){
					statusIndex = 0
				}
			},
			showImage(url){
				ImageBrowser({url})
			},
            clickItem(e){
			  console.log(e)
            }
		},
		mounted(){
			setTimeout(()=>{
				this.src = 'http://img1.imgtn.bdimg.com/it/u=3666618469,3718107238&fm=27&gp=0.jpg'
			},1000)

			// setInterval(()=>{
			// 	statistReport({
			// 		appid: 100002001,
			// 		name: 'view',
			// 		codes: 'xxx',
			// 		type: 'invite',
			// 		source: 'facebook'
			// 	},{
			// 		topic: 'sdk_h5',//默认值为sdk_h5
			// 		debug: true
			// 	},{
			// 		timeout:5000
			// 	})
			// },1000)
		}
	}
</script>
