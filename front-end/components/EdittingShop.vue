<template>
    <div v-show="display === true">
      <div class="send-window">
        <div class="send-ttl">
          <p>　　 店舗編集</p>
        </div>

        <div v-if="!imageData" class="shop-pic">
          <img :src="shopInfo.pic_path" alt="画像">
        </div>
        <!-- input -->
        <input type="file" id="pic_path" name="pic_path" accept="image/*" @change="onFileChange($event)" data-test="onFileChange($event)">
        <div v-if="imageData" class="preview">
          <img :src="imageData">
        </div>

        <div>
          <div class="upload_label">
            <label for="pic_path">
              店舗画像を選択
            </label>
          </div>
        </div>

        <validation-provider v-slot="ProviderProps" rules="required">
          <div class="edit-row">
            店名：　　<input type="text" v-model="shop_name" name="shop_name" id="shop_name" required>
          </div>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>

        <div class="edit-row">地域：　　#
          <select v-model="vModelarea" class="select" name="area_name" id="area_option">
            <option>{{area_name}}</option>
            <option v-for="item in areaCurrent" :key="item.id">{{item.area_name}}</option>
          </select>
        </div>

        <div class="edit-row">ジャンル：#
          <select v-model="vModelgenre" class="select" name="genre_name" id="genre_option">
            <option>{{genre_name}}</option>
            <option v-for="item in genreCurrent" :key="item.id">{{item.genre_name}}</option>
          </select>
        </div>

        <p class="edit-row">店舗詳細：</p>
        <validation-provider v-slot="ProviderProps" rules="required|max:120">
          <div class="edit-textarea">
            <textarea v-model="description" cols="50" rows="10" name="description"></textarea>
          </div>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>

        <div class="button">
          <span>※前回の状態に戻す</span>
          <input type="submit" class="send-button" value="元に戻す" @click="get_allInfo" data-test="get_allInfo">
        </div>

        <div class="button">
          <span>※変更クリックで変更されます</span>
          <input type="submit" class="send-button" value="変更" @click="submit" data-test="submit">
        </div>

      </div>

    </div>

</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
  shopInfo: Array<string>,

  imageData: string,
  uploadFile: string,

  shop_name: string,

  area_name: string,
  vModelarea: string,
  areaCurrent: Array<string>,

  genre_name: string,
  vModelgenre: string,
  genreCurrent: Array<string>,
  description: string,

  display: boolean,
}

