<template>
  <div class="m-auto" v-if="product" >
    <div  class="mx-auto cart-shadow tr-1/2 br-3 o-h d-f fw-w sm-ai-c sm-jc-c mx-2 lg-col-10 p-r " :class="hideCart ? 'hidecart':''">
      <nuxt-link class="mw-100 lg-col-1 md-col-2 sm-col-7 d-f ai-c jc-c" :to="`/products/${product.slug}`" :aria-label="product.name || 'No name'">
        <si-image class="w-f h-f"  :src="product.images.length>0?product.images[0].src:$defaultImageProduct()" />
      </nuxt-link>
      <div class="d-f fw-w  jc-sb lg-col-11 md-col-10 sm-col-12 px-2">
       <div class="lg-col-4 sm-d-f sm-ai-c sm-jc-c sm-fd-c sm-col-12">
         <nuxt-link  :to="`/products/${product.slug}`">
           <h4 class="c-grey">{{product.name}}</h4>
         </nuxt-link>
          <p v-if="product.selected_variant">{{product.selected_variant.name}}</p>
        </div>
        <div class="lg-col-4 sm-col-12 d-f fd-c ai-c">
          <h5 class="c-grey">{{ $currency() }} {{ price.salePrice | formatPrice }} </h5>
          <si-quantity :tab="false" type="number" size="md" @quantity="quantity" :max="product.quantity.instock" :min="product.quantity.min" :unit="product.quantity.unit" :defaultQuantity="product.selected_quantity" :increment="product.quantity.increment" />
        </div>
      <div class="d-f ai-c fd-c lg-col-4 sm-col-12">
         <div class="discount br-3" v-if='discount'><span class="">( {{discount}} )</span> </div>
         <div class="c-grey"><span class=" fw-700 price" >{{ $currency() }} {{ total() | formatPrice }}</span> </div>
      </div>
      </div>
      <button aria-label="Close" class="close" @click="remove()"></button>
      <si-popupConfirm :confirm="confirmWishlist" :settings="configDailogPop" @closePp="closePp"  />
    </div>
  </div>
</template>

<script>
export default {
  props:{
    product:{type:Object},
  },
  data(){
    return {
      getPriceVariant:null,
      hideCart:false,
      removeCart:false,
      discount:null,
      qty:null,
      confirmWishlist:false,
      settings:null,
      configDailogPop:{}
    }
  },
  mounted(){
    if(this.product.discount){
      if(this.product.discount.type=='fixed_amount') this.discount=`- ${this.product.discount.value} ${this.$currency()}`
      if(this.product.discount.type=='percentage') this.discount=`- ${this.product.discount.value} %`
    }
  },
  async fetch(){
    this.settings =await this.$settings()
    this.configDailogPop.text=this.settings.dailog_sections.dailog_cart
    this.configDailogPop.buttons=this.settings.dailog_sections.buttons
  },
  computed: {
     price: {
      get: function () {
        if(this.product.selected_variant){
          return this.product.selected_variant.price
        }else{
          return this.product.price
        }
      }
    },
  },
  methods: {
    closePp(val){
      this.confirmWishlist=false
      if(val=='confirm'){
      this.$utils.call('REMOVE_CART',{product:this.product,variant:this.product.selected_variant?this.product.selected_variant:null})
      this.$emit('removeUpsell')
      }
    },
    remove(){
      this.confirmWishlist=true
    },
  quantity(qty){
    this.qty=qty
    this.$utils.call('ADD_TO_CART',{product:this.product,quantity:qty,variant:this.product.selected_variant?this.product.selected_variant:null})
  },
  total(){
      if(this.product.discount) return this.$utils.calcDiscount(this.price.salePrice,this.product.discount.type,this.product.discount.value,this.product.selected_quantity )
      else return this.price.salePrice *this.qty
  }

}

}
</script>
<style lang="scss" scoped>
@media (max-width:750px){
  .price{
    margin: 0;
  }
}
.hidecart{
    opacity: 0;
    transform: translateX(-100px);
}
.discount{
  // border: 1px solid #DC1C13 ;
  color:#DC1C13;
  padding: 1px 3px;
  font-size: 15px;
  font-weight: bold;
}
$total-items: 7;
.close {
    border: none;
    color: inherit;
    border-radius: 50%;
    background: transparent;
    position: absolute;
    width: 32px;
    height: 32px;
    opacity: 0.6;
    cursor: pointer;
    outline: none;
    top: -7px;
    right: -7px;
}

.close::before, .close::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 13px;
    width: 2px;
    background-color: currentColor;
    border-radius: 3px;
    color: #656060;
}
.close::before {
    transform: translate(-50%, -50%) rotate(45deg);
}
.close::after {
    transform: translate(-50%, -50%) rotate(-45deg);
}
.mw-100{
}
// .animation{
//     animation: fadeIn 1s linear;
//     animation-fill-mode: both;
// }
// @for $i from 1 through $total-items {
//   .animation:nth-child(#{$i}) {
//     animation-delay: 2s * $i;
//   }
// }
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);

  }
}
</style>
<style scoped>
.cart-shadow  {
  box-shadow: 1px 1px 3px 0px #cccccc56 !important;

}
</style>>

