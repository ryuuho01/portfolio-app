<template>
    <div class="registalready-window">
      <div class="registalready">
        <h2>【認証コードエラー】</h2>
      </div>
      <div class="registalready">
        <p>認証コードが間違っているか、<br>すでに登録済みです。</p>
      </div>
      <div class="button">
        <button class="registalready-button">
          <NuxtLink to="/login">ログインする</NuxtLink>
        </button><br>
        <button class="registalready-button2">
          <span @click="passwordTrue" data-test="password_reset">パスワード再発行</span>
        </button>
      </div>
      <div class="add" v-if="passwordInput">
        <input v-model="inputEmail" type="email" id="area" placeholder="Email" data-test="pass_input">
        <button @click="sendEmail" data-test="send">送信</button>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
interface Data {
    passwordInput: boolean,
    inputEmail: string,
}
export default Vue.extend({
  data(): Data {
    return {
      passwordInput: false,
      inputEmail: "",
    }
  },
  methods: {
    passwordTrue() {
      this.passwordInput = true;
    },
    async sendEmail() {
      if (this.inputEmail === "") {
        alert("登録したメールアドレスを入力して下さい");
        return
      } else {
      const sendareaData = {
        email: this.inputEmail,
      };
      await this.$axios.post(this.$config.baseURL+"/api/auth/reminder", sendareaData);
      location.href = this.$config.baseURL+"/exist";
      }
    },
  },
})
</script>

<style scoped>

.registalready-window {
  background: white;
  width: 400px;
  height: auto;
  margin: 35px auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
}

.registalready {
  text-align: center;
  padding: 0 20px;
}

.registalready h2 {
  font-size: 21px;
  padding-top: 30px;
}

.registalready p {
  font-size: 21px;
  padding-top: 50px;
}

.button {
  text-align: center;
}
.registalready-button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.registalready-button {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  margin-top: 45px;
}
.registalready-button a {
  color: white;
  text-decoration: none;
}
.registalready-button2 {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  margin: 20px auto;
}

.add {
  text-align: center;
  padding: 10px 0;
}

</style>