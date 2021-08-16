<template>
<div v-if="config">
  <app-loader placement="BEFORE_TOP_HEADER"/>
  <si-headerTop v-if="!config.header_top.show"  class="sx-d-n" :settings="config" />
  <div v-if="!config.header.show" class=" fixd_menu" :style="style" :class="{'py-2':show_search_mobile}">
  <div class="container d-f ai-c jc-sb py-1 " v-if="config.header">
    <div class="px-2 ssx-px-0 log w-f sm-col-4"  :class="{'d-n':show_search_mobile}" >
      <si-logo :src="config.header.logo?config.header.logo.src:$defaultLogo" :ratio="config.header.size" v-if="config.header.show_logo"  />
    </div>
      <div class="tr-1/2 zi-9" :class="{ 'modal-close':showMenu}" @click="showHideMenu()"></div>
    <div class="lg-col-6 sm-col-0 tr-1/2  mobile" :class="{'active':showMenu}" >
      <div class="p-r h-12 d-n sm-d-b">
        <div class="d-n sm-d-b p-a r-0 t-0 w-8 h-8 c-grey fs-5 d-f ai-c jc-c" @click="showHideMenu()">✖</div>
      </div>
      <si-menu v-if="config.header.show_menu" :color="config.header.color" :headerMenu="config.header.menu" />
    </div>
     <transition name="fade">
        <div class="d-f jc-c sm-col-4 sx-d-n modal-container " v-if="config.header.show_search" :style="show_search_mobile?'display:flex !important; width:100% !important;':''">
          <div class="p-r search ">
            <form @submit.prevent="search">
              <input id="search_bar" type="search" :style="{'background':config.header.search_background}" :placeholder="config.header.search_placeholder" @blur="blured()" v-model="searchText"  class="br-20 w-f b-t p-2  br-white"  :class="{'p-2':show_search_mobile}"   />
              <si-button aria-label="Search Button" class="p-a t-0 r-0" color="#0000FF" type="search"  iconColor="#111111" icon="search" :background="background"/>
            </form>
          </div>
        </div>
     </transition>
    <div class="px-5  d-f ai-c jc-sa  sm-col-4 cart_mobile b-t  " :style="bgBottomMobile?style:''">
      <p class="c-w ws-nw sx-d-n" :style="{'color':config.header.color}" v-if="config.header.show_price"> {{$storeCart().total  | formatPrice}} {{$currency()}}</p>
      <nuxt-link aria-label="Home" class="p-r d-n sx-d-f link " :class="{'active-page':path_name=='index'}" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"  viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :stroke="config.header.color+'a8'" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
      </nuxt-link>
      <nuxt-link aria-label="Shop" class="p-r d-n sx-d-f link" to="/shop" :class="{'active-page':path_name=='shop-slug'}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"  stroke="currentColor">
            <path stroke-linecap="round"  stroke-linejoin="round" stroke-width="2" :stroke="config.header.color+'a8'" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
      </nuxt-link>
      <nuxt-link aria-label="Cart" class="p-r d-f link" to="/cart"  v-if="config.header.show_cart_icon" :class="{'active-page':path_name=='cart'}">
          <si-button aria-label="Cart" color="#0000FF" class="sx-d-n" :class="{'fs-4':path_name=='cart'}"  :iconColor="config.header.color" icon="cart" :background="background"/>
          <svg xmlns="http://www.w3.org/2000/svg" class="d-n sx-d-f" fill="none" viewBox="0 0 24 24"   stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :stroke="config.header.color+'a8'" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="p-a t-0  c-w d-f ai-c jc-c br-f qty ">{{$store.$storeCart().products.length}}</span>
      </nuxt-link>
      <nuxt-link aria-label="Wishlist" class="p-r d-f link" to="/wishlist" v-if="config.header.show_wishlist_icon" :class="{'active-page':path_name=='wishlist'}">
        <si-button aria-label="Wishlist" color="#0000FF" class="sx-d-n"   :iconColor="config.header.color" icon="wishlist_vide" :background="background"/>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 d-n sx-d-f" fill="none"  viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :stroke="config.header.color+'a8'" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span class="p-a t-0  c-w d-f ai-c jc-c br-f qty ">{{$store.$storeWishlist().products.length}}</span>
      </nuxt-link>
    </div>
  <div class="d-f  sx-col-8 ai-c jc-fe" :class="{'d-n':show_search_mobile}">
    <si-button aria-label="Search Button" v-if="config.header.show_search" color="#0000FF" class="d-n sx-d-b  xs-col-1 " @click="showSeachMenu()"  :iconColor="config.header.color" icon="search" :background="background"/>
    <si-button aria-label="Search Button" color="#0000FF" class="d-n sm-d-b mx-2 xs-col-1  " @click="showHideMenu()"  :iconColor="config.header.color" icon="menu" :background="background"/>
  </div>
  </div>
  </div>
  <app-loader placement="AFTER_HEADER"/>
