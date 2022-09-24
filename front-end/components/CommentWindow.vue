<template>
  <div v-show="display === true" class="comment-window">
    <div class="comment-ttl">
      <p>コメント一覧</p>
    </div>
    <div class="page">
      <div class="no_comment" v-if="filteredComments && filteredComments[0] === undefined ">まだコメントはありません</div>
      <div class="page-detail" v-if="filteredComments && filteredComments[0] !== undefined ">
        <div>
        <span>全{{filteredComments.flat().length}}件　</span>
        並び替え：
          <select v-model="filter">
            <option value="0">新しい順</option>
            <option value="1">古い順</option>
            <option value="2">評価が高い順</option>
            <option value="3">評価が低い順</option>
          </select>
        </div>
        <div>
          <button @click="previousPage" :disabled="currentPage === 0 || pages === 0">&lt;</button>
          <button  @click="previousPage" data-test="previousPage" hidden></button>
          <button class="cPage" v-for="index in pages" :key="index.id" @click="ind(index-1)" :disabled="currentPage === index-1 || pages === 0">{{index}}</button>
          <button @click="ind(index-1)" data-test="ind(index-1)" hidden></button>
          <button @click="nextPage" :disabled="currentPage === pages-1 || pages === 0">&gt;</button>
          <button @click="nextPage" data-test="nextPage" hidden></button>
        </div>
      </div>
    </div>

    <div v-if="filteredComments">
      <div class="evaluation" v-for="item,index in filteredComments[currentPage]" :key="index.id">
        <div>{{item.updated_at | Time}}</div>
        <div>
          評価：
          <img v-if="item.evaluation === 0" src="/empty_star.png" alt="画像">
          <img v-if="item.evaluation >= 1" src="/star.png" alt="画像">
          <img v-if="item.evaluation <= 1" src="/empty_star.png" alt="画像">
          <img v-if="item.evaluation >= 2" src="/star.png" alt="画像">
          <img v-if="item.evaluation <= 2" src="/empty_star.png" alt="画像">
          <img v-if="item.evaluation >= 3" src="/star.png" alt="画像">
          <img v-if="item.evaluation <= 3" src="/empty_star.png" alt="画像">
          <img v-if="item.evaluation >= 4" src="/star.png" alt="画像">
          <img v-if="item.evaluation <= 4" src="/empty_star.png" alt="画像">
          <img v-if="item.evaluation >= 5" src="/star.png" alt="画像">
          {{item.evaluation}}
        </div>
        <div class="comment">
          {{item.comment}}
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
    shopCurrent: Array<string|number>,

    comments: Array<string>,
    pages: number,
    currentPage:number,
    filter: string,

    display: boolean,
}
export default Vue.extend({
  data(): Data {
    return {
      shopCurrent: [],

      comments: [],
      pages: 1,
      currentPage: 0,
      filter: "2",

      display: false,
    }

  },
  async fetch() {
    await this.$axios
      .get(this.$config.baseURL+"/api/shop/"+this.$route.params.id)
      .then((response) => (this.shopCurrent = response.data.data));
    this.display = true;
  },

  filters: {
    Time: function(value:string){
      if(value){
      const theDay = new Date(value.replace("T", " ").slice(0, 19).replace("-", "/").replace("-", "/"));
      theDay.setHours(theDay.getHours() + 9);
      theDay.toLocaleString();
      let yyyy = theDay.getFullYear();
      let mm = ("0"+(theDay.getMonth()+1)).slice(-2);
      let dd = ("0"+theDay.getDate()).slice(-2);
      let hh = ("0"+theDay.getHours()).slice(-2);
      let mi = ("0"+theDay.getMinutes()).slice(-2);
      return yyyy+'-'+mm+'-'+dd+' '+hh+':'+mi;
      }
    }
  },

  computed: {
    filteredComments() {
      return (this as any).filterComments();
    },
  },

  methods: {

    filterComments() {
      if((this as any).shopCurrent.comments) {
        // コメント日付を取得
        let ordered = [];
        for (let i=0; i < (this as any).shopCurrent.comments.length; i++) {
          if ((this as any).shopCurrent.comments[i].comment !== null) {
            ordered.push(new Date((this as any).shopCurrent.comments[i].updated_at))
          }
        }
        if(this.filter === "0") {
            // コメント日付を新しい順に
            function compareFunc(a:any, b:any) {
              return b - a;
            }
            ordered.sort(compareFunc);

            // コメントを新しい順に
            let ordered_comment = [];
            let count = 0;
            for (let i=0; i < ordered.length; i++) {
              for (let j=0; j < (this as any).shopCurrent.comments.length; j++) {
                count++;
                if(String(ordered[i]) === String(new Date((this as any).shopCurrent.comments[j].updated_at))){
                  ordered_comment.push((this as any).shopCurrent.comments[j]);
                  break
                }
              }
            }
            // ページネーション
            let filtered = [];
            for (let i=0; i < ordered_comment.length; i++) {
              const last = filtered[filtered.length - 1];
              let comment:any = ordered_comment[i];
              if (!last || last.length === 5) {
                filtered.push([comment]);
              } else {
                last.push(comment);
              }
            }
            if (filtered.length !== 0) {
              this.pages = filtered.length;
            } else {
              this.pages = 1;
            }
            this.currentPage = 0;
            return filtered;
        } else if(this.filter === "1") {
          // コメント日付を古い順に
          function compareFunc(a:any, b:any) {
            return a - b;
          }
          ordered.sort(compareFunc);

          // コメントを古い順に
          let ordered_comment = [];
          for (let i=0; i < ordered.length; i++) {
            for (let j=0; j < (this as any).shopCurrent.comments.length; j++) {
              if(String(ordered[i]) === String(new Date((this as any).shopCurrent.comments[j].updated_at))){
                ordered_comment.push((this as any).shopCurrent.comments[j]);
                break
              }
            }
          }
          // ページネーション
          let filtered = [];
          for (let i=0; i < ordered_comment.length; i++) {
            const last = filtered[filtered.length - 1];
            let comment:any = ordered_comment[i];
            if (!last || last.length === 5) {
              filtered.push([comment]);
            } else {
              last.push(comment);
            }
          }
          if (filtered.length !== 0) {
            this.pages = filtered.length;
          } else {
            this.pages = 1;
          }
          this.currentPage = 0;
          return filtered;
        } else if(this.filter === "2") {
          // コメント日付を新しい順に
            function compareFunc(a:any, b:any) {
              return b - a;
            }
            ordered.sort(compareFunc);

            // コメントを新しい順に
            let ordered_comment = [];
            for (let i=0; i < ordered.length; i++) {
              for (let j=0; j < (this as any).shopCurrent.comments.length; j++) {
                if(String(ordered[i]) === String(new Date((this as any).shopCurrent.comments[j].updated_at))){
                  ordered_comment.push((this as any).shopCurrent.comments[j]);
                  break
                }
              }
            }
            let good_ordered = [];
            for (let i=0; i < ordered_comment.length; i++) {
              if ((ordered_comment as any)[i].evaluation === 5) {
                good_ordered.push(ordered_comment[i]);
              }
            }
            for (let i=0; i < ordered_comment.length; i++) {
              if ((ordered_comment as any)[i].evaluation === 4) {
                good_ordered.push(ordered_comment[i]);
              }
            }
            for (let i=0; i < ordered_comment.length; i++) {
              if ((ordered_comment as any)[i].evaluation === 3) {
                good_ordered.push(ordered_comment[i]);
              }
            }
            for (let i=0; i < ordered_comment.length; i++) {
              if ((ordered_comment as any)[i].evaluation === 2) {
                good_ordered.push(ordered_comment[i]);
              }
            }
            for (let i=0; i < ordered_comment.length; i++) {
              if ((ordered_comment as any)[i].evaluation === 1) {
                good_ordered.push(ordered_comment[i]);
              }
            }

            // ページネーション
            let filtered = [];
            for (let i=0; i < good_ordered.length; i++) {
              const last = filtered[filtered.length - 1];
              let comment:any = good_ordered[i];
              if (!last || last.length === 5) {
                filtered.push([comment]);
              } else {
                last.push(comment);
              }
            }
            if (filtered.length !== 0) {
              this.pages = filtered.length;
            } else {
              this.pages = 1;
            }
            this.currentPage = 0;
            return filtered;
        } else if(this.filter === "3") {
          // コメント日付を新しい順に
            function compareFunc(a:any, b:any) {
              return b - a;
            }
            ordered.sort(compareFunc);

            // コメントを新しい順に
            let ordered_comment = [];
            for (let i=0; i < ordered.length; i++) {
              for (let j=0; j < (this as any).shopCurrent.comments.length; j++) {
                if(String(ordered[i]) === String(new Date((this as any).shopCurrent.comments[j].updated_at))){
                  ordered_comment.push((this as any).shopCurrent.comments[j]);
                  break
                }
              }
            }
            let bad_ordered = [];
            for (let i=0; i < ordered_comment.length; i++) {
              if ((ordered_comment as any)[i].evaluation === 1) {
                bad_ordered.push(ordered_comment[i]);
              }
            }
            for (let i=0; i < ordered_comment.length; i++) {
              if ((ordered_comment as any)[i].evaluation === 2) {
                bad_ordered.push(ordered_comment[i]);
              }
            }
            for (let i=0; i < ordered_comment.length; i++) {
              if ((ordered_comment as any)[i].evaluation === 3) {
                bad_ordered.push(ordered_comment[i]);
              }
            }
            for (let i=0; i < ordered_comment.length; i++) {
              if ((ordered_comment as any)[i].evaluation === 4) {
                bad_ordered.push(ordered_comment[i]);
              }
            }
            for (let i=0; i < ordered_comment.length; i++) {
              if ((ordered_comment as any)[i].evaluation === 5) {
                bad_ordered.push(ordered_comment[i]);
              }
            }

            // ページネーション
            let filtered = [];
            for (let i=0; i < bad_ordered.length; i++) {
              const last = filtered[filtered.length - 1];
              let comment:any = bad_ordered[i];
              if (!last || last.length === 5) {
                filtered.push([comment]);
              } else {
                last.push(comment);
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
      }
    },

    previousPage() {
      this.currentPage = this.currentPage - 1;
    },
    nextPage() {
      this.currentPage = this.currentPage + 1;
    },
    ind: function(index_page:number) {
      this.currentPage = index_page;
    },
  }
})
</script>

<style scoped>
.comment-window {
  background: white;
  width: 100%;
  margin: 20px auto 0 auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  position: relative;
}
.comment-ttl {
  height: 50px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px 5px 0 0;
}
.comment-ttl p {
  color: white;
  padding: 17px;
  font-size: 14px;
}

.page {
  margin: 10px;
  text-align: right;
}
.page button{
  padding: 5px 10px;
}
.no_comment {
  margin-top: 40px;
  text-align: center;
  height: 50px;
  font-size: 20px;
}

.page-detail div{
  margin: 10px 0;
}
.cPage:disabled {
  color: white;
  background-color: black;
}
.evaluation {
  margin: 10px;
}
.evaluation img{
  height: 20px;
  width: 20px;
}
.comment {
  margin-top: 10px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
}
.evaluation:last-child .comment {
  border-bottom: none;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .comment-window {
    width: 80%;
    margin-top: 30px;
  }
}
</style>