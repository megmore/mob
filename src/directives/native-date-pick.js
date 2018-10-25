import {strStyle, getStyle} from "es-treasure"
export default {
	name: 'NativeDatePick',
	$instance: null,
	inserted(el, binding, vnode){
		const type = binding.arg
		el.$instance = document.createElement('input')

		if(getStyle(el, 'position') === 'static'){
			el.style.position = 'relative'
		}
		//console.log(getStyle(el, 'z-index'))
		/* 如果已经存在，不使用*/
		el.$instance.setAttribute('type', type)
		el.$instance.setAttribute('style', strStyle({
			opacity: 0,
			height: el.offsetHeight + 'px',
			width: el.offsetWidth + 'px',
			position: 'absolute',
			top:0,
			left: 0
		}))
		el.$instance.onchange = function(e){
			vnode.componentInstance.$listeners.dateSelect(el.$instance.value)
		}
		el.appendChild(el.$instance)
	},
	unbind(el, binding, vnode){
		el.$instance = null
	}
}
