<template>
  <validation-observer ref="obs" v-slot="ObserverProps">
    <div class="input_password-window">

      <h2>【パスワード再発行】</h2>

      <table border="0">
        <tbody>
          <tr>
            <th>新パスワード</th>
              <td>
                <validation-provider v-slot="ProviderProps" rules="required|min:6">
                  <input type="password" name="パスワード" v-model="password" data-test="password"><br>
                  <span class="error">{{ ProviderProps.errors[0] }}</span>
                </validation-provider>
              </td>
          </tr>
          <tr>
            <th>新パスワード再入力(確認用)</th>
              <td>
                <validation-provider v-slot="ProviderProps" rules="required|min:6">
                  <input type="password" name="確認用パスワード" v-model="confirmPassword" data-test="confirmPassword"><br>
                  <span class="error">{{ ProviderProps.errors[0] }}</span>
                </validation-provider>
              </td>
          </tr>
        </tbody>
      </table>

      <div class="button">
        <button class="input_password-button" :disabled="ObserverProps.invalid || !ObserverProps.validated" @click="newPassword">
          送信
        </button>
      </div>

      <button @click="newPassword" data-test="send" hidden></button>

    </div>
  </validation-observer>
</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
    password: string,
    confirmPassword: string,
}
export default Vue.extend( {
  data(): Data {
    return {
      password: "",
      confirmPassword: "",
    }
  },
  methods: {

    async newPassword() {
      if (this.password != this.confirmPassword) {
        alert("パスワードが一致しません")
        return
      } else {
      try {
        const sendpassData = {
          token: this.$route.query.id,
          password: this.password
        };
        await this.$axios.post(this.$config.baseURL+"/api/auth/password_change", sendpassData)
        .then((response) => {
          if (response.data.statusText == "Success") {
            this.$router.push('/successchange');
          } else if (response.data.statusText == "Notfound User") {
            this.$router.push('/registerror');
          }
        });
      } catch(e:any)  {
        if (e.response.data.errors.password !== undefined) {
          alert(e.response.data.errors.password)
        }
      }

      }
    },
  },
})
</script>

<style scoped>

.input_password-window {
  background: white;
  width: 400px;
  margin: 120px auto;
  padding: 5px;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  position: relative;
}
.input_password-window h2{
  text-align: center;
  height: 40px;
  font-size: 25px;
  padding: 20px;
}
.input_password-window table{
  text-align: center;
}
.input_password-window tbody{
  width: 90%;
  margin: auto;
}
.input_password-window tr{
  height: 60px;
  display: inline-block;
  vertical-align: middle;
  /* width: 100%; */
}
.input_password-window th{
  width: 150px;
}
.input_password-window input{
  width: 150px;
  height: 16px;
  font-size: 25px;
}

.button {
  text-align: center;
  margin: 10px auto;
}

.input_password-button {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
}
.input_password-button a {
  color: white;
  text-decoration: none;
}
.input_password-button:disabled {
  background: rgb(159, 179, 255);
  color: rgb(255, 255, 255);
  opacity: 1;
  cursor: unset;
}
.error {
  display: inline-block;
  color: red;
  margin-top: 5px;
  /* margin-left: 50px; */
  width: 170px;
}

</style>