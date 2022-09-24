<template>
    <div class="entire-css">
        <div id="loader" v-show="loading">
            <div class="spinner">
                <div class="cube1"></div>
                <div class="cube2"></div>
            </div>
        </div>
        <CommonHeader v-show="!loading" />
        <Nuxt v-show="!loading" />
        <CommonFooter v-show="!loading" class="footer" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
    loading: boolean,
}
export default Vue.extend({
  data(): Data {
    return {
        loading: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
})
</script>

/* ----------------------リセット---------------------------- */
<style>
html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
}

body {
    line-height:1;
}

article,aside,details,figcaption,figure,
footer,header,hgroup,menu,nav,section {
    display:block;
}

nav ul {
    list-style:none;
}

blockquote, q {
    quotes:none;
}

blockquote:before, blockquote:after,
q:before, q:after {
    content:'';
    content:none;
}

a {
    margin:0;
    padding:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
}

/* change colours to suit your needs */
ins {
    background-color:#ff9;
    color:#000;
    text-decoration:none;
}

/* change colours to suit your needs */
mark {
    background-color:#ff9;
    color:#000;
    font-style:italic;
    font-weight:bold;
}

del {
    text-decoration: line-through;
}

abbr[title], dfn[title] {
    border-bottom:1px dotted;
    cursor:help;
}

table {
    border-collapse:collapse;
    border-spacing:0;
}

/* change border colour to suit your needs */
hr {
    display:block;
    height:1px;
    border:0;
    border-top:1px solid #cccccc;
    margin:1em 0;
    padding:0;
}

input, select {
    vertical-align:middle;
}
</style>
/* --------------------------------------------------------- */
<style>
body {
    background-color: rgb(238, 238, 238);
    max-width: 1240px;
    margin: auto;
}
</style>

<style scoped>
/* フッター用装飾 */
.entire-css {
    min-height: 100vh;
    position: relative;/*←相対位置*/
    padding-bottom: 80px;/*←footerの高さ*/
    box-sizing: border-box;/*←全て含めてmin-height:100vhに*/
}
.footer {
    position: absolute;
    bottom: 0;
}
@keyframes fadeOut {
    from {
        opacity: 1;
    }
    
    to {
        display: none;
        opacity: 0;
        z-index: -1;
    }
}
#loader {
    width: 100%;
    height: 100vh;
    background-color: #9b9b9b;
}
.spinner {
  margin: 0 auto;
  width: 40px;
  height: 40px;
  position: relative;
  top: 50%;
}
.cube1, .cube2 {
  background-color: #ffffff;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;
  
  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}
.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
@-webkit-keyframes sk-cubemove {
  25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }
  50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }
  75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
  100% { -webkit-transform: rotate(-360deg) }
}
@keyframes sk-cubemove {
  25% { 
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  } 50% { 
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  } 50.1% { 
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  } 75% { 
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  } 100% { 
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}


</style>