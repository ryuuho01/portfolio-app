<template>
  <div>
    <div class="send-window">
      <div class="send-ttl">
        <p>　　 メール</p>
      </div>

      <div class="addEmail">
        <button @click="modal" data-test="modal">宛先追加</button>
      </div>
      <table class="send">
        <tbody>
          <tr>
            <th>TO:</th>
            <td>
              <span v-if="TO !== []">{{TO[0]}}</span>
              <span v-if="TO.length > 1">＋他{{TO.length-1}}名</span>
            </td>
          </tr>
          <tr>
            <th>CC:</th>
            <td>
              <span v-if="CC !== []">{{CC[0]}}</span>
              <span v-if="CC.length > 1">＋他{{CC.length-1}}名</span>
            </td>
          </tr>
          <tr>
            <th>BCC:</th>
            <td>
              <span v-if="BCC !== []">{{BCC[0]}}</span>
              <span v-if="BCC.length > 1">＋他{{BCC.length-1}}名</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="subject">
        件名： <input v-model="subject" type="text">
      </div>

      <div class="text">
        <p>本文</p>
        <div>
          <textarea v-model="text" name="text"  cols="38" rows="14" required></textarea>
        </div>
      </div>

      <div class="button">
        <button class="send-button" @click="sendEmail" data-test="sendEmail">送信</button><br>
      </div>
    </div>

    <div id="modal" :class="vClass" @click="close2" data-test="close2">
      <div class="modal__content">
        <div class="modal__content-inner">

          <p>【メールアドレスを追加します】</p>
          <div class="addFlex">
            <div>
                <div class="search">
                  検索：<input v-model="keyword" placeholder="検索" type="text">
                </div>

                  <div>
                    <div class="emails">
                      <div v-for="item,index in filteredEmails" :key="index.id">
                        <input :id="'email'+index" type="checkbox" name="email" :value=item.email>
                        <span>{{item.name}}&lt;{{item.email}}&gt;</span>
                      </div>
                      <div v-if="filteredEmails[0] === undefined">該当なし</div>
                    </div>
                    <button @click="selectAll" data-test="selectAll">全選択</button> <button @click="unsetAll" data-test="unsetAll">全解除</button>
                  </div>

           </div>
            <div class="sendBox">
                <span>TO:　</span><button @click="addTo" data-test="addTo">追加</button>　<button @click="clearTo" data-test="clearTo">クリア</button>
                <textarea v-model="TO" cols="38" rows="5" disabled></textarea>
                <span>CC:　</span><button @click="addCC" data-test="addCC">追加</button>　<button @click="clearCC" data-test="clearCC">クリア</button>
                <textarea v-model="CC" cols="38" rows="5" disabled></textarea>
                <span>BCC:　</span><button @click="addBCC" data-test="addBCC">追加</button>　<button @click="clearBCC" data-test="clearBCC">クリア</button>
                <textarea v-model="BCC" cols="38" rows="5" disabled></textarea>
            </div>
          </div>

          <div class="modalClose">
            <button @click="close1" data-test="close1">閉じる</button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
  vClass: string,
  TO: Array<string>,
  CC: Array<string>,
  BCC: Array<string>,
  subject: string,
  text: string,
  emailData: Array<string>,
  keyword: string,
}

