<template>
    <div class="registerror-window">
      <div class="registerror">
        <h2>【認証コードエラー】</h2>
      </div>
      <div class="registerror">
        <p>認証コードの有効期限が過ぎている、<br>もしくは見つかりませんでした。</p>
      </div>
      <div class="button">
        <button class="registerror-button">
          <NuxtLink to="/">ホームに戻る</NuxtLink>
        </button>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend( {
  data() {
    return {
    }
  },
  methods: {
  },
})
</script>

<style scoped>

.registerror-window {
  background: white;
  width: 400px;
  height: 260px;
  margin: 35px auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
}

.registerror {
  text-align: center;
  padding: 0 20px;
}
.registerror h2 {
  font-size: 21px;
  padding-top: 30px;
}
.registerror p {
  font-size: 21px;
  padding-top: 50px;
}

.button {
  text-align: center;
}
.registerror-button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.registerror-button {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  margin-top: 45px;
}
.registerror-button a {
  color: white;
  text-decoration: none;
}

</style>