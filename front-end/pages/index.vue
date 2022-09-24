<template>

  <div>
    <div class="headcontainer">
      <div class="search">
        <div class="select01">
          <select v-model="vModelarea" name="area_name" id="select01" data-test="area">
            <option>全地域</option>
            <option v-for="item in areaCurrent" :key="item.id">{{item.area_name}}</option>
          </select>
        </div>
        <div class="separation"></div>
        <div class="select02">
          <select v-model="vModelgenre" class="select" name="genre_name" id="select02" data-test="genre">
            <option>全ジャンル</option>
            <option v-for="item in genreCurrent" :key="item.id">{{item.genre_name}}</option>
          </select>
        </div>
        <div class="separation"></div>
        <div class="input">
          <input v-model="vModelkeyword" placeholder="検索" type="text" data-test="keyword">
        </div>
      </div>
    </div>

    <div class="page">
      <div class="page-display">
        表示件数：
        <select class="display-amount" v-model="open_page">
          <option value="4">4件</option>
          <option value="8">8件</option>
          <option value="12">12件</option>
          <option value="24">24件</option>
        </select>
        <span v-if="filteredShopcards[currentPage]">　全{{filteredShopcards.flat().length}}件中　{{open_page*(currentPage)+1}}〜{{filteredShopcards[currentPage].length+currentPage*open_page}}件</span>
      </div>
      <div>
        <button @click="previousPage" :disabled="currentPage === 0 || pages === 0">&lt;</button>
        <button @click="previousPage" data-test="previousPage" hidden></button>
        <button class="cPage" v-for="index in pages" :key="index.id" @click="ind(index-1)" :disabled="currentPage === index-1 || pages === 0">{{index}}</button>
        <button @click="ind(index-1)" data-test="ind(index-1)" hidden></button>
        <button @click="nextPage" :disabled="currentPage === pages-1 || pages === 0">&gt;</button>
        <button @click="nextPage" data-test="nextPage" hidden></button>
      </div>
    </div>

    <div v-if="filteredShopcards[0] === undefined && display === true" class="nothing">該当するお店はありません</div>

    <div class="shopcards">

      <div class="shopcard" v-for="item in filteredShopcards[currentPage]" :key="item.id">

        <div @click="detail(item.id)" class="shop-pic">
          <img :src="item.pic_path" alt="画像">
        </div>

        <div class="shop-des" >
          <h2 @click="detail(item.id)" data-test="shop_name">
            <span>{{item.shop_name}}</span>
          </h2>
          <div class="flex1">
            <p>
              <span @click="add_area(item.area_name)" data-test="add_area(item.area_name)">#{{item.area_name}} </span><br>
              <span @click="add_genre(item.genre_name)" data-test="add_genre(item.genre_name)">#{{item.genre_name}} </span>
            </p>
            <div>
              <div class="stars">
                <img v-if="item.evaluations === 0" src="/empty_star.png" alt="画像">
                <img v-if="item.evaluations >= 0.2" src="/star.png" alt="画像">

                <img v-if="item.evaluations < 0.3" src="/empty_star.png" alt="画像">
                <img v-if="item.evaluations >= 0.3 && item.evaluations < 0.4" src="/half_star.png" alt="画像">
                <img v-if="item.evaluations >= 0.4" src="/star.png" alt="画像">

                <img v-if="item.evaluations < 0.5" src="/empty_star.png" alt="画像">
                <img v-if="item.evaluations >= 0.5 && item.evaluations < 0.6" src="/half_star.png" alt="画像">
                <img v-if="item.evaluations >= 0.6" src="/star.png" alt="画像">

                <img v-if="item.evaluations < 0.7" src="/empty_star.png" alt="画像">
                <img v-if="item.evaluations >= 0.7 && item.evaluations < 0.8" src="/half_star.png" alt="画像">
                <img v-if="item.evaluations >= 0.8" src="/star.png" alt="画像">

                <img v-if="item.evaluations <= 0.9" src="/empty_star.png" alt="画像">
                <img v-if="item.evaluations >= 0.9 && item.evaluations < 1" src="/half_star.png" alt="画像">
                <img v-if="item.evaluations === 1" src="/star.png" alt="画像">

                <span v-if="item.evaluations > 0">{{Math.round(item.evaluations*5 * 100)/100}}</span>
              </div>
              <div class="comment">
                <span v-if="item.comments !== 0">コメント数{{item.comments}}件</span>
              </div>
            </div>
          </div>
          <div class="flex2">
            <button @click="detail(item.id)" data-test="detail">詳しくみる</button>
              <img v-if="item.favorites === 1" @click="deleteFavorite(item.id)" src="/heart2.png" alt="画像" data-test="delete">
              <img v-else @click="addFavorite(item.id)" src="/heart1.png" alt="画像" data-test="addfavorite">
          </div>
        </div>

      </div>

    </div>

  </div>