export default Vue.extend({
  data(): Data {
    return {
      shopInfo: [],
      imageData: "",
      uploadFile: "",
      shop_name: "",
      area_name: "",
      vModelarea: "",
      areaCurrent: [],
      genre_name: "",
      vModelgenre: "",
      genreCurrent: [],
      description: "",
      display: false,
    }
  },
  async fetch() {
    await this.$axios
      .get(this.$config.baseURL+"/api/user/"+(this as any).$auth.user.id)
      .then((response) => (this.shopInfo = response.data.data.shop));
      this.shop_name = (this.shopInfo as any).shop_name;
      this.description = (this.shopInfo as any).description;
      this.get_vModelarea();
      this.get_vModelgenre();
    await this.$axios
      .get(this.$config.baseURL+"/api/area")
      .then((response) => (this.areaCurrent = response.data.data));
      this.areaCurrent.splice((this.shopInfo as any).area_id-1, 1);
    await this.$axios
      .get(this.$config.baseURL+"/api/genre")
      .then((response) => (this.genreCurrent = response.data.data));
      this.genreCurrent.splice((this.shopInfo as any).genre_id-1, 1);
  },
  mounted() {
    this.get_allInfo();
  },
  methods: {
    get_allInfo(){
      this.get_shopInfo();
      this.imageData = "";
      this.uploadFile = "";
      this.display = true;
    },
    async get_shopInfo() {
      await this.$axios
      .get(this.$config.baseURL+"/api/user/"+(this as any).$auth.user.id)
      .then((response) => (this.shopInfo = response.data.data.shop));
      this.shop_name = (this.shopInfo as any).shop_name;
      this.description = (this.shopInfo as any).description;
      this.get_vModelarea();
      this.get_vModelgenre();
    },
    async get_vModelarea() {
      await this.$axios
      .get(this.$config.baseURL+"/api/area/"+(this as any).shopInfo.area_id)
      .then((response) => (this.area_name = response.data.data.area_name));
      this.vModelarea = this.area_name;
    },
    async get_areaCurrent() {
      await this.$axios
      .get(this.$config.baseURL+"/api/area")
      .then((response) => (this.areaCurrent = response.data.data));
      this.areaCurrent.splice((this.shopInfo as any).area_id-1, 1);
    },
    async get_vModelgenre() {
      await this.$axios
      .get(this.$config.baseURL+"/api/genre/"+(this as any).shopInfo.genre_id)
      .then((response) => (this.genre_name = response.data.data.genre_name));
      this.vModelgenre = this.genre_name;
    },
    async get_genreCurrent() {
      await this.$axios
      .get(this.$config.baseURL+"/api/genre")
      .then((response) => (this.genreCurrent = response.data.data));
      this.genreCurrent.splice((this.shopInfo as any).genre_id-1, 1);
    },
    async onFileChange(e:any) {
      const files = e.target.files;
      if(files.length > 0) {
        const file = files[0];
        this.uploadFile = file;
        const reader = new FileReader();
        reader.onload = (e:any) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(file);
        const picresData = await this.$axios.get(this.$config.baseURL+"/api/shop");
        for(let i =0; i < picresData.data.data.length; i++) {
          if(picresData.data.data[i]["pic_path"] === "http://127.0.0.1:8000"+"/storage/"+file.name) {
            alert("同じファイル名の画像が存在します。上書きする場合はそのまま、上書きしない場合はファイル名を変更して下さい。");
            break
          };
        }
      }
    },
    async submit() {
      if (this.shop_name === "") {
        alert("店名を入力して下さい");
        return
      } else if (this.description === ""){
        alert("店舗詳細を入力して下さい");
        return
      } else if (this.description.length > 120){
        alert("文字数は120文字までです");
        return
      }
      const formData = new FormData();
      formData.set('_method', "PUT");
      formData.set('pic_path', this.uploadFile);
      formData.set('shop_name', this.shop_name);
      formData.set('area_name', this.vModelarea);
      formData.set('genre_name', this.vModelgenre);
      formData.set('description', this.description);
      let config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      try {
      await this.$axios.post(this.$config.baseURL+"/api/shop/"+(this.shopInfo as any).id, formData, config);
      this.get_allInfo();
      alert("店舗情報を変更しました");
      } catch(e:any) {
        if (e.response.data.errors.shop_name !== undefined){
          alert(e.response.data.errors.shop_name)
        } else if (e.response.data.errors.description !== undefined) {
          alert(e.response.data.errors.description)
        } else {
          alert("システムエラーが発生しました")
        }
      }
    },
  }
})
</script>

<style scoped>
.create input {
  width: 100%;
  height: 30px;
  font-size: 15px;
}

.upload_label {
  padding: 10px 0;
  color: #ffffff;
  background-color: #384878;
  cursor: pointer;
  width: 200px;
  margin: 0 auto;
  text-align: center;
}
.upload_label label {
  cursor: pointer;
  padding: 10px 44px;
}
#pic_path {
  display: none;
}
.preview {
  width: 100%;
  height: auto;
}
.preview img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>

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
.send-ttl::before {
  content: "";
  background: url("~static/home.png") no-repeat;
  background-size: cover;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 12px;
  left: 20px;
}

.shop-pic {
  height: auto;
  border-radius: 5px 5px 0 0;
}
.shop-pic img {
  width: 100%;
  height: auto;
  object-fit: cover;
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
}

.edit-row {
  margin-left: 20px;
  margin-top: 10px;
}
.edit-textarea {
  margin-left: 20px;
}

</style>

<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  .send-window {
    margin: auto;
    margin-top: 60px;
  }
}
</style>
