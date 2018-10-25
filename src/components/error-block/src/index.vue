<script>
	/**
	 * 异常状态区块组件
	 */
	import { getStyle, strStyle } from 'es-treasure'
	import AssetsImg from '../../assets-img/src/index'

	const adaptMap = {
		'content': {
			assetsImgName: 'no-content',
		},
		'message': {
			assetsImgName: 'no-message',
		},
		'following': {
			assetsImgName: 'no-following',
		},
		'post': {
			assetsImgName: 'no-post',
		},
		'face': {
			assetsImgName: 'no-face',
		},
		'notice': {
			assetsImgName: 'no-notice',
		},
		'favorite': {
			assetsImgName: 'no-favorite',
		}
	}

	export default {
		name: 'ErrorBlock',
		functional: true,
		components: { AssetsImg },
		props: {
			name: {
				type: String
			},
			message: {
				type: String
			},
		},
		render(createElement, context){
			console.info('已知error-block类型：content,message, following, post, face, favorite, notice')
			let name = context.props.name || 'content'
			const message = context.props.message || ''
			const classes = context.data.staticClass || ''
			const styles = context.data.staticStyle !== undefined ? strStyle(context.data.staticStyle) : ''

			return (
				<div class={`error-block ${name} ${classes}`} style={`${styles}`}>
					<AssetsImg name={adaptMap[name].assetsImgName} class="cover" style={{width: '8rem', height: '4rem'}}/>
					<div class="message">
						{message}
					</div>
				</div>
			)
		}
	}
</script>
