<template>
    <div class="sendemail-window">
      <div class="sendemail">
        <h2>【確認のメールを送信しました】</h2>
      </div>
      <div class="button">
        <button class="sendemail-button">
          <NuxtLink to="/">ホームへ戻る</NuxtLink>
        </button>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
Vue.config.ignoredElements = [
    'NuxtLink'
]
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

.sendemail-window {
  background: white;
  width: 400px;
  height: auto;
  margin: 35px auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
}

.sendemail {
  text-align: center;
  padding: 0 20px;
}

.sendemail h2 {
  font-size: 21px;
  padding-top: 30px;
}

.sendemail p {
  font-size: 21px;
  padding-top: 50px;
}

.button {
  text-align: center;
}
.sendemail-button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.sendemail-button {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  margin: 45px;
}
.sendemail-button a {
  color: white;
  text-decoration: none;
}

</style>