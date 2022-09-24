<template>
  <validation-observer ref="obs" v-slot="ObserverProps">
    <div>
      <div class="add-window">
        <div class="add-ttl">
          <p>　　 店舗代表者作成</p>
        </div>

        <table class="table">
          <tbody>
            <validation-provider v-slot="ProviderProps" rules="required|max:20">
              <tr>
                <th>店舗代表者名：</th>
                  <td>
                    <input v-model="name" type="text" placeholder="名前" name="店舗代表者名" data-test="name">
                    <div class="error">{{ ProviderProps.errors[0] }}</div>
                  </td>
              </tr>
            </validation-provider>
            <validation-provider v-slot="ProviderProps" rules="required">
              <tr>
                <th>メールアドレス：</th>
                <td>
                  <input v-model="email" type="email" placeholder="メールアドレス" name="メールアドレス" data-test="email">
                  <div class="error">{{ ProviderProps.errors[0] }}</div>
                </td>
              </tr>
            </validation-provider>
            <validation-provider v-slot="ProviderProps" rules="required|min:6">
              <tr>
                <th>パスワード：</th>
                <td>
                  <input v-model="password" type="text" placeholder="パスワード" name="パスワード" data-test="password">
                  <div class="error">{{ ProviderProps.errors[0] }}</div>
                </td>
              </tr>
            </validation-provider>
          </tbody>
        </table>

        <div class="button">
          <button :disabled="ObserverProps.invalid || !ObserverProps.validated" class="add-button" @click="addManager">登録</button><br>
          <button hidden @click="addManager" data-test="addManager"></button>
        </div>
      </div>

    </div>
  </validation-observer>
</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
  name: string,
  email: string,
  password: string,
}

export default Vue.extend({
  data(): Data {
    return {
      name: "",
      email: "",
      password: "",
    }
  },
  methods: {
    async addManager() {
      const sendmanagerData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      try {
        await this.$axios.post(this.$config.baseURL+"/api/auth/add_manager", sendmanagerData);
        const getUser = await this.$axios.get(this.$config.baseURL+"/api/auth/users");
        const last_id = getUser.data.data[getUser.data.data.length-1].id;
        const sendadditionalData = {
          id: last_id,
          name: this.name,
          email: this.email,
          password: this.password,
        };
        await this.$axios.post(this.$config.baseURL+"/api/auth/change_authority", sendadditionalData);
        alert("店舗代表者を登録しました。作成したメールアドレス宛に、ログイン情報を自動転送しました。");
      } catch(e:any)  {
        if (e.response.data.errors.name !== undefined){
          alert(e.response.data.errors.name)
        } else if (e.response.data.errors.email !== undefined) {
          alert(e.response.data.errors.email)
        } else if (e.response.data.errors.password !== undefined) {
          alert(e.response.data.errors.password)
        } else {
          alert("システムエラーが発生しました")
        }
      }
    }
  },
})
</script>

<style scoped>
.add-window {
  background: white;
  width: 400px;
  margin: 60px 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  position: relative;
}
.add-ttl {
  height: 50px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px 5px 0 0;
}
.add-ttl::before {
  content: "";
  background: url("~static/home.png") no-repeat;
  background-size: cover;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 12px;
  left: 20px;
}
.add-ttl p {
  color: white;
  padding: 17px;
  font-size: 14px;
}

.table {
  text-align: left;
  width: 90%;
  margin: 40px auto 0px auto;
}
.table tr {
  height: 40px;
}
.table th {
  width: 130px;
}
.table input {
  width: 200px;
  height: 20px;
}






.button {
  text-align: right;
}
.add-button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.add-button {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  margin: 15px 25px 15px 0;
}
.add-button:disabled {
  background: rgb(159, 179, 255);
  color: rgb(255, 255, 255);
  opacity: 1;
  cursor: unset;
}
.error {
  color: red;
  padding: 5px 0;
  width: 196px;
}

</style>

<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  .add-window {
    margin: auto;
    margin-top: 60px;
  }
}
</style>
