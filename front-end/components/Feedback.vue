<template>
  <div class="flex">
    <div v-for="item in user_feedback" :key="item.id" class="send-window">
      <div class="send-ttl">
        <p>　　 {{item.shop_name}}へのご来店、ありがとうございました！</p>
      </div>

      <div class="evaluation">
        評価：
        <span>悪い 1</span>
        <img v-show="item.evaluation < 1" @click="evaluation1(item.id)" src="/empty_star.png" alt="画像">
        <img v-show="item.evaluation > 0" @click="evaluation1(item.id)" src="/star.png" alt="画像" data-test="evaluation1(item.id)">
        <img v-show="item.evaluation < 2" @click="evaluation2(item.id)" src="/empty_star.png" alt="画像">
        <img v-show="item.evaluation > 1" @click="evaluation2(item.id)" src="/star.png" alt="画像" data-test="evaluation2(item.id)">
        <img v-show="item.evaluation < 3" @click="evaluation3(item.id)" src="/empty_star.png" alt="画像">
        <img v-show="item.evaluation > 2" @click="evaluation3(item.id)" src="/star.png" alt="画像" data-test="evaluation3(item.id)">
        <img v-show="item.evaluation < 4" @click="evaluation4(item.id)" src="/empty_star.png" alt="画像">
        <img v-show="item.evaluation > 3" @click="evaluation4(item.id)" src="/star.png" alt="画像" data-test="evaluation4(item.id)">
        <img v-show="item.evaluation < 5" @click="evaluation5(item.id)" src="/empty_star.png" alt="画像">
        <img v-show="item.evaluation > 4" @click="evaluation5(item.id)" src="/star.png" alt="画像" data-test="evaluation5(item.id)">
        <span>5 良い</span>
      </div>

      <div class="text">
        <p>ご感想(任意)</p>
        <div>
          <textarea v-model="comment" cols="40" rows="8"></textarea>
        </div>
      </div>

      <div class="button">
        <button class="send-button" @click="notEvaluate(item.id)" data-test="notEvaluate(item.id)">評価しない</button>
        <button class="send-button" @click="evaluate(item.id)" :disabled="item.evaluation === null" data-test="evaluate(item.id)">送信</button>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
  feedback: Array<string|number>,
  user_feedback: Array<string|number>,
  evaluation: number|null,
  comment: string|null,

}

export default Vue.extend({
  data(): Data {
    return {
      feedback: [],
      user_feedback: [],
      evaluation: null,
      comment: null,
    }
  },
  async fetch() {
    await this.$axios
      .get(this.$config.baseURL+"/api/evaluation")
      .then((response) => ((this as any).feedback = response.data.data));
      const filtered = [];
      for (let i in (this as any).feedback) {
        let user_feedback: any = (this as any).feedback[i];
        if (user_feedback.user_id === (this as any).$auth.user.id && user_feedback.answer === 0) {
            filtered.push(user_feedback);
        }
      }
    this.user_feedback = filtered;
  },

  methods: {
    async getEvaluation() {
      await this.$axios
      .get(this.$config.baseURL+"/api/evaluation")
      .then((response) => ((this as any).feedback = response.data.data));
      const filtered = [];
      for (let i in (this as any).feedback) {
        let user_feedback: any = (this as any).feedback[i];
        if (user_feedback.user_id === (this as any).$auth.user.id && user_feedback.answer === 0) {
            filtered.push(user_feedback);
        }
      }
      this.user_feedback = filtered;
    },
    async evaluation1(evaluation_id:number) {
      const sendevaluationData = {
        evaluation: 1
      };
      try {
      await this.$axios.put(this.$config.baseURL+"/api/evaluation/"+evaluation_id, sendevaluationData)
      } catch {
        alert("システムエラーが発生しました");
      }
      this.getEvaluation();
    },
    async evaluation2(evaluation_id:number) {
      const sendevaluationData = {
        evaluation: 2
      };
      try {
      await this.$axios.put(this.$config.baseURL+"/api/evaluation/"+evaluation_id, sendevaluationData)
      } catch {
        alert("システムエラーが発生しました");
      }
      this.getEvaluation();
    },
    async evaluation3(evaluation_id:number) {
      const sendevaluationData = {
        evaluation: 3
      };
      try {
      await this.$axios.put(this.$config.baseURL+"/api/evaluation/"+evaluation_id, sendevaluationData)
      } catch {
        alert("システムエラーが発生しました");
      }
      this.getEvaluation();
    },
    async evaluation4(evaluation_id:number) {
      const sendevaluationData = {
        evaluation: 4
      };
      try {
      await this.$axios.put(this.$config.baseURL+"/api/evaluation/"+evaluation_id, sendevaluationData)
      } catch {
        alert("システムエラーが発生しました");
      }
      this.getEvaluation();
    },
    async evaluation5(evaluation_id:number) {
      const sendevaluationData = {
        evaluation: 5
      };
      try {
      await this.$axios.put(this.$config.baseURL+"/api/evaluation/"+evaluation_id, sendevaluationData)
      } catch {
        alert("システムエラーが発生しました");
      }
      this.getEvaluation();
    },
    async notEvaluate(evaluation_id:number) {
      const sendevaluationData = {
        answer: 0
      };
      try {
      await this.$axios.put(this.$config.baseURL+"/api/evaluation/"+evaluation_id, sendevaluationData);
      location.href='/mypage';
      alert("ご回答、ありがとうございました！");
      } catch {
        alert("システムエラーが発生しました");
      }
    },
    async evaluate(evaluation_id:number) {
      const sendevaluationData = {
        comment: this.comment,
        answer: 1
      };
      try {
      await this.$axios.put(this.$config.baseURL+"/api/evaluation/"+evaluation_id, sendevaluationData);
      location.href='/mypage';
      alert("ご回答、ありがとうございました！");
      } catch {
        alert("システムエラーが発生しました");
      }

    }
  },
})
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 80px;
}
.send-window {
  background: white;
  width: 500px;
  margin: 30px 5px;
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
  background: url("~static/mail2.png") no-repeat;
  background-size: cover;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 12px;
  left: 20px;
}
.evaluation {
  margin-top: 15px;
  margin-left: 50px;
}
.evaluation img:hover {
  cursor: pointer;
}
.evaluation input {
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

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .flex {
  justify-content: center;
  margin: auto;
}
}
</style>