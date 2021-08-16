<template>
  <div  class="p-2"  v-if="item && settings">
    <div class="d-f ai-c  p-r c-r cart" :class="type=='grid'?'fd-c jc-sb':'fd-r'" @mousemove="showActions=true" @mouseleave="showActions=false">
     <div class="w-f">
       <div class="border p-r d-f fd-c w-f tr-1/2 o-h" >
         <div class="w-f h-f d-f jc-c" :class="{'hover':hover}">
          <nuxt-link class="h-0 d-ib w-f pb-f" :to="`/products/${item.slug}`" :aria-label="item.name">
            <si-image class="p-a t-0 b-0 l-0 r-0 w-f h-f of-c br-8 o-h" :src="item.images.length>0 ? item.images[0].src:$defaultImageProduct " :alt="item.name"/>
          </nuxt-link>
         </div>
         <si-button aria-label="Wishlist Filled" v-if="wishlist" @click="romveWishlist(item)" :class="{'active':wishlist}" icon="wishlist_filled" iconColor="#E50B00" :background="['transparent']"  class="fs-3 p-a r-0 t-0 wich"/>
         <si-button aria-label="Wishlist Empty" v-if="!wishlist" @click="addWishlist(item)" icon="wishlist_vide" iconColor="#E50B00" :background="['transparent']"   class="fs-3 p-a r-0 t-0 wich"/>
       </div>
       <span v-for="i in 5" :key="i">
         <svg
              data-v-b6cc1c62=""
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              height="10"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              class="svg-inline--fa fa-star fa-w-18"
              style="color: rgb(195, 195, 195)"
            >
              <path
                data-v-b6cc1c62=""
                :style="i!=5 ? 'fill:#D8BC07':'fill:#ccc'"
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
              ></path>
         </svg>
       </span>
       <div class="my-1">
              <nuxt-link :to="`/products/${item.slug}`">
                <p class="fw-600 fs-5 name-product ws-nw to-e o-h ">
                {{item.name}}
                </p>
              </nuxt-link>
       </div>
       <div class="my-1 d-f ai-c fw-500 ">
              <p class="price-product"> <b>{{item.price.salePrice}}</b> {{$currency()}}</p>
              <p class="mx-4 td-lt fs-3 h-f c-grey" v-if="item.price.comparePrice>item.price.salePrice" >{{item.price.comparePrice}} {{$currency()}}</p>
       </div>
     </div>
    <div class="as-fs w-f">
            <div class="my-2" v-if="showQuantity && showAddToCart && !outstock  ">
              <si-quantity :tab="!quantity_writable" type="number" size="md" @quantity="quantity" :max="item.quantity.instock" :min="item.quantity.min" :unit="item.quantity.unit" :defaultQuantity="item.quantity.default" :increment="item.quantity.increment" />
            </div>
            <div class="my-1" v-else-if="outstock">
              <si-button :disabled="outstock" text="Out of stock"  type="border" color="#ffffff" :background="['red']"  class="py-3 w-f ta-c d-f fd-c ai-c jc-c p-r t-1 show-addtocart" />
            </div>
            <div class="" v-if="item.type=='simple'" :class="{'o-1/2':outstock}">
              <a href="/checkout/" v-if="showAddToCartToCheckout && showAddToCart">
                <si-button :disabled="outstock" :text="settings.buttons.add_to_cart.text" @click="addtocard(item)" :type="settings.buttons.add_to_cart.type" :color="settings.buttons.add_to_cart.color" :background="settings.buttons.add_to_cart.background"  class="py-3 w-f ta-c d-f fd-c ai-c jc-c p-r t-1 show-addtocart" />
              </a>
              <div class="w-f" v-else>
                <si-button :disabled="outstock" v-if="showAddToCart && !showAddToCartAnimations" :text="settings.buttons.add_to_cart.text" @click="addtocard(item)" :type="settings.buttons.add_to_cart.type" :color="settings.buttons.add_to_cart.color" :background="settings.buttons.add_to_cart.background"  class="py-3 w-f ta-c d-f fd-c ai-c jc-c p-r t-1 show-addtocart" />
                <si-addToCartAnimation :disabled="outstock" v-if="showAddToCart && showAddToCartAnimations" class="my-2" :text="settings.buttons.add_to_cart.text" @click="addtocard(item)" :type="settings.buttons.add_to_cart.type" :color="settings.buttons.add_to_cart.color" :background="settings.buttons.add_to_cart.background"  />
              </div>
            </div>
            <div v-else :class="{'o-1/2':outstock}">
              <nuxt-link :to="`/products/${item.slug}`" v-if="showAddToCart" >
                  <si-button :disabled="outstock" :text="settings.buttons.view_details.text"  :type="settings.buttons.view_details.type" :color="settings.buttons.view_details.color" :background="settings.buttons.view_details.background"  class="py-3 w-f ta-c my-2 d-f fd-c ai-c jc-c p-r t-1 show-addtocart" />
              </nuxt-link>
            </div>
            <div class="my-2" v-if="showBayNow && item.type=='simple'" :class="{'o-1/2':outstock}">
              <a href="/checkout/" v-if="!outstock" >
                 <si-button  :text="settings.buttons.buy_bow.text" :type="settings.buttons.buy_bow.type" :color="settings.buttons.buy_bow.color" @click="addtocard(item)" :background="settings.buttons.buy_bow.background"  class="py-3 w-f ta-c d-f fd-c ai-c jc-c p-r t-1 show-addtocart" />
              </a>
               <si-button v-else :disabled="outstock" :text="settings.buttons.buy_bow.text" :type="settings.buttons.buy_bow.type" :color="settings.buttons.buy_bow.color" @click="addtocard(item)" :background="settings.buttons.buy_bow.background"  class="py-3 w-f ta-c d-f fd-c ai-c jc-c p-r t-1 show-addtocart" />
            </div>
            <div v-else-if="showBayNow">
              <nuxt-link :to="`/products/${item.slug}`" >
                  <si-button  :text="settings.buttons.buy_bow.text" :type="settings.buttons.buy_bow.type" :color="settings.buttons.buy_bow.color" @click="addtocard(item)" :background="settings.buttons.buy_bow.background"  class="py-3 w-f ta-c d-f fd-c ai-c jc-c p-r t-1 show-addtocart" />
              </nuxt-link>
            </div>
    </div>
    </div>
  </div>
