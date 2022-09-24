<template>
  <div class="container">

    <ReservationWindow class="disappear" />

    <div v-show="display === true" class="shopcard">
      <div class="flex">
        <div class="back-button" @click="back" data-test="back">
          <p>&lt;</p>
        </div>
        <h2>{{shopCurrent.shop_name}}</h2>
      </div>
      <div class="shop-pic">
        <img :src="shopCurrent.pic_path" alt="画像">
      </div>

      <div class="shop-des">
        <p>
          <span>#{{shopCurrent.area_name}} </span>
          <span>#{{shopCurrent.genre_name}}　 </span>
          <img v-if="shopCurrent.evaluations === 0" src="/empty_star.png" alt="画像">
          <img v-if="shopCurrent.evaluations >= 0.2" src="/star.png" alt="画像">

          <img v-if="shopCurrent.evaluations < 0.3" src="/empty_star.png" alt="画像">
          <img v-if="shopCurrent.evaluations >= 0.3 && shopCurrent.evaluations < 0.4" src="/half_star.png" alt="画像">
          <img v-if="shopCurrent.evaluations >= 0.4" src="/star.png" alt="画像">

          <img v-if="shopCurrent.evaluations < 0.5" src="/empty_star.png" alt="画像">
          <img v-if="shopCurrent.evaluations >= 0.5 && shopCurrent.evaluations < 0.6" src="/half_star.png" alt="画像">
          <img v-if="shopCurrent.evaluations >= 0.6" src="/star.png" alt="画像">

          <img v-if="shopCurrent.evaluations < 0.7" src="/empty_star.png" alt="画像">
          <img v-if="shopCurrent.evaluations >= 0.7 && shopCurrent.evaluations < 0.8" src="/half_star.png" alt="画像">
          <img v-if="shopCurrent.evaluations >= 0.8" src="/star.png" alt="画像">

          <img v-if="shopCurrent.evaluations <= 0.9" src="/empty_star.png" alt="画像">
          <img v-if="shopCurrent.evaluations >= 0.9 && shopCurrent.evaluations < 1" src="/half_star.png" alt="画像">
          <img v-if="shopCurrent.evaluations === 1" src="/star.png" alt="画像">
          
          <span v-if="shopCurrent.evaluations > 0">{{Math.round(shopCurrent.evaluations*5 * 100)/100}}</span>
          <span class="total-score" v-if="shopCurrent.count !== null">　評価総数{{shopCurrent.count}}件</span>
          <span v-if="shopCurrent.count === null">　(評価はまだありません)</span>
        </p>
        <p>{{shopCurrent.description}}</p>
      </div>

      <CommentWindow class="disappear" />

    </div>

    <ReservationWindow class="appear" />

    <CommentWindow class="appear" />

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
    shopCurrent: Array<string|number>,
    display: boolean,
}
export default Vue.extend({
  data(): Data {
    return {
      shopCurrent: [],
      display: false,
    }

  },
  async fetch() {
    await this.$axios
      .get(this.$config.baseURL+"/api/shop/"+this.$route.params.id)
      .then((response) => (this.shopCurrent = response.data.data));
    this.display = true;
  },

  methods: {
    back() {
      history.back();
    },
  }
})
</script>

<style scoped>
.container {
  position: relative;
}

.shopcard {
  width: 40%;
  height: auto;
  margin: 0 80px;
}
.flex {
  display: flex;
  margin: 50px 0 30px 0;
}
.flex h2 {
  display: flex;
  margin: auto auto auto 10px;
  height: 30px;
  align-items: center;
  font-size: 24px;
}
.back-button {
  background-color: white;
  border: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.back-button p {
  transform: translate(0, -2px);
}


.shop-pic {
  height: auto;
}
.shop-pic img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.shop-des {
  width: 100%;
  height: auto;
  position: relative;
}
.shop-des h2 {
  padding: 15px 0 0 15px;
}
.shop-des p:first-child {
  padding: 20px 0px;
}
.shop-des p {
  font-size: 14px;
  line-height: 20px;
}
.shop-des p img{
  height: 20px;
  width: 20px;
}

.total-score {
  display: inline-block;
  position: absolute;
  right: 0%;
  top: 22px;
}
.appear {
  display: none;
}

</style>

<style lang="scss" scoped>
@media screen and (max-width: 930px) {
  .total-score {
    top: 42px;
  }
}
@media screen and (max-width: 768px) {
  .shopcard {
    width: 80%;
    margin: auto;
  }
  .total-score {
    top: 22px;
  }
  .disappear {
    display: none;
  }
  .appear {
    display: block;
  }
}

</style>