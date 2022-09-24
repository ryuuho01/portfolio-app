<template>
  <header>
    <nav class="nav" id="nav">
      <ul>
        <li @click="menuOpen" class="menu-item">
          <NuxtLink to="/">ホーム</NuxtLink>
        </li>
        <li @click="menuOpen" class="menu-item" v-if="!$auth.loggedIn">
          <NuxtLink to="/register">会員登録</NuxtLink>
        </li>
        <li @click="menuOpen" class="menu-item" v-if="!$auth.loggedIn">
          <NuxtLink to="/login">ログイン</NuxtLink>
        </li>
        <li @click="menuOpen" class="menu-item" v-if="$auth.user !== null && $auth.user.authority === 2">
          <NuxtLink to="/mypage">マイページ</NuxtLink>
        </li>
        <li @click="menuOpen" class="menu-item" v-if="$auth.user !== null && ($auth.user.authority === 0 || $auth.user.authority === 1)">
          <NuxtLink to="/manage">管理画面</NuxtLink>
        </li>
        <li @click="menuOpen(); logout()" class="menu-item" v-if="$auth.loggedIn">
          <NuxtLink to="">ログアウト</NuxtLink>
        </li>
      </ul>
    </nav>
    <div @click="menuOpen" class="menu-button" id="menu" data-test="open">
      <span class="menu_line-top"></span>
      <span class="menu_line-middle"></span>
      <span class="menu_line-bottom"></span>
    </div>
    <div>
      <h1>
        <NuxtLink to="/" class="header-ttl">Rese</NuxtLink>
      </h1>
    </div>

    <div class="menu-flex" v-if="$auth.user !== null && $auth.user.authority === 2">
      <div>
        　ようこそ！{{$auth.user.name}}さん
      </div>
      <div class="menu-disappear">
        |
        <NuxtLink to="/mypage" class="header-link">マイページ</NuxtLink>
        |
        <a href="#" @click="logout()" class="header-link" data-test="logout">ログアウト</a>
      </div>
    </div>

    <div class="menu-flex" v-if="$auth.user !== null && $auth.user.authority === 1">
      <div>
        　店舗代表者 {{$auth.user.name}}さん
      </div>
      <div class="menu-disappear">
        |
        <NuxtLink to="/manage" class="header-link">管理画面</NuxtLink>
        |
        <a href="#" @click="logout()" class="header-link" data-test="logout">ログアウト</a>
      </div>
    </div>

    <div class="menu-flex" v-if="$auth.user !== null && $auth.user.authority === 0">
      <div>
        　管理人 {{$auth.user.name}}さん
      </div>
      <div class="menu-disappear">
        |
        <NuxtLink to="/manage" class="header-link">管理画面</NuxtLink>
        |
        <a href="#" @click="logout()" class="header-link" data-test="logout">ログアウト</a>
      </div>
    </div>

    <div class="menu-flex" v-if="!$auth.loggedIn">
      <div>
        <span>　ゲストさん</span>
      </div>
      <div class="menu-disappear">
        |
        <NuxtLink v-if="!$auth.loggedIn" to="/login" class="header-link">ログイン</NuxtLink>
        |
        <NuxtLink to="/register" class="header-link">会員登録</NuxtLink>
      </div>
    </div>

  </header>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend( {
  data() {
    return {
    }
  },
  methods: {

    async logout() {
      try {
        await (this as any).$auth.logout();
      } catch {
        alert("ログアウトに失敗しました");
      }
    },

    menuOpen() {
      const target: HTMLElement | null = document.getElementById("menu");
      const nav: HTMLElement | null = document.getElementById("nav");
      (target as any).classList.toggle('open');
      (nav as any).classList.toggle('in');
    },
  },
});
</script>



<style scoped>

header {
  margin: 30px 80px;
  display: flex;
  align-items: center;
}

.nav {
  display: none;
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
  left: -100%;
  margin-right: 80px;
  background-color: rgb(238, 238, 238);
  transition: 0s;
  text-align: center;
}

.nav.in{
  transform: translateX(100%);
  transition: 0.5s;
  z-index: 1000;
}

.nav ul{
  padding-top: 200px;
  
  font-size: 25px;
}
.nav ul li a{
  margin-top: 50px;
  color: blue;
  text-decoration: none;
}

/* ハンバーガーメニュー */
.menu-button {
  display: none;
  cursor: pointer;
  position: relative;
  height: 35px;
  width: 35px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px;
  margin-right: 20px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  z-index: 1001;
}
.menu_line-top,
.menu_line-middle,
.menu_line-bottom {
  display: inline-block;

  height: 1px;
  background-color: white;
  position: absolute;
  transition: 0s;
  left: 7px;
}
.menu_line-top {
  width: 12px;
  top: 10px;
}
.menu_line-middle {
  width: 19px;
  top: 17px;
}
.menu_line-bottom {
  width: 7px;
  top:24px;
}
.menu-button.open span:nth-of-type(1) {
  width: 20px;
  top: 16px;
  transform: rotate(45deg);
  transition: 0.3s;
}
.menu-button.open span:nth-of-type(2) {
  opacity: 0;
  transition: 0.3s;
}
.menu-button.open span:nth-of-type(3) {
  width: 20px;
  top: 16px;
  transform: rotate(-45deg);
  transition: 0.3s;
}

.menu-flex {
  display: flex;
}

/* メニュー */
.menu-item {
  padding: 10px 0;
}

/* サイトタイトル */
.header-ttl {
  text-decoration: none;
  font-size: 25px;
  color: rgb(48, 93, 255);
}

.header-link {
  text-decoration: none;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .nav {
    display: block;
  }
  .menu-button {
    display: inline-block;
  }
  .menu-disappear {
    display: none;
  }
}
</style>