</div>
</template>

<script>
export default {
  props:{
    config:{type:Object} // this.settings.globale_sections.header
  },
  data() {
    return {
      background:['transparent'],
      settings:null,
      color:"#fff",
      showMenu:false,
      path_name:null,
      show_search_mobile:false,
      searchText:null,
      bgBottomMobile:false
    }
  },
mounted() {
        this.path_name=this.$route.name
        if (window.innerWidth > 750) {
        this.color ="#fff";
      } else {
        this.color ="#111";
      }
      window.addEventListener('PAGE_VIEW',(e)=>{ if(e.data && e.data.detail && e.data.detail.path_name) this.path_name=e.data.detail.path_name });
      this.onResize()
      window.addEventListener('resize',this.onResize)
},
computed:{
      style:function(){
      if(this.config.header.background && this.config.header.background.length>0){
        if(this.config.header.background.length==1){
             return {'background':`${this.config.header.background[0]}`}
        }
        else{
            return {'background':`linear-gradient(45deg, ${this.config.header.background.join(',')})`}
        }
      }
    }
},
methods:{
  onResize(){
      if(window.innerWidth < 450)   this.bgBottomMobile=true
      else this.bgBottomMobile=false
  },
  blured(){
    if (window.innerWidth < 450) {
      this.show_search_mobile=!this.show_search_mobile
    }
  },
  showHideMenu(){
    this.showMenu=!this.showMenu
  },
  showSeachMenu(){
    if (window.innerWidth < 450) {
      this.show_search_mobile=!this.show_search_mobile
      this.$nextTick(()=>{
        document.getElementById('search_bar').focus()
      })
     }
  },
  search(){
         this.$router.push({
        path: "/shop/",
        query: { search: this.searchText },
      });
  }
},
  watch: {
    $route(to, from) {
      if (to.path != from.path && to.path != "/shop/") {
        this.searchText = "";
      }
    }
  },
}
</script>

<style lang="scss" scoped>
input{
   border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 0 0 0 0 rgb(0 0 0 / 15%);
  box-shadow: 0 0 0 0 rgb(0 0 0 / 15%);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  outline: none;
}
input:focus{
    border: 1px solid #bfbdbd;
  box-shadow: 3px 2px 7px -2px #ccc;
}
.p-2{
  padding: 0.5em;
}
#search_bar{
  padding-right: 35px;
}
.modal-container{
   &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }
  &.fade-enter-active, &.fade-leave-active {
    transition: opacity .3s;
  }
}
  svg{
    width: 27px;
    height: 27px;
  }
.active-page{
  svg{
    width: 35px;
    height: 35px;
    path{
      stroke: #ffffff;
    }
  }
}
@media (max-width:450px){
  .fixd_menu{
    position: fixed;
    top: 0;
    z-index: 9;
    left: 0;
    right: 0;
  }
  .cart_mobile{
   position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100% !important;
    z-index: 8;
    padding-top: 9px;
    padding-bottom: 9px;
    border-radius: 8px 8px 0 0;
    .qty{
       right: -8px !important;
       top: -9px !important;
    }
  }
}
.active{
  left: 0 !important;
}
.qty{
    background: #EA4C46;
    right: 2px;
    width: 20px;
    height: 20px;
    font-size: 13px;
}
.br-white{
  background: #ffff;
  border: 1px solid #ffffff !important;
}
.log{
  max-width: 150px;
}
.br-20{
  border-radius: 20px  !important;
}
.bg-darck{
  background: #323232;
}
.bg-color{
  background: #666666;
  color:#ffffff;
}
::placeholder {
  color: #000000;
  opacity: 1; /* Firefox */
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
 color: #fff;
}
::-ms-input-placeholder { /* Microsoft Edge */
 color: #fff;
}
@media (max-width:750px){
  .mobile{
    position: fixed !important;
    left: -100% ;
    width: 80% !important;
    bottom: 0 !important;
    top: 0 !important;
    z-index: 99999 !important;
    background: #ffffff !important;
  }
}
@media (max-width:550px){
.search{
  width: 80%;
}
}
</style>
