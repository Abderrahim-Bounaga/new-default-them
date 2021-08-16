<template>
<div class="w-f p-r o-h">
<div class="container m_mobile" v-if="wishlistProduct && wishlistProduct.products && wishlistProduct.products.length>0">
  <div class="befor pt-4 d-f ai-c jc-c p-r mx-7" >
    <h1 class="b-w  px-2 sm-fs-5">WishList</h1>
  </div>
  <div class="d-f ai-c  fw-w">
    <si-product class="lg-col-3 md-col4 sm-col-6" @romve_wishlist="romve_wishlist"  v-for="(product,index) in wishlistProduct.products" :item="product" :activeWishlist="true" :key="index" />
    <si-popupConfirm :confirm="confirmWishlist" :settings="configDailogPop" @closePp="closePp"  />
  </div>
</div>
<div class="h-s-2/3 p-r d-f ai-c m_mobile" v-else-if="settings">
  <si-wishlistEmpty class="my-10 container" :settings="settings.wishlist_sections.empty_wishlist" />
</div>
   <si-loader class=" h-s container t-0 r-0 b-0 l-0  p-a sx-pt-12  " :showLoader="showLoader" />
</div>
</template>

<script>
export default {
  data(){
    return{
      wishlistProduct:null,
      showLoader:true,
      settings:null,
      confirmWishlist:false,
      product:null,
      configDailogPop:{}
    }
  },
  mounted(){
    if(this.wishlistProduct){
         setTimeout(()=>{
             this.showLoader=false
      },1500)
    }
    fbPageView();
    snapPageView();
  },
  async fetch(){
    this.settings=await this.$settings()
    this.configDailogPop.text=this.settings.dailog_sections.dailog_wishlist
    this.configDailogPop.buttons=this.settings.dailog_sections.buttons
      this.wishlistProduct=await this.$storeWishlist()
       setTimeout(()=>{
             this.showLoader=false
      },1500)
  },
  methods:{
    romve_wishlist(val){
      this.confirmWishlist=true
      this.product=val
    },
    closePp(val){
      this.confirmWishlist=false
      if(val=='confirm'){
      this.$utils.call('REMOVE_CART',{product:this.product,target:'wishlist'})
      }
    }

  }


}
</script>

<style scoped>

.befor::before{
  content: '';
  width: 100%;
  height: 1px;
  background: #ccc;
  position: absolute;
  left: 0;
  top: 48px;
  z-index: -1;
}
</style>
