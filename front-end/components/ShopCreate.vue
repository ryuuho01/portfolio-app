<template>
    <validation-observer ref="obs" v-slot="ObserverProps">
        <div class="create-window">
          <div class="create-ttl">
            <p>　　 店舗新規作成</p>
          </div>

          <div class="create">
            <div class="upload_label">
              <label for="pic_path">
                店舗画像を選択
              </label>
            </div>

            <!-- input -->
            <input type="file" id="pic_path" name="pic_path" accept="image/*" @change="onFileChange($event)" data-test="onFileChange($event)">
            <div v-if="imageData" class="preview">
              <h2>【画像プレビュー】</h2>
              <img :src="imageData">
            </div>
          </div>

          <validation-provider v-slot="ProviderProps" rules="required">
            <div class="create">
              <label for="shop_name">店舗名：</label>
              <!-- input -->
              <input v-model="shop_name" type="text" id="shop_name" placeholder="お店の名前" name="shop_name" required>
            </div>
            <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>

          <div class="create">
            <validation-provider v-slot="ProviderProps" rules="custom_rule:地域を選択">
                地域：
                <!-- input -->
                <select v-model="vModelarea" class="select" name="area_name" id="area_option">
                  <option hidden>地域を選択</option>
                  <option v-for="item in areaCurrent" :key="item.id">{{item.area_name}}</option>
                </select>
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </validation-provider>
            <p @click="areaTrue" data-test="areaTrue">新規作成</p>
            <div class="add" v-if="areaInput">
              <input v-model="area" type="text" id="area" placeholder="地域名">
              <p @click="insertArea" data-test="insertArea">追加</p>
            </div>
          </div>

          <div class="create">
            <validation-provider v-slot="ProviderProps" rules="custom_rule:ジャンルを選択">
                ジャンル：
                <!-- input -->
                <select v-model="vModelgenre" class="select" name="genre_name" id="genre_option">
                  <option hidden>ジャンルを選択</option>
                  <option v-for="item in genreCurrent" :key="item.id">{{item.genre_name}}</option>
                </select>
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </validation-provider>
            <p @click="genreTrue" data-test="genreTrue">新規作成</p>
            <div class="add" v-if="genreInput">
              <input v-model="genre" type="text" id="genre" placeholder="ジャンル名">
              <p @click="insertGenre" data-test="insertGenre">追加</p>
            </div>
          </div>

          <validation-provider v-slot="ProviderProps" rules="required|max:120">
            <div>
              <p class="create">店舗詳細：</p>
              <div class="create">
                <!-- input -->
                <textarea v-model="description" name="description" cols="44" rows="10" required></textarea>
              </div>
            </div>
            <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>

          <div class="button">
            <input type="submit" class="create-button" :disabled="ObserverProps.invalid || !ObserverProps.validated" value="店舗を作成する" @click="submit">
            <button @click="submit" data-test="submit" hidden></button>
          </div>
        </div>
    </validation-observer>

