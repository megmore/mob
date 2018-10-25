/**
 * Created by nocoolyoyo on 2018/2/27.
 */
import $script from 'scriptjs'
//facebook分享sdk url
const youtubeApi = 'https://www.youtube.com/iframe_api'

let currentPlayer = null
let hasWriteStyles = false
//初始化youtubeAPI
function initYoutubeApi() {
  return new Promise((resolve, reject)=>{
    if(window['YT']){
      resolve();
    }else{
      $script(youtubeApi, function () {
        window.onYouTubeIframeAPIReady = function() {
          resolve();
        }
      })
    }

  });
}

//stateChange回调
function onPlayerStateChange(e) {
  if( e.target !== currentPlayer &&
    e.data === YT.PlayerState.PLAYING){
    //如果上个播放器存在则停止上个播放器播放
    if(currentPlayer!==null)
      currentPlayer.pauseVideo();
    //指向当前正在播放的播放器
    currentPlayer = e.target;
  }
}

//获取vedioIds
function getVedioIds($els) {
  let tempIds = [];
  for(let i = 0; i < $els.length; i++) {
    //第一次提取校验
    tempIds.push($els[i].dataset.id
    );
  }
  return tempIds
}

export function initYoutubePlayer(
  el = null,
  width = 360,
  height = 640
){
  let $oriFrames = el.querySelectorAll('.iframe-youtube')
  if($oriFrames.length === 0) return


  initYoutubeApi().then((res)=>{
    if(el === null) return
    if(typeof  el  === 'string') {
      el = document.querySelector(el)
    }
    console.log(el.offsetWidth)
    let ratio = width / height
    width = el.offsetWidth
    height = width * ratio
    console.log(el.offsetWidth)
    //由于 youtube 的widht, height不起作用，这里动态写入style表调整iframe尺寸
    if(!hasWriteStyles){
      let $iframeStyle = document.createElement('style')
      let styleTexts = `
      .html-box iframe {
          height: ${height}px;
          width: ${width}px
        }
    `
      $iframeStyle.type = 'text/css'
      if($iframeStyle.styleSheet){         //ie下
        $iframeStyle.styleSheet.cssText = styleTexts
      } else {
        $iframeStyle.innerHTML = styleTexts       //或者写成 nod.appendChild(document.createTextNode(str))
      }
      document.querySelector('head').appendChild($iframeStyle)
      hasWriteStyles = true
    }

    let videoIds = getVedioIds($oriFrames);

    //初始化播放器
    videoIds.forEach((value, index)=> {
      $oriFrames[index].id = 'YTplayers' + value;    //设置id
      new YT.Player($oriFrames[index].id, {
        // height: 320,
        // width: 640,
        videoId: value,
        playerVars: { 'playsinline': 1},
        events: {
          //   'onReady': onPlayerReady, //onready回调，用于自动播放用
          'onStateChange': onPlayerStateChange
        }
      });
    })
  })
}

export function destoryPlayers(){
  currentPlayer = null
}
