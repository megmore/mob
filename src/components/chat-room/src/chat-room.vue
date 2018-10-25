<template>
  <div class="m-chat-room">
    <div class="chat-item"  :class="{ 'item-me': item.isMe, 'item-other': !item.isMe}" v-for="item in listData">
      <div class="item-head">
        <img class="item-avatar" :src="item.avatar"/>
        <div class="item-author">
          <span class="item-name">{{item.author}}</span>
          <span class="item-title" v-if="item.title">{{item.title}}</span>
        </div>
      </div>
      <div class="item-body">
        <div class="item-content-box">
          <div class="item-content-text">{{item.content_text}}</div>
          <img class="item-content-img" :src="item.content_cover"/>
          <div class="item-content-link">和i请问请问</div>
        </div>
        <div class="item-time">{{item.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>

  let page = {
    name: 'MChatRoom',
    props: {
      listData: {
        type: Array,
        default: []
      },
    },
    created() {

    },
    activated: function () {

    },
    deactivated: function () {

    },
    computed: {
    },
    methods: {
    },
    mounted(){
    }
  }

  export default page
</script>
