<template>
<div class="my-10 p-r upsell br-5 px-2">
  <div class="b-grey">
    <div class="px-2 o-h p-r as-fs d-f fd-c jc-sb h-f" v-if="product">
    <div class="p-a t-0 r-0 l-0 b-0 zi-2 tr-1/2! c-p show-model br-5" @click="closeVariant()" v-if="showModel && product.type == 'variable'"></div>
      <div class="img ">
        <nuxt-link to="/" v-if="product.images">
        <si-image ratio="1:1" :src="currentImage" :alt="product.name || 'No title'"/>
        </nuxt-link>
        <nuxt-link class="my-2 name d-b" to="" >{{ product.name }}</nuxt-link>
      </div>
      <div>
      <div class="p-a l-0 r-0 zi-9 animation" :class="{'anim':showVaraint}" v-if="product.type == 'variable'">
        <si-productVariant class="bur" @priceVariant="priceVariant" type="upsell" :varaintPrice="varaintPrice" colorSize="#fff"  v-if="Colors || Sizes" :product="product" :discount="discount" :Colors="Colors"  :Sizes="Sizes"/>
          <div class="d-f jc-sb"  >
            <div  v-if="price">
            <div class="" v-if="discount">
              <div class="">
                <b>{{ newPrice | formatPrice }} </b><span> {{$currency()}} </span>
              </div>
              <div class=" fs-3 "  v-if="price.salePrice>newPrice">
                <span class="td-lt" >{{ price.salePrice | formatPrice }} </span><span> {{$currency()}}</span>
              </div>
            </div>
            <div class="d-f" v-else>
              <div class="fs-3 ">
                <b>{{ price.salePrice  | formatPrice }} </b><span> {{$currency()}} </span>
              </div>
              <div class="" v-if="price.salePrice>price.salePrice" >
                <span class="td-lt" >{{ price.comparePrice  | formatPrice}} </span><span> {{$currency()}}</span>
              </div>
            </div>
            </div>
            <div class=" d-f as-fe">
              <si-quantity :tab="true" @quantity="quantity" :max="product.quantity.instock" :min="product.quantity.min" :defaultQuantity="product.quantity.default" :increment="product.quantity.increment"/>
            </div>
          </div>
          <div class=" d-f ai-c jc-c fd-c">
          <si-button class="my-1 w-f" :background="['#393A3C']" text="Confirm" color="#E0A331" @click="addUppesllVariant()" />
      </div>
      </div>
      <div class="d-f jc-sb"  >
        <div  v-if="price">
        <div class="" v-if="discount">
          <div v-if="newPrice">
            <b>{{ newPrice | formatPrice }} </b><span> {{$currency()}} </span>
          </div>
          <div class=" color-red fs-3"  v-if="price.salePrice>newPrice">
            <span class="td-lt" >{{ price.salePrice | formatPrice }} </span><span> {{$currency()}}</span>
          </div>
        </div>
        <div class="d-f" v-else>
          <div class="fs-3">
            <b>{{ price.salePrice  | formatPrice }} </b><span> {{$currency()}} </span>
          </div>
          <div class=" color-red" v-if="price.salePrice>price.salePrice" >
            <span class="td-lt" >{{ price.comparePrice  | formatPrice}} </span><span> {{$currency()}}</span>
          </div>
        </div>
        </div>
        <div class=" d-f as-fe">
              <si-quantity :tab="true" @quantity="quantity" :max="product.quantity.instock" :min="product.quantity.min" :defaultQuantity="product.quantity.default" :increment="product.quantity.increment"/>
              <!-- <si-quantity :tab="true"  /> -->
        </div>
      </div>
      <div class=" d-f ai-c jc-c fd-c" >
      <si-button class="my-1 w-f" @click="addUppesllSimple()" :background="['#393A3C']" text="Add" color="#E0A331" />
      </div>
      </div>
    </div>
  </div>
    <!-- <span data-v-ffa64ac6="" class="savings savings-desktop zi-99"><i data-v-ffa64ac6=""> -20%</i> <svg data-v-ffa64ac6="" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><path data-v-ffa64ac6="" d="M326.624,64h-141.28L96,153.376V480c0,17.664,14.368,32,32,32h256c17.664,0,32-14.336,32-32V153.376
	L326.624,64z" style="fill: rgb(244, 67, 54);"></path> <circle data-v-ffa64ac6="" cx="256" cy="144" r="48" style="fill: rgb(250, 250, 250);"></circle> <path data-v-ffa64ac6="" d="M256,160c-8.832,0-16-7.168-16-16V16c0-8.832,7.168-16,16-16s16,7.168,16,16v128
	C272,152.832,264.832,160,256,160z" style="fill: rgb(55, 71, 79);"></path></svg></span> -->
</div>
</template>

