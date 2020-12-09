<template>
  <div class="container">
    <div class="channeltitle">
      <h1 class="title">{{ name }}</h1>
      <h2 class="subtitle">{{ id }}</h2>
      <div class="searchbox">
        <div class="searchbox_head">
          <label class="label">検索</label>
        </div>
        <div class="searchbox_body">
          <label class="searchbox_item" for="showAttatchment"><input type="checkbox" name="showAttatchment" id="showAttatchment" v-model="showAttatchment">ファイル</label>
          <input class="searchbox_item" type="text" placeholder="Search" v-model="keyword">
          <input type="button" class="searchbox_item" value="Clear" v-on:click="clear()">
          <p class="searchbox_item">Result({{filteredData.length}}件)</p>
        </div>
      </div>
    </div>
    <div class="chats">
      <div class="notification is-caution" v-show="!loading" v-if="filteredData == ''">
        該当するメッセージは存在しません。
      </div>
      <div class="notification" v-show="loading">
        読み込み中...
      </div>
      <article class="chat" v-show="!loading" v-bind:key="chat.index" v-for="chat in filteredData">
        <div class="media-content" v-if="chat.files">
          <div class="content">
            <div class="chat_head">
              <strong class="chat_head__description">{{ userName(chat.user) }}</strong>
              <small class="chat_head__description">{{ chat.user }}</small> 
              <small class="chat_head__description">{{ parseFloat(chat.ts) | dateTime }}</small>
            </div>
            <div class="chat_body">
              <p>{{ chat.text }}</p>
            </div>
            <div class="chat_link" v-bind:key="file.id" v-for="file in chat.files">
              <a target="_blank" v-bind:href="file.url_private">
              {{ file.name }}
            </a>
            </div>
          </div>
        </div>
        <div class="media-content" v-else-if="chat.thread_ts">
          <div class="content">
            <div class="chat_head">
              <strong class="chat_head__description">{{ userName(chat.user) }}</strong>
              <small class="chat_head__description">{{ chat.user }}</small> 
              <small class="chat_head__description">{{ parseFloat(chat.ts) | dateTime }}</small>
              <small class="chat_head__description">{{ chat.thread_ts }}</small>
            </div>
            <div class="chat_body">
              <p>{{ chat.text }}</p>
            </div>
          </div>
        </div>
        <div class="media-content" v-else>
          <div class="content">
            <div class="chat_head">
              <strong class="chat_head__description">{{ userName(chat.user) }}</strong>
              <small class="chat_head__description">{{ chat.user }}</small> 
              <small class="chat_head__description">{{ parseFloat(chat.ts) | dateTime }}</small>
            </div>
            <div class="chat_body">
              <p>{{ chat.text }}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  
  export default {
    data(){
      return {
        chats: [],
        users: [],
        keyword: '',
        loading: true,
        showAttatchment: false
      }
    },
    props: {
      name: String,
      id: String
    },
    filters: {
      dateTime: function(date){
        let time = new Date(date*1000)
        return time.toString();
      }
    },
    created(){
      this.fetchData()
      axios.get('users.json')
        .then((response) => {
          response.data.forEach(r => {
            this.users.push(r);
            this.loading = false;
          })
        })
        .catch(error => console.log(error))
    },
    watch: {
      '$route': 'fetchData'
    },
    computed: {
      filteredData: function(){
        if(this.showAttatchment){
          var word = this.keyword
          //var c = this.chats.filter((v) => v.files);
          var c = this.chats.filter(function(item){
            for(var i in item.files){
              if(item.files[i].name){
                if(item.files[i].name.indexOf(word) !== -1){
                  return true
                }
              }
            }
          });
          return c
        } else {
          var chats = [];
          for(var x in this.chats){
            var chat = this.chats[x];
            var thread = chat.thread_ts;
            if(chat.text.indexOf(this.keyword) !== -1 || chat.user == this.keyword || thread == this.keyword ){
              chats.push(chat);
            }
          }
          return chats;
        }
      }
    },
    methods: {
      userName: function(name){
        let display = null;
        let chatId = name;
          for(var i = 0; i < this.users.length; i++){
            let userId = this.users[i].id;
            if(chatId === userId){
              let display = this.users[i].real_name;
              return display
            }
          }
        return display
      },
      fetchData(){
        this.loading = true
        this.chats = []
        const id = this.$route.params.id
        if(this.$route.params.id !== id) return
        axios.get(`api/${id}.json`)
          .then((response) => {
            response.data.forEach(r => {
              this.chats.push(r);
              this.loading = false;
            })
          })
          .catch(error => console.log(error))
      },
      clear(){
        this.keyword = ''
      }
    },
    
  }
</script>

<style>
  .media{
    overflow-wrap: anywhere;
  }
</style>