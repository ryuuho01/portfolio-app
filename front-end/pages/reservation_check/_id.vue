<template>
    <div class="reservation_check-window">
      <p>【お客様情報】</p>
      <table>
        <tbody>
          <tr>
            <th>予約者</th>
            <td>{{reservationCurrent.user_name}}</td>
          </tr>
          <tr>
            <th>日にち</th>
            <td>{{reservationCurrent.reservation_date | date}}</td>
          </tr>
          <tr>
            <th>時間</th>
            <td>{{reservationCurrent.reservation_date | time}}</td>
          </tr>
          <tr>
            <th>ご来店人数</th>
            <td>{{reservationCurrent.num_members}}名様</td>
          </tr>
        </tbody>
      </table>
      <div class="button">
        <button class="reservation_check-button" data-test="back">
          <a href="javascript:history.back();">戻る</a>
        </button>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
interface Data{
  reservationCurrent: Object,
}
export default Vue.extend({
  data(): Data{
    return {
      reservationCurrent: {},
    }
  },
  async fetch() {
    await this.$axios
      .get(this.$config.baseURL+"/api/reservation/"+this.$route.params.id)
      .then((response) => (this.reservationCurrent = response.data.data));
  },
  beforeRouteEnter (to, from, next:any) { next((vm: { $auth: { loggedIn: boolean; user:{ authority: number}}; $router: string[]; }) => { if (vm.$auth.loggedIn === true && vm.$auth.user.authority === 1) {next();} else {vm.$router.push('/');} }) },

  filters: {
    date: function(value:string){
      if(value){
        return value.replace(value.slice(-9),'')
      }
    },
    time: function(value:string){
      if(value){
        return value.slice(-9).slice(0,6)
      }
    },
  },
})
</script>

<style scoped>

.reservation_check-window {
  background: white;
  width: 400px;
  height: 260px;
  margin: 35px auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
}
.reservation_check-window p{
  text-align: center;
  font-size: 21px;
  padding: 20px;
}

table {
  margin: auto;
  width: 300px;
  text-align: left;
}
table tr {
  height: 32px;
}
table th {
  font-size: 20px;
  width: 150px;
  vertical-align: middle;
}
table td {
  font-size: 20px;
  vertical-align: middle;
}

.button {
  text-align: center;
}
.login-button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.reservation_check-button {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  margin-top: 25px;
}
.reservation_check-button a {
  color: white;
  text-decoration: none;
}

</style>