<template>
    <validation-observer ref="obs" v-slot="ObserverProps">
      <div class="reservation">
        <h2>予約</h2>
        <input type="text" v-model="userId" name="user_id" hidden>
        <input type="text" v-model="shopId" name="shop_id" hidden>
        <div class="date">
          <input v-model="reservationDate" type="date" name="reservation_date" id="reservation_date" data-test="date">
        </div>
        <validation-provider v-slot="ProviderProps" rules="custom_rule:時間">
          <div class="select01">
            <select v-model="reservationTime" class="select" name="reservation_time">
              <option hidden>時間</option>
              <option>10:00</option>
              <option>11:00</option>
              <option>12:00</option>
              <option>13:00</option>
              <option>14:00</option>
              <option>15:00</option>
              <option>16:00</option>
              <option>17:00</option>
              <option>18:00</option>
              <option>19:00</option>
              <option>20:00</option>
              <option>21:00</option>
            </select>
          </div>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
        <validation-provider v-slot="ProviderProps" rules="custom_rule:人数">
          <div class="select02">
            <select v-model="numMembers" class="select" name="num_members">
              <option hidden>人数</option>
              <option>1名様</option>
              <option>2名様</option>
              <option>3名様</option>
              <option>4名様</option>
              <option>5名様</option>
              <option>6名様</option>
              <option>7名様</option>
              <option>8名様</option>
              <option>9名様</option>
              <option>10名様</option>
              <option>11名様</option>
              <option>12名様</option>
              <option>13名様</option>
              <option>14名様</option>
              <option>15名様</option>
              <option>16名様</option>
              <option>17名様</option>
              <option>18名様</option>
              <option>19名様</option>
              <option>20名様</option>
            </select>
          </div>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
        <div class="table-padding">
          <table>
            <tbody>
              <tr>
                <th>店名</th>
                <td>{{shopCurrent.shop_name}}</td>
              </tr>
              <tr>
                <th>日にち</th>
                <td>{{reservationDate}}</td>
              </tr>
              <tr>
                <th>時間</th>
                <td>{{reservationTime}}</td>
              </tr>
              <tr>
                <th>ご来店人数</th>
                <td>{{numMembers}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="button">
          <input :disabled="ObserverProps.invalid || !ObserverProps.validated" value="予約する" type="submit" @click="reservation">
        </div>

        <button @click="reservation" data-test="reserve" hidden></button>

      </div>
    </validation-observer>
</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
    shopCurrent: Array<string|number>,
    shopId: string | null,
    userId: number | null,
    reservationDate: Date,
    reservationTime: string,
    numMembers: string,
}
export default Vue.extend({
  data(): Data {
    return {
      shopCurrent: [],
      shopId: this.$route.params.id,
      userId: null,
      reservationDate: (this as any).today_set(),
      reservationTime: "時間",
      numMembers: "人数",
    }

  },
  async fetch() {
    await this.$axios
      .get(this.$config.baseURL+"/api/shop/"+this.$route.params.id)
      .then((response) => (this.shopCurrent = response.data.data));
    if ((this as any).$auth.loggedIn) {
      this.userId = (this as any).$auth.user.id;
    }
  },

  methods: {

    today_set() {
      var today = new Date();
      today.setDate(today.getDate());
      var yyyy = today.getFullYear();
      var mm = ("0"+(today.getMonth()+1)).slice(-2);
      var dd = ("0"+today.getDate()).slice(-2);
      return yyyy+'-'+mm+'-'+dd;
    },

    async reservation() {
      if(!(this as any).$auth.loggedIn) {
        this.$router.push('/login');
      } else {
        const check_reservation = await this.$axios.get(this.$config.baseURL+"/api/reservation");
        for (let i in check_reservation.data.data) {
          if (check_reservation.data.data[i].user_id === this.userId && check_reservation.data.data[i].shop_id === Number(this.shopId)) {
            alert("重複して予約はできません");
            return
          }
        }
        if((document.getElementById("reservation_date") as any).value === '') {
          alert("日付を選択して下さい");
          return
        } else if (new Date(this.reservationDate+" "+this.reservationTime).getTime() < new Date().getTime()) {
          alert("現在以降の日付と時間を選択して下さい");
          return
        }
        const $answer = window.confirm('予約をしてもよろしいですか？');
        if ($answer) {
          const sendreservationData = {
            user_id: this.userId,
            shop_id: this.shopId,
            reservation_date: this.reservationDate,
            reservation_time: this.reservationTime,
            num_members: this.numMembers,
          };
          try {
            const post_res = await this.$axios.post(this.$config.baseURL+"/api/reservation", sendreservationData);
            if( post_res.data.message === "Not found"){
              alert("システムエラーが発生しました");
              return
            }
            const jobres:any = await this.$axios.get(this.$config.baseURL+"/api/job");
            if (jobres.data.data[0] !== undefined) {
              const resres:any = await this.$axios.get(this.$config.baseURL+"/api/reservation");
              const job_id = jobres.data.data[jobres.data.data.length - 1].id;
              const res_id = resres.data.data[resres.data.data.length - 1].id;
              const jobData = {
                job_id: job_id
              };
              await this.$axios.put(this.$config.baseURL+"/api/reservation/"+res_id, jobData);
            }
            this.$router.push('/done');
          } catch (e:any) {
            if (e.response.data.errors.reservation_date != undefined){
              alert(e.response.data.errors.reservation_date);
              return
            } else if (e.response.data.errors.reservation_time != undefined) {
              alert(e.response.data.errors.reservation_time);
              return
            } else if (e.response.data.errors.num_members != undefined) {
              alert(e.response.data.errors.num_members);
              return
            } else {
              alert("システムエラーが発生しました");
              return
            }
          }
        } else {
          return
        }
      }
    },
  }
})
</script>


