<template>
  <div>
    <validation-observer ref="obs" v-slot="ObserverProps">
      <div class="login-window">
        <div class="login-ttl">
          <p>ログイン</p>
        </div>

        <validation-provider v-slot="ProviderProps" rules="required">
          <div class="login login01">
            <input v-model="email" type="email" placeholder="Email" name="メールアドレス" data-test="login_email" required />
          </div>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>

        <validation-provider v-slot="ProviderProps" rules="required">
          <div class="login login02">
            <input v-model="password" type="password" placeholder="Password" name="パスワード" data-test="login_password" required />
          </div>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>

        <div class="button">
          <button class="login-button" @click="login" :disabled="ObserverProps.invalid || !ObserverProps.validated">ログイン</button><br>
          <button class="login-button" @click="passwordTrue" data-test="password_reset2">パスワード再発行</button>
        </div>

        <button  @click="login" data-test="login" hidden></button>

        <div class="add" v-if="passwordInput">
          <input v-model="inputEmail" type="email" id="email" placeholder="Email" data-test="pass_input">
          <button @click="sendEmail" data-test="send_email">送信</button>
        </div>

      </div>
    </validation-observer>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
  email: string,
  password: string,
  passwordInput: boolean,
  inputEmail: string,
}
export default Vue.extend({
  data(): Data {
    return {
      email: "",
      password: "",
      passwordInput: false,
      inputEmail: "",
    }
  },
  methods: {
    passwordTrue(): boolean {
      return this.passwordInput = !this.passwordInput;
    },
    async sendEmail() {
      var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;
      if (this.inputEmail == "") {
        alert("登録したメールアドレスを入力して下さい");
        return
      } else if (!reg.test(this.inputEmail)) {
        alert("有効なメールアドレスを入力して下さい");
        return
      } else {
      const sendareaData = {
        email: this.inputEmail,
      };
      await this.$axios.post(this.$config.baseURL+"/api/auth/reminder", sendareaData)
        .then((response) => {
          if (response.data.statusText == "OK") {
            this.$router.push('/exist');
          } else if (response.data.statusText == "User Not Found") {
            this.$router.push('/notexist');
          }
        });
      }
    },
    async login() {
      try {
        await (this as any).$auth.loginWith("laravelJWT", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
      } catch {
        alert("メールアドレスまたはパスワードが間違っております");
      }
    },
  },
})
</script>

<style scoped>

.login-window {
  background: white;
  width: 350px;
  margin: 120px auto 0 auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  position: relative;
}
.login-ttl {
  height: 50px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px 5px 0 0;
}
.login-ttl p {
  color: white;
  padding: 17px;
  font-size: 14px;
}

.login {
  margin: 18px 30px 0 50px;
}
.login01::before {
  content: "";
  background: url("~static/mail.png") no-repeat;
  background-size: cover;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 75px;
  left: 20px;
}
.login02::before {
  content: "";
  background: url("~static/lock.png") no-repeat;
  background-size: cover;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 130px;
  left: 20px;
}
.login input {
  width: 100%;
  height: 30px;
  font-size: 15px;
  border: none;
  border-bottom: 1px solid black;
}

.button {
  text-align: right;
}
.login-button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.login-button {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  margin: 15px 25px 15px 0;
}
.login-button:disabled {
  background: rgb(159, 179, 255);
  color: rgb(255, 255, 255);
  opacity: 1;
  cursor: unset;
}
.error {
  color: red;
  padding-top: 5px;
  margin-left: 50px;
}

.add {
  text-align: center;
}
.add input {
  padding: 5px;
  font-size: 15px;
  margin: 10px auto;
}

</style>