</template>

<script lang="ts">
import Vue from 'vue';
interface Data {
  userId: number,
  shopCurrent: Array<object>,
  areaCurrent: Array<object>,
  genreCurrent: Array<object>,
  vModelarea: string,
  vModelgenre: string,
  vModelkeyword: string,
  pages: number,
  currentPage: number,
  open_page: number,
  start_page: number,
  end_page: number,

  display: boolean,
}

export default Vue.extend({
  data(): Data {
    return {
      userId: 0,
      shopCurrent: [],
      areaCurrent: [],
      genreCurrent: [],
      vModelarea: "全地域",
      vModelgenre: "全ジャンル",
      vModelkeyword: "",
      pages: 1,
      currentPage: 0,
      open_page: 8,
      start_page: 0,
      end_page: 0,

      display: false,
    }
  },
  async fetch() {
    await this.$axios
      .get(this.$config.baseURL+"/api/area")
      .then((response) => (this.areaCurrent = response.data.data));
    await this.$axios
      .get(this.$config.baseURL+"/api/genre")
      .then((response) => (this.genreCurrent = response.data.data));
    await this.$axios
      .get(this.$config.baseURL+"/api/shop")
      .then((response) => (this.shopCurrent = response.data.data));

    if ((this as any).$auth.loggedIn) {
      this.userId = (this as any).$auth.user.id;

      for(let i=0; i < this.shopCurrent.length; i++) {
        let count = 0;
        for(let j=0; j < (this as any).shopCurrent[i]["favorites"].length; j++) {
          if((this as any).shopCurrent[i]["favorites"][j]["user_id"] == this.userId && (this as any).shopCurrent[i]["favorites"][j]["favorite"] == 1) {
            count++;
          }
        }
        if(count != 0){
          (this as any).shopCurrent[i]["favorites"] = 1;
        } else {
          (this as any).shopCurrent[i]["favorites"] = 0;
        }
      }
    }
    this.display = true;
  },

  computed: {
    filteredShopcards: function() {
      return (this as any).filterShopcards();
    },
  },

  methods: {

    async getInfo() {
      await this.$axios
        .get(this.$config.baseURL+"/api/shop")
        .then((response) => (this.shopCurrent = response.data.data));

      if ((this as any).$auth.loggedIn) {
        for(let i=0; i < this.shopCurrent.length; i++) {
          let count = 0;
          for(let j=0; j < (this as any).shopCurrent[i]["favorites"].length; j++) {
            if((this as any).shopCurrent[i]["favorites"][j]["user_id"] === this.userId && (this as any).shopCurrent[i]["favorites"][j]["favorite"] === 1) {
              count++;
            }
          }
          if(count !== 0){
            (this as any).shopCurrent[i]["favorites"] = 1;
          } else {
            (this as any).shopCurrent[i]["favorites"] = 0;
          }
        }
      }
    },

    addFavorite: async function(item_id: number) {
      if((this as any).$auth.loggedIn) {
      const favoriteData = {
        user_id: this.userId,
        shop_id: item_id,
        favorite: true,
      }
      await this.$axios
        .post(this.$config.baseURL+"/api/favorite",favoriteData);

      this.getInfo();

      } else {
        this.$router.push('/login')
      };
    },

    deleteFavorite: async function(item_id: number) {

      let favoriteId = 0;
      const favoriteresData = await this.$axios.get(this.$config.baseURL+"/api/favorite");
      for(let i=0; i < favoriteresData.data.data.length; i++) {
        if(favoriteresData.data.data[i]["user_id"] == this.userId && favoriteresData.data.data[i]["shop_id"] == item_id) {
          favoriteId = favoriteresData.data.data[i]["id"];
          break
        };
      }
      const deletepath = this.$config.baseURL+"/api/favorite/"+favoriteId;
      await this.$axios
      .delete(deletepath);

      this.getInfo();
    },

    filterShopcards() {

      if (this.vModelarea === "全地域" && this.vModelgenre === "全ジャンル" && this.vModelkeyword === "") {
        let filtered = [];
        for (let i in this.shopCurrent) {
          const last = filtered[filtered.length - 1];
          let shopcard: any = this.shopCurrent[i];
          if (!last || last.length === Number(this.open_page)) {
              filtered.push([shopcard]);
          } else {
            last.push(shopcard);
          }
        }
        if (filtered.length !== 0) {
          this.pages = filtered.length;
        } else {
          this.pages = 1;
        }
        this.currentPage = 0;
        return filtered;
      } else if(this.vModelarea !== "全地域" && this.vModelgenre === "全ジャンル" && this.vModelkeyword === "") {
        let filtered = [];
        for (let i in this.shopCurrent) {
          const last = filtered[filtered.length - 1];
          let shopcard: any = this.shopCurrent[i];
          if ((!last || last.length === Number(this.open_page)) && shopcard.area_name.indexOf(this.vModelarea) !== -1) {
              filtered.push([shopcard]);
          } else if (last && shopcard.area_name.indexOf(this.vModelarea) !== -1){
            last.push(shopcard);
          }
        }
        if (filtered.length !== 0) {
          this.pages = filtered.length;
        } else {
          this.pages = 1;
        }
        this.currentPage = 0;
        return filtered;
      } else if(this.vModelgenre !== "全ジャンル" && this.vModelarea === "全地域" && this.vModelkeyword === "") {
        let filtered = [];
        for (let i in this.shopCurrent) {
          const last = filtered[filtered.length - 1];
          let shopcard: any = this.shopCurrent[i];
          if ((!last || last.length === Number(this.open_page)) && shopcard.genre_name.indexOf(this.vModelgenre) !== -1) {
              filtered.push([shopcard]);
          } else if (last && shopcard.genre_name.indexOf(this.vModelgenre) !== -1){
            last.push(shopcard);
          }
        }
        if (filtered.length !== 0) {
          this.pages = filtered.length;
        } else {
          this.pages = 1;
        }
        this.currentPage = 0;
        return filtered;
      } else if(this.vModelkeyword !== "" && this.vModelarea === "全地域" && this.vModelgenre === "全ジャンル") {
        let filtered = [];
        for (let i in this.shopCurrent) {
          const last = filtered[filtered.length - 1];
          let shopcard: any = this.shopCurrent[i];
          if ((!last || last.length === Number(this.open_page)) && shopcard.shop_name.indexOf(this.vModelkeyword) !== -1) {
              filtered.push([shopcard]);
          } else if (last && shopcard.shop_name.indexOf(this.vModelkeyword) !== -1){
            last.push(shopcard);
          }
        }
        if (filtered.length !== 0) {
          this.pages = filtered.length;
        } else {
          this.pages = 1;
        }
        this.currentPage = 0;
        return filtered;
      } else if(this.vModelarea !== "全地域" && this.vModelgenre !== "全ジャンル" && this.vModelkeyword === "") {
        let filtered = [];
        for (let i in this.shopCurrent) {
          const last = filtered[filtered.length - 1];
          let shopcard: any = this.shopCurrent[i];
          if ((!last || last.length === Number(this.open_page)) && shopcard.area_name.indexOf(this.vModelarea) !== -1 && shopcard.genre_name.indexOf(this.vModelgenre) !== -1) {
              filtered.push([shopcard]);
          } else if (last && shopcard.area_name.indexOf(this.vModelarea) !== -1 && shopcard.genre_name.indexOf(this.vModelgenre) !== -1){
            last.push(shopcard);
          }
        }
        if (filtered.length !== 0) {
          this.pages = filtered.length;
        } else {
          this.pages = 1;
        }
        this.currentPage = 0;
        return filtered;
      } else if(this.vModelarea !== "全地域" && this.vModelkeyword !== "" && this.vModelgenre === "全ジャンル") {
        let filtered = [];
        for (let i in this.shopCurrent) {
          const last = filtered[filtered.length - 1];
          let shopcard: any = this.shopCurrent[i];
          if ((!last || last.length === Number(this.open_page)) && shopcard.area_name.indexOf(this.vModelarea) !== -1 && shopcard.shop_name.indexOf(this.vModelkeyword) !== -1) {
              filtered.push([shopcard]);
          } else if (last && shopcard.area_name.indexOf(this.vModelarea) !== -1 && shopcard.shop_name.indexOf(this.vModelkeyword) !== -1){
            last.push(shopcard);
          }
        }
        if (filtered.length !== 0) {
          this.pages = filtered.length;
        } else {
          this.pages = 1;
        }
        this.currentPage = 0;
        return filtered;
      } else if(this.vModelarea !== "全ジャンル" && this.vModelkeyword !== "" && this.vModelarea === "全地域") {
        let filtered = [];
        for (let i in this.shopCurrent) {
          const last = filtered[filtered.length - 1];
          let shopcard: any = this.shopCurrent[i];
          if ((!last || last.length === Number(this.open_page)) && shopcard.genre_name.indexOf(this.vModelgenre) !== -1 && shopcard.shop_name.indexOf(this.vModelkeyword) !== -1) {
              filtered.push([shopcard]);
          } else if (last && shopcard.genre_name.indexOf(this.vModelgenre) !== -1 && shopcard.shop_name.indexOf(this.vModelkeyword) !== -1){
            last.push(shopcard);
          }
        }
        if (filtered.length !== 0) {
          this.pages = filtered.length;
        } else {
          this.pages = 1;
        }
        this.currentPage = 0;
        return filtered;
      } else if(this.vModelarea !== "全ジャンル" && this.vModelarea !== "全地域" && this.vModelkeyword !== "") {
        let filtered = [];
        for (let i in this.shopCurrent) {
          const last = filtered[filtered.length - 1];
          let shopcard: any = this.shopCurrent[i];
          if ((!last || last.length === Number(this.open_page)) && shopcard.area_name.indexOf(this.vModelarea) !== -1 && shopcard.genre_name.indexOf(this.vModelgenre) !== -1 && shopcard.shop_name.indexOf(this.vModelkeyword) !== -1) {
              filtered.push([shopcard]);
          } else if (last && shopcard.area_name.indexOf(this.vModelarea) !== -1 && shopcard.genre_name.indexOf(this.vModelgenre) !== -1 && shopcard.shop_name.indexOf(this.vModelkeyword) !== -1){
            last.push(shopcard);
          }
        }
        if (filtered.length !== 0) {
          this.pages = filtered.length;
        } else {
          this.pages = 1;
        }
        this.currentPage = 0;
        return filtered;
      }
    },
    ind: function(index_page:number) {
      this.currentPage = index_page;
    },

    detail: function(item_id: number) {
      this.$router.push('/detail/'+item_id);
    },
    add_area(area_name:string) {
      this.vModelarea = area_name;
    },
    add_genre(genre_name:string) {
      this.vModelgenre = genre_name;
    },
    previousPage() {
      this.currentPage = this.currentPage - 1;
    },
    nextPage() {
      this.currentPage = this.currentPage + 1;
    },
  },
})
</script>