<style scoped>

.reservation {
  position: absolute;
  top: -68px;
  right: 7%;
  width: 40%;
  height: 600px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  color: white;
}

h2 {
  width: 90%;
  margin: 30px auto;
  font-size: 20px;
}
.date {
  margin-left: 22px;
}
.date input {
  border-radius: 5px;
  padding: 2px 10px;
  cursor: pointer;
}
.select01 {
  width: 100%;
  margin-top: 10px;
  margin-left: 22px;
}
.select01 select{
  width: 90%;
  border-radius: 5px;
  padding: 3px 5px;
  cursor: pointer;
}
.select02 {
  width: 100%;
  margin-top: 10px;
  margin-left: 22px;
}
.select02 select{
  width: 90%;
  border-radius: 5px;
  padding: 3px 5px;
  cursor: pointer;
}
.table-padding {
  width: 82%;
  padding: 20px;
  border-radius: 5px;
  background-color: rgb(77, 127, 255);
  margin: 15px auto;
}
.reservation table {
  width: 100%;
  text-align: left;
}
.reservation table tr {
  height: 25px;
}
.reservation table th {
  font-size: 12px;
  font-weight: initial;
  width: 80px;
  vertical-align: middle;
}
.reservation table td {
  font-size: 12px;
  vertical-align: middle;
}

.button {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.button input {
  width: 100%;
  border: none;
  color: white;
  background-color: rgb(31, 56, 255);
  padding: 10px 0;
  border-radius: 0 0 5px 5px;
  cursor: pointer;
}
.button input:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.button input:disabled {
  background: rgb(159, 179, 255);
  color: rgb(255, 255, 255);
  opacity: 1;
  cursor: unset;
}

.error {
  color: rgb(255, 0, 115);
  padding-top: 5px;
  margin-left: 25px;
}

</style>

<style lang="scss" scoped>
@media screen and (max-width: 1100px) {
  .reservation {
    top: 0px;
  }
}
@media screen and (max-width: 768px) {
  h2 {
    padding-top: 20px;
  }
  .reservation {
    position: unset;
    margin: auto;
    width: 80%;
    height: 389px;
  }
  .button {
    width: 100%;
    position: unset;
    bottom: 0;
  }
  .button input {
    width: 100%;
    border: none;
    color: white;
    background-color: rgb(31, 56, 255);
    padding: 10px 0;
    border-radius: 0 0 5px 5px;
    cursor: pointer;
  }
}
</style>