<script>
export default {
  props:{
       product: { type: Object },//this.$upsell({"product._id-in": this.productsId,});
       discount: { type: Object },
  },
  data() {
    return {
      Colors:null,
      Sizes:null,
      newPrice:null,
      selectedValues:{},
      selectedColor:null,
      selectedSize:null,
      showVaraint:false,
      currentVariant:{},
      varaintPrice:{
        price:0,
        newPrice:0
      },
      showModel:false,
      selectedVariant:null,
      qty:null

    }
  },
  async fetch(){
  },
 async mounted() {
   this.qty=this.product.quantity.default
    this.initVariant();
    if(this.product.options && this.product.options.length > 0){
     await this.product.options.forEach(ele => {
        if(ele.key=='color') this.Colors=ele
        if(ele.key=='size') this.Sizes=ele
    });
    }
  },
  computed: {
     price: {
      get: function () {
        if (this.product.type == "simple") return this.product.price;
        if (this.product.type == "variable" && this.currentVariant)
          {
            return this.currentVariant.price
          };
      },
      set: function (newVal) {
        this.price == newVal;
      },
    },
      currentImage: function () {
      let image = null;
      if (
        this.product.type == "simple" &&
        this.product.images &&
        this.product.images.length > 0
      ) {
        image = this.product.images[0];
      }else if (
        this.product.type == "variable" &&
        this.product.images &&
        this.product.images.length > 0 &&
        this.currentVariant
      ) {
        let variant = this.product.variants.find((v) => v._id == this.currentVariant._id);
        if(variant){
          image = this.product.images.find((img) => img._id == variant.imageId);
        }
      }
      return image ? image.src : this.$defaultImageProduct;
    },
  },
  methods: {
    closeVariant(){
      this.showModel=!this.showModel
      this.showVaraint=!this.showVaraint
    },
    quantity(val){
      this.qty=val
    },
    addUppesllSimple(){
      this.showModel=!this.showModel
      this.showVaraint=!this.showVaraint
      if(this.product.type == "simple")this.$emit("addUppesllSimple",this.product,this.discount,this.qty)
    },
    addUppesllVariant(){
      this.showModel=!this.showModel
      this.showVaraint=!this.showVaraint
      this.$emit("addUppesllVariant",this.product,this.discount,this.selectedVariant,this.qty)
    },
    priceVariant(variantPrice,variant){
      this.newPrice=variantPrice.newPrice
      this.price=variantPrice
      if(variant){
        this.selectedVariant=variant
        // this.$emit('selectedVariant',variant)
      }
    },
     getVariant() {
      this.currentVariant = this.$getSelectedVariant(
        this.product.variants,
        this.selectedValues.value1,
        this.selectedValues.value2,
        this.selectedValues.value3
      );
    },
    initVariant(){
      if (this.product.type === "variable") {
        const v = this.product.variants[0];
        if (v.option3) {
          this.selectedValues = {
            value1: v.option1.value,
            value2: v.option2.value,
            value3: v.option3.value,
          };
        } else if (v.option2) {
          this.selectedValues = {
            value1: v.option1.value,
            value2: v.option2.value,
          };
        } else {
          this.selectedValues = { value1: v.option1.value };
        }
      }
       this.getVariant();
      if (this.discount) {
       this.newPrice=this.$utils.calcDiscount(this.price.salePrice,this.discount.type,this.discount.value,this.product.quantity.default)
        // if (this.discount.type == "percentage") {
        //   this.newPrice =
        //     this.price.salePrice -
        //     (this.price.salePrice * this.discount.value) / 100;
        // } else {
        //   if(this.discount.type == "fixed_amount")this.newPrice = this.price.salePrice - this.discount.value;
        //   else this.newPrice = this.price.salePrice
        // }
        if (this.newPrice < 0) this.newPrice = 0;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.show-model{
  background: #63616172;

}
.img{
  border-radius: 9px 9px 0 0;
    overflow: hidden;
}
.color-red{
  color: #E0A331;
}
.upsell{
  max-width: 230px;
  background: #fff;
}
@media (max-width:450px){
  .upsell{
  max-width: 100%;
}
}
.name{
  font-size: 14px;
  color: #636161;
}
.savings-desktop {
    transform: rotate(-30deg);
    right: -40px;
    top: -11px;
}
.savings {
    padding: 2px 10px;
    font-weight: 600;
    margin-bottom: 5px;
    position: absolute;
    font-size: 13px;
    border-radius: 3px;
    color: #fff;
    align-self: flex-end;
}
.savings i {
    position: absolute;
    left: 22px;
    top: 30px;
    font-size: 13px;
}
.savings svg {
    height: 51px;
    width: 55px;
}
.animation{
  bottom: -210px;
  background: #ffffff;
  border-radius: 20px 20px 0 0;
  padding: 10px;
  transition: .5s ease;

}
.anim{
   animation: variant .5s  ;
bottom: -11px;
}
@keyframes variant{
  0%{
  bottom: -210px;
  background: #63616190;
  border-radius: 20px;
  padding: 10px;
  transition: .5s ease;
  transform: scale(1);
  }
  80%{
   bottom: -10px;
   transform: scale(1.02);
  }
  100%{
   transform: scale(1);
  }
}
</style>