<style scoped>
.headcontainer {
  position: relative;
}
.search {
  position: absolute;
  top: -68px;
  right: 0px;
  background-color: white;
  width: 540px;
  height: 40px;
  margin: 0 80px 0 auto;
  text-align: left;
  display: flex;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  border-radius: 5px;
}

.separation {
  height: 25px;
  width: 2px;
  background-color: rgb(240, 240, 240);
  margin: auto 5px;
}
.search #select01 {
  display: inline-block;
  width: 85px;
  height: 40px;
  border-radius: 5px 0 0 5px;
  border: none;
  background-color: white;
  padding-left: 10px;
  cursor: pointer;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  position: relative;
}
select {
  background-image: url("~static/direction.png");
  background-position: right 1px center;
  background-repeat: no-repeat;
  background-size: 12px 12px;
}

.search #select02 {
  display: inline-block;
  width: 95px;
  height: 40px;
  border: none;
  background-color: white;
  padding-left: 10px;
  cursor: pointer;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

select::-ms-expand {
  display: none;
}
.search input {
  display: inline-block;
  width: 300px;
  height: 38px;
  border-radius: 0 5px 5px 0;
  border: none;
  background-color: white;
  padding-left: 35px;
  cursor: pointer;
}
.input input{
  background-image: url("~static/search.png");
  background-position: left 4px center;
  background-repeat: no-repeat;
  background-size: 18px 18px;
}

