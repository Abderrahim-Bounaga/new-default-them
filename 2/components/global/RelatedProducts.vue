<template>
  <div class="w-f" v-if="products">
      <div class="befor pt-4 d-f ai-c jc-c p-r mx-7" >
         <h1 class="b-w  px-2 sm-fs-5">Related products</h1>
      </div>
        <div class="d-f fw-w"  v-if="settingsSections">
            <si-product
                 :showAddToCart="settingsSections.buttons.add_to_cart.show_add_to_cart"
                :showAddToCartAnimations="settingsSections.buttons.add_to_cart.show_animation_cart"
                :showQuantity="settingsSections.buttons.quantity.show_quantity"
                :quantity_writable="settingsSections.buttons.quantity.quantity_writable"
                :showAddToCartToCheckout="settingsSections.buttons.add_to_cart.add_to_cart_to_checkout"
                :showBayNow="settingsSections.buttons.buy_bow.show_buy_now"
                 class="lg-col-3 md-col-4 sm-col-6 ssx-col-12"  v-for="(product, index) in products" :key="index+'_s'" :item="product" />
        </div>
  </div>
</template>

<script>
export default {
  props:{
    settings:{type:Object}
  },
  data(){
    return{
      products:null,
      slidesToShow:null,
      settingsSections:null
    }
  },
  mounted(){
    this.onResize()
    this.products=this.settings.data
  },
  async fetch(){
    this.settingsSections=await this.$settings();
    if(!this.settingsSections.buttons.quantity)this.settingsSections.buttons.quantity = { show_quantity: true };
  },
  methods:{
        onResize() {
      if (window.innerWidth > 750) {
        this.slidesToShow=4
      } else {
        if(window.innerWidth > 500 && window.innerWidth<750) this.slidesToShow=3
        else this.slidesToShow=2
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
  top: 47px;
  z-index: -1;
}

</style>
