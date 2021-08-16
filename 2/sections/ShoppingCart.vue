<template>
<div class=" height" v-if=" settings">
  <div v-if="productsCart && productsCart.products && productsCart.products.length>0">
    <div class="befor pt-4 d-f ai-c jc-c p-r mx-7" v-if="productsCart.products.length>0">
      <h1 class="b-w  px-2 sm-fs-5">{{settings.cart_sections.title_product}}</h1>
    </div>
    <si-cart class="my-6" v-for="(product,index) in productsCart.products" :key="index+'str'" :product="product" @removeUpsell="getUpsells"/>
    <div  class="br-3 px-7 py-5 card-shadow " v-if="productsCart.products.length>0" >
      <div class="d-f jc-sb ai-c  " v-if="settings.cart_sections.show_total_text" >
        <h2>{{settings.cart_sections.text_total}}</h2>
        <p class="c-red fw-700 fs-5">{{$currency() }} {{ $storeCart().total  | formatPrice}} </p>
      </div>
      <div class="d-f fw-w  jc-sb ai-c sm-d-f sm-fd-cr">
        <nuxt-link :to="settings.cart_sections.link_btn_continue_shopping" class="lg-col-6 sm-col-12 my-2 sm-d-f sm-ai-c sm-jc-c" v-if="settings.cart_sections.show_btn_continue_shopping">
          <si-button class="px-3 py-2 fw-600 f-f fs-4" :text="settings.cart_sections.text_btn_continue_checkout" />
        </nuxt-link>
        <a href="/checkout/"  class="d-f jc-fe lg-col-6 sm-col-12 sm-d-f sm-ai-c sm-jc-c" >
          <si-button class="pr-b c-w px-3 py-2 fw-600 f-f fs-4" :text="settings.cart_sections.text_btn_proceed_checkout" />
        </a>
      </div>
    </div>
    <div class="befor upsell mt-5 d-f ai-c jc-c p-r mx-7" v-if="upsellproducts.length>0">
      <h1 class="b-w  px-2 sm-fs-5">{{settings.cart_sections.upsells.message_upselling}}</h1>
    </div>
    <div class="w-f d-f jc-s fw-w " v-if="settings.cart_sections.upsells.show_upsell">
      <si-upsells
        v-for="(upsell, index) in upsellproducts"
        :key="index"
        :config="upsell"
        class="w-f"
      />
    </div>
  </div>
  <div v-else class="h-s-2/3 p-r d-f ai-c ">
    <si-cartEmpty class="my-10 container" :settings="settings.cart_sections.empty_cart" />
  </div>
</div>
<div v-else>
    <div class="h-s-2/3 p-r d-f ai-c">
       <si-loaderCart class="container my-10"  :showLoader="true" :numberItems="4" type="row" />
    </div>
</div>
</template>

<script>
export default {
      data() {
        return {
          productsCart:null,
          upsells:{},
          upsell:null,
          getProducts:null,
          upsellproducts:[],
          settings:null
        }
      },
     async mounted(){
       setTimeout(async ()=>{
         this.settings = await this.$settings();
       },1000)
      },
    async fetch(){
        this.productsCart= await this.$storeCart()
        setTimeout(()=>{
          this.getUpsells()
        },1000)
    },
    methods:{
     async  getUpsells(){
       this.upsellproducts=[]
             this.productsCart.products.forEach(async(ele) => {
            this.upsell = await this.$upsell({
              "product._id": ele._id,
                      with: 1
              });
                if(this.upsell){
                  this.upsells.product=ele
                  this.upsells.upsellProducts=this.upsell.products
                  this.upsells.discount=this.upsell.discount
                  this.upsellproducts.push(this.upsells)
                }
          });
      }
    }


}
</script>
<style >

</style>
<style lang="scss" scoped>

 .imge-empty img {
  opacity: 0.7;
  animation: HUHU infinite 2s ease-in-out;
}
@keyframes HUHU {
  50% {
    transform: translateY(10px);
  }
}
.card-shadow{
      box-shadow: 1px 1px 3px 1px #cccccc4d;
}
.befor::before{
  content: '';
  width: 100%;
  height: 1px;
  background: #ccc;
  position: absolute;
  left: 0;
  top: 33px;
  z-index: -1;
}
@media (max-width:450px){
  .upsell::before{
    top: 23px;
  }
}
</style>
