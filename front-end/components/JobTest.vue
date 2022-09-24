<template>

    <div>
      <div class="test-window">
        <div class="test-ttl">
          <p>　　 Jobの動作確認</p>
        </div>
        <div class="test-des">
          <p>　ここではお店予約時のJob動作を確認するため、Jobの設定を変更します。<br>
          現在、お店の予約後の動作は</p>
          <ul>
            <li>メールリマインダー送信：予約当日午前7時</li>
            <li>予約自動削除：予約翌日午前0時</li>
            <li>マイページの評価欄表示：予約翌日午前7時</li>
          </ul>
          <p>が実装されています。</p>

          <p class="test-explain">　これらのJob実施タイミングを"即時"で確認したい場合、以下のプルダウンメニューから「テスト中」を選択し、「保存」をクリックして下さい。設定後、お店の予約をして動作確認して下さい。元に戻す場合は「テストしない」を選択して保存して下さい。</p>

        </div>
        <div class="select">
          <select v-model="test">
            <option value="0">テストしない</option>
            <option value="1">テスト中</option>
          </select>
        </div>

        <div class="button">
          <button class="test-button" @click="change_value" data-test="change_value">保存</button>
        </div>
      </div>

    </div>

</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
  test: string,
}

export default Vue.extend({
  data(): Data {
    return {
      test: "0",
    }
  },
  async fetch() {
    const testData = await this.$axios.get(this.$config.baseURL+"/api/auth/test");
    this.test = testData.data.data[0].test
  },
  methods: {
    async change_value() {
      const sendtestData = {
        test: this.test,
      };
      try {
        if ((this as any).test === "0") {
          await this.$axios.post(this.$config.baseURL+"/api/auth/test", sendtestData);
          alert("テストモードを解除しました");
        } else if ((this as any).test === "1") {
          await this.$axios.post(this.$config.baseURL+"/api/auth/test", sendtestData);
          alert("テストモードになりました");
        }
      } catch(e:any)  {
          alert("システムエラーが発生しました")
      }
    }
  },
})
</script>

<style scoped>
.test-window {
  background: white;
  width: 400px;
  margin: 60px 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  position: relative;
}
.test-ttl {
  height: 50px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px 5px 0 0;
}
.test-ttl::before {
  content: "";
  background: url("~static/home.png") no-repeat;
  background-size: cover;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 12px;
  left: 20px;
}
.test-ttl p {
  color: white;
  padding: 17px;
  font-size: 14px;
}
.test-des{
  padding: 20px;
}
.test-des ul{
  padding: 20px;
}
.test-explain {
  margin-top: 10px;
}
.select {
  text-align: center;
}
.select select {
  height: 30px;
}
.select select:hover {
  cursor: pointer;
}

.button {
  text-align: right;
}
.test-button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.test-button {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  margin: 15px 25px 15px 0;
}
.test-button:disabled {
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
  .test-window {
    margin: auto;
    margin-top: 20px;
  }
}
</style>