</template>

<script>
import Action from './action'
export default {
  props:{
    type:{type:String,default:"grid"},
    item:{type:Object},
    hover:{type:Boolean,default:false},
    activeWishlist:{type:Boolean,default:false},
    showQuantity:{type:Boolean,default:true},
    quantity_writable:{type:Boolean,default:true},
    showBayNow:{type:Boolean,default:true},
    showPrice:{type:Boolean,default:true},
    showAddToCart:{type:Boolean,default:true},
    showAddToCartAnimations:{type:Boolean,default:true},
    showAddToCartToCheckout:{type:Boolean,default:false},
    inactiveWish:{type:String},
  },
  components:{
    Action
  },
  data() {
    return {
      showActions:false,
      settings:null,
      qty:null,
      wishlist:false,
      wishlistProduct:null,
      increment:0,
      wish:null,
      outstock:null
    }
  },
  watch:{
    inactiveWish:function(){
      if(this.inactiveWish==this.item._id) {
        console.log("test")
        this.wishlist=!this.wishlist

      }
    }
  },
  beforeCreate(){

  },
 async fetch() {
      this.getwishlist()
      this.settings=await this.$settings()
      this.chekOutOfStock()
},
methods:{
  chekOutOfStock(){
      if(this.item.outStock.disabled == false && this.item.quantity.instock<=0 && this.item.type=="simple" ) this.outstock= true
      else this.outstock= false
  },
  async getwishlist(){
        this.increment++
             this.wishlistProduct= await this.$storeWishlist()
            if(this.wishlistProduct.products.length<=0 && this.increment<=2){
              setTimeout(()=>{
                this.getwishlist()
              },500)
            }else{
              if(this.wishlistProduct.products.length>0) {
                const index=this.wishlistProduct.products.findIndex(ele=> ele._id==this.item._id)
                if(index!=-1) this.wishlist=true
              }
            }
    },
  quantity(val){
    this.qty=val
  },
  addtocard(item){
    if(!this.qty) this.qty=this.item.quantity.default
    this.$utils.call('ADD_TO_CART',{product:item,quantity:this.qty})
  },
  addWishlist(item){
    console.log(this.wishlist)
    this.wishlist=!this.wishlist
    if(this.wishlist){
      this.$utils.call('ADD_TO_CART',{product:item,quantity:this.qty,target:'wishlist'})
    }
  },
  romveWishlist(item){
      this.$emit("romve_wishlist",item)
  }
}
}
</script>

<style lang="scss" scoped>

.active{
  animation: wishlistanimation .3s ;
}
@keyframes wishlistanimation {
  0%{
    transform: scale(1);
  }
  100%{
    transform: scale(1.1);
  }
}
.wich{
      border-radius: 0 10px 0 10px;
    top: -1px;
    right: -1px;
}
.border{
  border: 1px solid #efefef;
  border-radius: 10px;
}
.cart {
  .name-product{
    color: rgb(58, 57, 57);
  }
  .price-product{
    color: rgb(58, 57, 57);
    span{
      color: red;
    }
  }
  .show-addtocart{
    transition: all .3s;
  }
  .show-addtocart:hover{
    transform: scale(1.005);
  }
  // &:hover{
  //   .show-addtocart{
  //     visibility: visible !important;
  //     opacity: 1 !important;
  //     top: 0 !important;
  //   }
  // }
}
.act{
  box-shadow: 0px 4px 4px 0px #00000021;
}
[src^="https://storeino.b-cdn.net/assets/no-image/no-image-products.svg"]{
    background-color: #f5f5f5;
    padding: 20%;
    box-sizing: border-box;
}
</style>