export default Vue.extend({
  data(): Data {
    return {
      vClass: "modal",
      TO: [],
      CC: [],
      BCC: [],
      subject:"",
      text: "",
      emailData: [],
      keyword: "",
    }
  },
  async fetch() {
    await this.$axios
      .get(this.$config.baseURL+"/api/auth/users")
      .then((response) => (this.emailData = response.data.data));
  },
  computed: {
    filteredEmails() {
      return (this as any).filterEmails();
    },
  },
  methods: {
    modal() {
      this.keyword = "";
      this.vClass = "modal-open";
    },
    close1() {
      this.unsetAll();
      this.vClass = "modal";
    },
    close2() {
      window.addEventListener('click', (e:any) => { if (!e.target.closest('.modal__content-inner') && !e.target.closest('.addEmail')) { this.unsetAll(); this.vClass = "modal"; }});
    },

    filterEmails() {
      if(this.keyword === "") {
        let filtered = [];
        for (let i=0; i < this.emailData.length; i++) {
          let email:any = this.emailData[i];
          if (email.email.indexOf(".tmp") === -1) {
            filtered.push(email);
          }
        }
        return filtered;
      } else if(this.keyword !== "") {
        let filtered = [];
        for (let i=0; i < this.emailData.length; i++) {
          let email:any = this.emailData[i];
          if ((email.email.indexOf(this.keyword) !== -1 || email.name.indexOf(this.keyword) !== -1) && email.email.indexOf(".tmp") === -1) {
              filtered.push(email);
          }
        }
        return filtered;
      }
    },
    addTo() {
      let emails = document.querySelectorAll("input[name=email]:checked");
      for (let i=0; i < emails.length; i++) {
        this.TO.push((emails[i] as any).value)
      }
      this.unsetAll();
    },
    clearTo() {
      this.TO = [];
    },
    addCC() {
      let emails = document.querySelectorAll("input[name=email]:checked");
      for (let i=0; i < emails.length; i++) {
        this.CC.push((emails[i] as any).value)
      }
      this.unsetAll();
    },
    clearCC() {
      this.CC = [];
    },
    addBCC() {
      let emails = document.querySelectorAll("input[name=email]:checked");
      for (let i=0; i < emails.length; i++) {
        this.BCC.push((emails[i] as any).value)
      }
      this.unsetAll();
    },
    clearBCC() {
      this.BCC = [];
    },
    selectAll() {
      for (let i=0; i < this.filteredEmails.flat().length; i++) {
        if ((document.getElementById("email"+i) as any) !== null && (document.getElementById("email"+i) as any).checked === false){
          (document.getElementById("email"+i) as any).checked = true;
        }
      }
    },
    unsetAll() {
      for (let i=0; i < this.emailData.length; i++) {
        if ((document.getElementById("email"+i) as any) !== null && (document.getElementById("email"+i) as any).checked === true){
          (document.getElementById("email"+i) as any).checked = false;
        }
      }
    },
    async sendEmail() {
      try {
        if (this.TO[0] === undefined){
          alert("TO:の宛先を選択して下さい");
          return
        }
        const sendEmailData = {
          TO: this.TO,
          CC: this.CC,
          BCC: this.BCC,
          subject: this.subject,
          text: this.text
        }
        await this.$axios.post(this.$config.baseURL+"/api/auth/email" ,sendEmailData)
        this.TO = [];
        this.CC = [];
        this.BCC = [];
        this.subject = "",
        this.text = "";
        alert("メールを送信しました")
      } catch(e:any)  {
        if (e.response.data.errors.TO !== undefined){
          alert(e.response.data.errors.TO)
        }
        return
      }
    },
  },
})
</script>

<style scoped>
.send-window {
  background: white;
  width: 400px;
  margin: 60px 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  position: relative;
}
.send-ttl {
  height: 50px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px 5px 0 0;
}
.send-ttl p {
  color: white;
  padding: 17px;
  font-size: 14px;
}
.send {
  margin-left: 50px;
  text-align: left;
  margin-top: 10px;
}

.send tr {
  height: 25px;
}
.send td {
  padding-left: 20px;
}
.send-ttl::before {
  content: "";
  background: url("~static/mail.png") no-repeat;
  background-size: cover;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 12px;
  left: 20px;
}
.addEmail {
  margin-top: 20px;
  margin-left: 50px;
}
.addEmail button:hover{
  cursor: pointer;
}
.subject {
  margin-top: 15px;
  margin-left: 50px;
}
.subject input {
  width: 260px;
}
.send input {
  width: 100%;
  height: 30px;
  font-size: 15px;
  border: none;
  border-bottom: 1px solid black;
}
.send button {
  padding: 5px;
}

.button {
  text-align: right;
}
.send-button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.send-button {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  margin: 15px 25px 15px 0;
}
.send-button:disabled {
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
.text {
  margin: 25px 30px 0 50px;
}
.text textarea {
  font-size: 15px;
  resize: none;
}
</style>

<style scoped>
.addFlex {
  display: flex;
}

.modal {
  display: none;
  position: fixed;
  left: 0%;
  top: 0%;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.5);
}
.modal-open {
  display: block;
  position: fixed;
  left: 0%;
  top: 0%;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.5);
}
.modal__content{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.modal__content-inner{
  background-color: white;
  width: 700px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
}
.modal__content-inner p {
  font-size: 20px;
  width: 300px;
  margin: auto;
  margin-bottom: 20px;
}
.modal__content-inner button {
  cursor: pointer;
}
.search {
  margin: 10px 0;
}
.search input {
  padding: 5px;
}
.emails {
  height: 200px;
  width: 400px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  overflow-y: auto;
  margin-right: 10px;
  margin-bottom: 10px;
}

.sendBox textarea{
  resize: none;
}
.modalClose {
  text-align: center;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  .send-window {
    margin: auto;
    margin-top: 20px;
  }
}
</style>
