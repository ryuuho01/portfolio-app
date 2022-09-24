<template>
    <div class="exist-window">
      <div class="exist">
        <h2>【確認メール送信】</h2>
      </div>
      <div class="exist">
        <p>本人確認のメールアドレスが送信<br>されました。メールに記載されて<br>いるURLをクリックして下さい。</p>
      </div>
      <div class="button">
        <button class="exist-button">
          <NuxtLink to="/">ホームへ戻る</NuxtLink>
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

.exist-window {
  background: white;
  width: 400px;
  height: 300px;
  margin: 35px auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
}

.exist {
  text-align: center;
  padding: 0 20px;
}
.exist h2 {
  font-size: 21px;
  padding-top: 30px;
}
.exist p {
  font-size: 21px;
  padding-top: 50px;
}

.button {
  text-align: center;
}
.exist-button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.exist-button {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  margin-top: 45px;
}
.exist-button a {
  color: white;
  text-decoration: none;
}

</style>