</style>

<style scoped>
.page {
  margin: 20px 80px;
  text-align: right;
  display: flex;
  justify-content: right;
}
.page-display {
  margin: auto 10px;
}
.display-amount {
  background-image: url("~static/direction.png");
  background-position: right 5px center;
  background-repeat: no-repeat;
  background-size: 12px 12px;
  display: inline-block;
  width: 60px;
  height: 25px;
  border: none;
  background-color: white;
  padding-left: 15px;
  cursor: pointer;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  border-radius: 5px;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.page button{
  padding: 10px 15px;
  cursor: pointer;
}
.page button:disabled {
  cursor: unset;
}
.cPage:disabled {
  color: white;
  background-color: black;
}

.nothing {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  font-size: 30px;
}
.shopcards {
  margin: 0 70px 0 80px;
  display: flex;
  flex-wrap: wrap;
}
.shopcard {
  width: 262.5px;
  height: 270px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  margin-right: 10px;
  margin-bottom: 20px;
}
.shop-pic {
  height: 135px;
  border-radius: 5px 5px 0 0;
}
.shop-pic:hover {
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s;
}
.shop-pic img {
  width: 100%;
  height: 135px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}
.shop-des {
  width: 260px;
  height: 110px;
}
.shop-des h2 {
  padding: 15px 0 0 15px;
}
.shop-des h2 span:hover {
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s;
}
.shop-des p {
  padding: 5px 15px;
  font-size: 11px;
}
.shop-des p span:hover {
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s;
}
.shop-des button {
  border-radius: 5px;
  border: none;
  background-color: rgb(48, 93, 255);
  color: white;
  padding: 5px 13px;
  cursor: pointer;
  font-size: 12px;
}
.shop-des button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.flex1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
.tag {
  padding: 2px 0;
}
.stars {
  padding-right: 15px;
}
.stars img {
  height: 20px;
  width: 20px;
}
.stars span{
  font-size: 12px;
}
.comment {
  font-size: 15px;
  text-align: right;
  margin-right: 12px;
  margin-top: 8px;
}
.flex2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
}
.flex2 img{
  height: 27px;
  width: 27px;
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 1200px) {
  .search {
    width: 300px;
  }
  .input input {
    width: 70px;
  }
}
@media screen and (max-width: 1000px) {
  .search {
    top: -48px;
  }
  .page {
    margin: 20px 80px;
    margin-top: 50px;
  }
}
@media screen and (max-width: 768px) {
  .page {
    flex-direction: column;
    text-align: center;
  }
  .page div {
    margin: 10px 0;
  }
  .shopcard {
    width: 100%;
    height: 430px;
  }
  .shop-pic {
  height: 250px;
  }
  .shop-pic img {
    height: 250px;
  }
  .shop-des {
    width: 100%;
  }
  .shop-des h2 {
    padding: 15px 0 0 30px;
    font-size: 25px;
  }
  .shop-des p {
    padding: 5px 30px;
    font-size: 17px;
  }
  .shop-des button {
    border-radius: 5px;
    border: none;
    background-color: rgb(48, 93, 255);
    color: white;
    padding: 10px 30px;
    cursor: pointer;
    font-size: 15px;
  }
  .flex1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
  }
  .tag {
    padding: 2px 0;
  }
  .stars {
    padding-right: 15px;
  }
  .stars img {
    height: 28px;
    width: 28px;
  }
  .stars span{
    font-size: 17px;
  }
  .comment {
    font-size: 17px;
    text-align: right;
    margin-right: 12px;
    margin-top: 8px;
  }
  .flex2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
  }
  .flex2 img{
    height: 35px;
    width: 35px;
    cursor: pointer;
  }
}
</style>