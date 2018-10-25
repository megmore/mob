<!--
    HtmlBox组件

-->
<template>
    <article class="html-box"  v-html="formatHtml" @click="handleClick">
    </article>
</template>
<script>
  import { initYoutubePlayer, destoryPlayers } from './youtubePlayer'

  /*
   * html文件过滤
   * @params html { String }
   * @return html {String}  //过滤后字符串
   * */
 function formatHtml(html){
    if(html)
      html = html
        // 加号转义回空格
        .replace(/\+/g, ' ')
        // 去script斜杠，制表符
        .replace(/\\t/g, '').replace(/\\n/g, '').replace(/\\r/g, '')
        // 超链接拦截
        .replace(/href\s*=\s*(?:"([^"]*)"|\'([^\']*)\'|([^"\'>\s]+))/g, 'data-href=$1')
        // 去除script标签内容
        .replace(/<script[^>]*?>[\s\S]*?<\/script>/gi, '')

    return html
  }

  export default {
    name: 'HtmlBox',
    props: {
      html: {
        type: String,
        default: ''
      }
    },
    computed: {
      formatHtml(){
        return formatHtml(this.html)
      }
    },
    data() {
      return {}
    },
    methods: {
      handleClick(e){
      	let $dom = e.target
      	if($dom.nodeName === 'A' && $dom.attributes['data-href']){
      		this.$emit('command', {
      			type: 'openLink',
                data: $dom.attributes['data-href'].value
            })
        }else if($dom.nodeName === 'IMG'){
	        this.$emit('command', {
		        type: 'openImage',
		        data: $dom.attributes['src'].value
	        })
        }else{
      		this.$emit('click', e)
        }
      }
    },
    mounted(){


    },
    destroyed(){
      destoryPlayers()
    },
    watch:{
        html:{
            immediate:true,
            handler(){
                setTimeout(()=>{
                    //延迟加载，保证页面切换动画流畅
                    initYoutubePlayer(this.$el)
                },300)
            }
        }
    }
  };
</script>
