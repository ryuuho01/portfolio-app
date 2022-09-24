<template>
    <div class="thanks-window">
      <div class="thanks">
        <p>会員登録ありがとうございます</p>
      </div>
      <div class="button">
        <button class="thanks-button">
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

.thanks-window {
  background: white;
  width: 400px;
  height: 260px;
  margin: 35px auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
}

.thanks {
  text-align: center;
}
.thanks p {
  font-size: 21px;
  padding-top: 90px;
}

.button {
  text-align: center;
}
.login-button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.thanks-button {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  margin-top: 45px;
}
.thanks-button a {
  color: white;
  text-decoration: none;
}

</style>