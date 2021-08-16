<template>
<div class="container" v-if="config && products && !config.show && settings">
  <div><h1 class="my-4 ta-c sm-fs-6">{{config.title}}</h1></div>
  <div class="d-f fw-w" >
    <si-product
    @romve_wishlist="romve_wishlist"
     :showAddToCart="settings.buttons.add_to_cart.show_add_to_cart"
     :showAddToCartAnimations="settings.buttons.add_to_cart.show_animation_cart"
     :showQuantity="settings.buttons.quantity.show_quantity"
     :quantity_writable="settings.buttons.quantity.quantity_writable"
     :showAddToCartToCheckout="settings.buttons.add_to_cart.add_to_cart_to_checkout"
     :showBayNow="settings.buttons.buy_bow.show_buy_now"
     :inactiveWish="inactiveWish"
     :class="[config.desktop_size=='small'?'lg-col-3 md-col-4':config.desktop_size=='medium'? 'lg-col-4 md-col-4':'lg-col-6 md-col-6',config.mobile_size=='small'? 'sx-col-6 ssx-col-6':'sx-col-12 ssx-col-12']"  v-for="(product,index) in products" :item="product" :key="index" />
    <si-popupConfirm :confirm="confirmWishlist" :settings="configDailogPop" @closePp="closePp"  />
  </div>
  <div class="my-10 d-f ai-c jc-c">
    <nuxt-link to="/shop" >
       <si-button :text="config.buttons.text" class="px-4 py-3" :color="config.buttons.color" :type="config.buttons.type"  :background="config.buttons.background" />
    </nuxt-link>
  </div>
</div>
</template>

<script>
export default {
  props:{
    config:{type:Object} // this.settings.sections.featured_products
  },
data() {
  return {
    settings:null,
    upsell:null,
    whislistProduct:null,
    products:null,
    confirmWishlist:false,
    productRemovefromWishlist:null,
    inactiveWish:null,
    configDailogPop:{}
  }
},
async mounted(){
  if(this.config.type=="last"){
    this.products=(await this.$products({
      limit: this.config.max
    },true)).data
  }else{
    this.products=this.config.items
  }
},
  async fetch(){
    this.settings=await this.$settings()
    this.configDailogPop.text=this.settings.dailog_sections.dailog_wishlist
    this.configDailogPop.buttons=this.settings.dailog_sections.buttons
  },
  methods:{
    romve_wishlist(val){
      this.confirmWishlist=true
      this.productRemovefromWishlist=val
      this.inactiveWish=null
    },
     closePp(val){
      this.confirmWishlist=false
      if(val=='confirm'){
      this.$utils.call('REMOVE_CART',{product:this.productRemovefromWishlist,target:'wishlist'})
      this.inactiveWish=this.productRemovefromWishlist._id
      }
    }
  }
}
</script>

<style>

</style>
