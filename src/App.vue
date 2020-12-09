<template>
  <div id="app">
    <header class="navbar">
      <div class="navbar-left">
        <span>Slackビューワー for 大祭</span>
      </div>
      <div class="navbar-right">
        <div>
          <router-link to="/" exact>トップ</router-link>
        </div>
      </div>
    </header>
    <main>
      <div class="sidebar">
        <aside>
          <ul class="sidebar-items">
            <li><p class="sidebar-title">Channels</p></li>
            <li v-bind:key="d.ts" v-for="d in sortDatas">
              <router-link v-bind:to="{ name : 'About', params : { id: d.id, name: d.name }}" exact active-class="is-active">{{d.name}}</router-link>
            </li>
          </ul>
        </aside>
      </div>
      <router-view/>
    </main>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data(){
      return {
        datas: []
      }
    },
    computed: {
      sortDatas(){
        return this.datas.slice().sort((a, b) => {
          let textA = a.name.toUpperCase();
          let textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      }
    },
    created(){
      axios.get('channels.json')
      .then((response) => {this.datas = response.data})
      .catch(error => console.log(error))
    }
  }
</script>