</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
  sendURL: string,
  pic_path: string,
  imageData: string|null,
  uploadFile: string,
  shop_name: string,

  areaInput: boolean,
  area: string,
  areaCurrent: Array<string>,
  vModelarea: string,

  genreInput: boolean,
  genre: string,
  genreCurrent: Array<string>,
  vModelgenre: string,
  description: string,
}
export default Vue.extend({
  data(): Data {
    return {
      sendURL: this.$config.baseURL+"/api/shop",
      pic_path: "",
      imageData: "",
      uploadFile: "",
      shop_name: "",

      areaInput: false,
      area: "",
      areaCurrent: [],
      vModelarea: "地域を選択",

      genreInput: false,
      genre: "",
      genreCurrent: [],
      vModelgenre: "ジャンルを選択",

      description: "",
    }
  },
  async fetch() {
    await this.$axios
      .get(this.$config.baseURL+"/api/area")
      .then((response) => (this.areaCurrent = response.data.data));
    await this.$axios
      .get(this.$config.baseURL+"/api/genre")
      .then((response) => (this.genreCurrent = response.data.data));
  },
  methods: {
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

    async getArea() {
      const arearesData = await this.$axios.get(this.$config.baseURL+"/api/area");
      this.areaCurrent = arearesData.data.data;
    },
    areaTrue() {
      this.areaInput = true;
    },
    async insertArea() {
      if (this.area == null) {
        alert("地域名を入力して下さい");
        return
      } else {
      const sendareaData = {
        area_name: this.area,
      };
      await this.$axios.post(this.$config.baseURL+"/api/area", sendareaData);
      (document.getElementById("area") as any).value = null;
      this.areaInput = false;
      }
      this.getArea();
    },

    async getGenre() {
      const genreresData = await this.$axios.get(this.$config.baseURL+"/api/genre");
      this.genreCurrent = genreresData.data.data;
    },
    genreTrue() {
      this.genreInput = true;
    },
    async insertGenre() {
      if (this.genre == null) {
        alert("ジャンル名を入力して下さい");
        return
      } else {
      const sendgenreData = {
        genre_name: this.genre,
      };
      await this.$axios.post(this.$config.baseURL+"/api/genre", sendgenreData);
      (document.getElementById("genre") as any).value = null;
      this.genreInput = false;
      }
      this.getGenre();
    },
    async submit() {
      const formData = new FormData();
      formData.set('pic_path', this.uploadFile);
      formData.set('shop_name', this.shop_name);
      formData.set('area_name', this.vModelarea);
      formData.set('genre_name', this.vModelgenre);
      formData.set('description', this.description);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      try {
      await this.$axios.post(this.$config.baseURL+"/api/auth/add_shop", formData, config);
      const add_shop_info = {
        user_id: (this as any).$auth.user.id,
      }
      await this.$axios.post(this.$config.baseURL+"/api/auth/add_shop_data", add_shop_info);
      await this.$axios.get(this.$config.baseURL+"/api/auth/user");
      location.href='/manage';
      alert("店舗情報を登録しました");
      } catch(e:any) {
        if (e.response.data.errors.pic_path !== undefined){
          alert(e.response.data.errors.pic_path)
        } else if (e.response.data.errors.shop_name !== undefined){
          alert(e.response.data.errors.shop_name)
        } else if (e.response.data.errors.area_name !== undefined){
          alert(e.response.data.errors.area_name)
        } else if (e.response.data.errors.genre_name !== undefined){
          alert(e.response.data.errors.genre_name)
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

.create-window {
  background: white;
  width: 400px;
  margin: 60px 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  position: relative;
}
.create-ttl {
  height: 50px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px 5px 0 0;
}
.create-ttl::before {
  content: "";
  background: url("~static/home.png") no-repeat;
  background-size: cover;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 12px;
  left: 20px;
}
.create-ttl p {
  color: white;
  padding: 17px;
  font-size: 14px;
}

#shop_name {
  margin: 10px 0;
}
.create {
  margin: 18px 30px 0 50px;
  position: relative;
}
.create h2 {
  font-weight: normal;
  padding: 10px 0 3px 0;
}
.create p {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  width: 100px;
  height: 30px;
  background-color: #384878;
  color: white;
  margin: 20px 0;
  cursor: pointer;
  position: absolute;
  right: -10px;
  top: -25px;
}


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
  margin: 10px auto 35px auto;
  width: 308px;
  height: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.preview p {
  margin-bottom: 10px;
}
.preview img {
  width: 308px;
  height: 210px;
  object-fit: cover;
}

.select {
  height: 25px;
}
.add p {
  width: 60px;
  background-color: rgb(76, 76, 76);
  margin: 150px 0 5px auto;
}
.add input {
  margin: 40px 0;
}

.create textarea{
  resize: none;
}

.button {
  text-align: right;
}
.create-button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.create-button {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  margin: 15px 25px 15px 0;
}
.create-button:disabled {
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
</style>

<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  .create-window {
    margin: auto;
    margin-top: 60px;
  }
}
</style>
