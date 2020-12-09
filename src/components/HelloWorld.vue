<template>
  <div class="chats">
    <h3 class="subtitle is-3 mt-3">注意事項</h3>
    <p>ユーザ名検索が容易にはできません。Slack内でのIDを使って検索する必要があります。</p>
    <p>下表を参考にIDを使って検索を行ってください。</p>
    <table class="table">
      <thead>
        <tr>
          <th>No.</th>
          <th>ID</th>
          <th>名前</th>
          <th>所属</th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:key="user.id" v-for="(user, index) in filteredData">
          <th>{{ index }}</th>
          <td>{{ user.id }}</td>
          <td>{{ userName(user.id) }}</td>
          <td>{{ user.profile.title }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data(){
    return{
      users: []
    }
  },
  created(){
    axios.get('users.json')
      .then((response) => {
        response.data.forEach(r => {
          this.users.push(r);
        })
      })
      .catch(error => console.log(error))
  },
  computed: {
    filteredData: function(){
      var c = this.users.filter((v) => v.deleted === false);
      return c;
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
    }
  }
}
</script>
