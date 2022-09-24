<template>
  <div>
    <div class="flex">
      <div>
        <AddingManager v-if="$auth.user !== null && $auth.user.authority === 0" />
        <JobTest v-if="$auth.user !== null && $auth.user.authority === 0" />
      </div>
      <ShopCreate v-if="$auth.user !== null && $auth.user.authority === 1 && $auth.user.shop_id === null" />
      <EdittingShop v-if="$auth.user !== null && $auth.user.authority === 1 && $auth.user.shop_id !== null" />
      <SendingEmail />
    </div>
    <div class="reservation-box">
      <h2 v-if="display === true && $auth.user !== null && $auth.user.authority === 1 && $auth.user.shop_id !== null">予約受付状況</h2>
      <div v-if="display === true && $auth.user !== null && $auth.user.authority === 1 && $auth.user.shop_id !== null" class="left-side">
        <div v-if="reservationsCurrent[0] === undefined && display === true" class="nothing">
          予約受付はありません
        </div>
        <div v-for="(item, index) in reservationsCurrent" :key="item.id" class="reservation">
          <p>予約{{index+1}}</p>
          <div class="time-pic">
            <img src="/time.png" alt="画像">
          </div>
          <div class="close-pic">
            <img @click="destroy(item.id)" src="/close.png" alt="画像" data-test="delete">
          </div>
          <table>
            <tbody>
              <tr>
                <th>予約者</th>
                <td>{{item.reservations[index].user_name}}</td>
              </tr>
              <tr>
                <th>日にち</th>
                <td>{{item.reservations[index].reservation_date.replace(item.reservations[index].reservation_date.slice(-9),'')}}</td>
              </tr>
              <tr>
                <th>時間</th>
                <td>{{item.reservations[index].reservation_date.slice(-9).slice(0,6)}}</td>
              </tr>
              <tr>
                <th>ご来店人数</th>
                <td>{{item.reservations[index].num_members}}名様</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
  shopCurrent: Array<string|number>,
  reservationsCurrent: Array<string|number>,
  display: boolean,
}
export default Vue.extend({
  data(): Data {
    return{
      shopCurrent: [],
      reservationsCurrent: [],
      display: false,
    }
  },
  beforeRouteEnter (to, from, next:any) {
    next((vm: { $auth: { user: any; }; $router: string[]; }) => { if (vm.$auth.user !== null && (vm.$auth.user.authority === 0 || vm.$auth.user.authority === 1)) { next(); } else { vm.$router.push('/'); } })
  },

  async fetch() {
    await this.$axios
      .get(this.$config.baseURL+"/api/shop")
      .then((response) => (this.shopCurrent = response.data.data));
      if ((this as any).$auth.loggedIn) {
        // 予約のデータを取得
        let shops = [];
        for(let i=0; i < (this as any).shopCurrent.length; i++) {
          for(let j=0; j < (this as any).shopCurrent[i]["reservations"].length; j++) {
            if((this as any).shopCurrent[i]["reservations"][j]["shop_id"] == (this as any).$auth.user.shop_id) {
              shops.push((this as any).shopCurrent[i]);
            }
          }
        }
        (this as any).reservationsCurrent = shops;
        this.display = true;
      }
  },
  methods: {
    destroy: async function(item_id:number){
      const $answer = window.confirm('予約を本当に取り消しますか？');
      if ($answer) {
      const reservationresData = await this.$axios.get(this.$config.baseURL+"/api/reservation");
      let reservationId = 0;
      for(let i=0; i < reservationresData.data.data.length; i++) {
          if(reservationresData.data.data[i]["shop_id"] === (this as any).$auth.user.shop_id && reservationresData.data.data[i]["shop_id"] === item_id) {
            reservationId = reservationresData.data.data[i]["id"];
          };
      }
      const deletepath = this.$config.baseURL+"/api/reservation/"+reservationId;
      await this.$axios.delete(deletepath);
      location.href='/manage';
      alert("予約を取り消しました");
      } else {
        return
      }
    },
  }
})
</script>

<style scoped>
.flex {
  margin: auto;
  display: flex;
  justify-content: center;
}
</style>

<style scoped>
.nothing {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  font-size: 20px;
}
.reservation-box {
  width: 68%;
  margin: auto;
}
.left-side {
  display: flex;
  justify-content: left;
  margin: auto;
  flex-wrap: wrap;
}
h2 {
  margin: auto;
  width: 100%;
  font-size: 20px;
  margin: 20px 0;
}
.reservation {
  width: 250px;
  height: 250px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  color: white;
  position: relative;
  margin-bottom: 20px;
  margin-right: 10px;
}
.time-pic {
  background-color: white;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 28px;
  left: 25px;
}
.time-pic img {
  width: 25px;
  height: 25px;
}
.close-pic {
  width: 21px;
  height: 21px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 28px;
  right: 27px;
}
.close-pic img {
  width: 23px;
  height: 23px;
  cursor: pointer;
}
.close-pic img:hover {
  opacity: 0.7;
  transition: 0.3s;
}

.reservation p {
  display: flex;
  align-items: center;
  font-weight: normal;
  font-size: 12px;
  height: 80px;
  padding-left: 75px;
}
.reservation table {
  width: 100%;
  text-align: left;
}
.reservation table tr {
  height: 32px;
}
.reservation table th {
  font-size: 12px;
  font-weight: normal;
  width: 80px;
  vertical-align: middle;
  padding-left: 25px;
}
.reservation table td {
  font-size: 12px;
  vertical-align: middle;
}
</style>


<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  .flex {
    flex-direction: column;
  }
}
@media screen and (max-width: 768px) {
  .reservation {
    width: 200px;
    height: 220px;
    margin-bottom: 20px;
    margin-right: 5px;
  }
}
@media screen and (max-width: 620px) {
  .reservation {
    width: 100%;
  }
}
</style>