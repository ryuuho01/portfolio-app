<template>
    <div class="successchange-window">
      <div class="successchange">
        <h2>【パスワードの変更が完了しました】</h2>
      </div>
      <div class="button">
        <button class="successchange-button">
          <NuxtLink to="/login">ログインする</NuxtLink>
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

.successchange-window {
  background: white;
  width: 400px;
  height: auto;
  margin: 35px auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
}

.successchange {
  text-align: center;
  padding: 0 20px;
}

.successchange h2 {
  font-size: 21px;
  padding-top: 30px;
}

.successchange p {
  font-size: 21px;
  padding-top: 50px;
}

.button {
  text-align: center;
}
.successchange-button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.successchange-button {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  margin: 45px;
}
.successchange-button a {
  color: white;
  text-decoration: none;
}

</style>