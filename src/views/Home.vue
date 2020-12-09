<template>
  <div class="container">
    <div class="channeltitle">
      <h1 class="title">大祭Slackビューワー</h1>
      <p>ようこそ、大祭Slackビューワーへ。</p>
      <p>Slackのメッセージ履歴が見られます。</p>
      <p>必要な添付ファイルもワンクリックで閲覧可能です。</p>
      <p>ファイルのみを閲覧したいときには「ファイル」のチェックボックスをクリックします。</p>
      <p>その状態で検索するとファイル名検索が可能です。</p>
    </div>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
