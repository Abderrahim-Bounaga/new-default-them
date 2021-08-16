<template>
<div>
<div class="container  shop m_mobile " v-if="settings && filters">
  <div class="d-f">
    <si-sideBarShop v-if="settings.shop_sections.side_bar.show_side_bar" :settings="settings"  @filter="filter" :selectedUrl="selectedUrl" class="p-4 lg-col-3 tr-1/2 hide-sidebar sm-o-a mobile_shop" :class="{'active-sidebar':showSidebar}" @closeSidebar="showMenuFilter()" />
    <div :class="settings.shop_sections.side_bar.show_side_bar? 'lg-col-9 sm-col-12':'lg-col-12 sm-col-12'" class="px-2 mx-10 fs-4  product">
      <div class="my-5 zi-999 d-f ai-c jc-sb" v-if="numberItemScreen">
        <si-button icon="filter" :background="['#ffff']" class="d-n sm-d-b"   @click="showMenuFilter()"  />
        <div class="modal zi-6" :class="{ 'modal-close': showSidebar }" @click="showMenuFilter()"
        ></div>
        <si-select v-if="settings.shop_sections.top_bar.show_filter_select" @input="input" :options="options" placeholder="Filter By" class="my-2 lg-col-4 sm-col-6" label="name" code="id" :write="true" :stopBlured="true"    />
        <si-productGrid @viewItem="viewItem" :defaultActive="numberItemScreen"/>
      </div>
      <div class=" d-f fw-w w-f p-r o-h" v-if="products">
         <si-product
          :showAddToCart="settings.buttons.add_to_cart.show_add_to_cart"
          :showAddToCartAnimations="settings.buttons.add_to_cart.show_animation_cart"
          :showQuantity="settings.buttons.quantity.show_quantity"
          :quantity_writable="settings.buttons.quantity.quantity_writable"
          :showAddToCartToCheckout="settings.buttons.add_to_cart.add_to_cart_to_checkout"
          :showBayNow="settings.buttons.buy_bow.show_buy_now"
          class=" md-col-4 sm-col-4 sx-col-6 ssx-col-12" :class="`${screen}-col-${numberItem}`" v-for="(item,index) in  products" :item="item" :key="index+'_____s'" />
         <si-loader :showLoader="showLoader" />
      </div>
      <div v-if="paginate">
          <si-pagination :paginate="paginate" default="" @input="getNextPage" />
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
data() {
  return {
    showSidebar:false,
    showLoader:false,
     settings:null,
     numberItem:null,
     paginate:null,
     filters:null,
     numberItemScreen:null,
     selectedUrl:{
        collections:[],
        price:{
          min:0,
          max:0
        },
        colors:[],
        sizes:[],
        tags:[]
     },
     dataFilterPaginate:null,
     options:[],
     products:null,
     screen:null
  }
},
async mounted() {
          this.showLoader=true
          this.settings=await  this.$settings();
          if(!this.settings.buttons.quantity)this.settings.buttons.quantity = { show_quantity: true };
          this.filters = await this.$filters();
          this.extractDataFromUrl()
          this.dataFilterPaginate=this.selectedUrl
          await this.getProducts(this.selectedUrl)
          var filterKey={}
          Object.keys(this.settings.shop_sections.top_bar.sort_by).forEach(key=>{
            if(this.settings.shop_sections.top_bar.sort_by[key]){
              filterKey._id=key+'_storieno'
            filterKey.name=this.settings.shop_sections.top_bar.sort_text[key]
            this.options.push(filterKey)
            filterKey={}
          }
        })
        this.onResize()
      window.addEventListener('resize',this.onResize);
      fbPageView();
      snapPageView();

},
async fetch() {
  // if(!products){}
},
watch: {
    '$route.query.search'() {
    this.showLoader=true
      var q=window.location.search.split('=')[1]
      q=q.replace(/%20/g," ")
      var values={
        search:q
      }
      this.getProducts(values)
      setTimeout(()=>{
      this.showLoader=false
      },1000)

    }
},
methods:{
  onResize(){
        if (window.innerWidth > 900) {this.screen='lg';this.numberItemScreen=3}
        else {
        if(window.innerWidth > 750 && window.innerWidth<900){ this.screen='md';this.numberItemScreen=4}
        else if(window.innerWidth > 450 && window.innerWidth<750){this.screen='sm' ;this.numberItemScreen=4}
        else if(window.innerWidth > 380 && window.innerWidth<450){this.screen='sx' ;this.numberItemScreen=6}
        else {this.screen='ssx';this.numberItemScreen=6}
      }
  },
  async getNextPage(numberPage){
    this.showLoader=true
    this.dataFilterPaginate.page=numberPage
    this.filter(this.dataFilterPaginate,numberPage)
      setTimeout(()=>{
      this.showLoader=false
      },1000)
  },
  extractDataFromUrl(){
    let params = this.$route.params;
    let q = this.$route.query;
    var slug=null
    if (q.search) this.selectedUrl.search = q.search;
    if(params.slug)  slug=params.slug.split('+')
    this.selectedUrl.collections=slug ? slug :[]
    this.selectedUrl.colors=q['colors[]']?q['colors[]']:[]
    this.selectedUrl.brand=q['brand[]']?q['brand[]']:[]
    this.selectedUrl.sizes=q['sizes[]']?q['sizes[]']:[]
    this.selectedUrl.tags=q['tags[]']?q['tags[]']:[]
    this.selectedUrl.page=q.page?q.page:null
    this.selectedUrl.price.min=q.min_price?q.min_price:null
    this.selectedUrl.price.max=q.max_price?q.max_price:null
  },
 showMenuFilter() {
    this.showSidebar = !this.showSidebar;
 },
  viewItem(val){
    this.numberItem=val
  },
 async filter(values,numberPage=null){
      this.showLoader=true
       this.pushRoute(values)
       values.collections=values.collections? values.collections:[]
       values.colors=values.colors?values.colors:[]
       values.sizes=values.sizes?values.sizes:[]
      values.tags=values.tags?values.tags:[]
      values.price.min=values.price.min|| values.price.min==0 ?values.price.min:null
      values.price.max=values.price.max || values.price.max==0 ?values.price.max:null
      this.dataFilterPaginate=values
      await this.getProducts(values,numberPage)
  },
  async getProducts(values,numberPage=null){
     numberPage=values.page?values.page:null
     var result= await this.$products({
          limit:this.settings.shop_sections.max_items ,
          page:numberPage,
          "collections.slug-in[]": values.collections?values.collections:[],
          "options.values.value1": values.colors,
          "options.values.value2": values.sizes,
            "search":values.search?values.search:null,
          "price.salePrice-from":values.price? values.price.min :null,
          "price.salePrice-to":values.price? values.price.max:null,
          "sort":{
            "price.salePrice": values.sortPrice?values.sortPrice:undefined,
            "review.rating": values.sort_review?values.sort_review:undefined,
            "createdAt": values.createdAt?values.createdAt:undefined
          },
          "tags-in[]": values.tags,
          "brand._id": values.brand?values.brand:[]
        },
        true
      );
      if(!numberPage || values.page){
        this.paginate=result.paginate
      }
      this.products=result.data
      setTimeout(()=>{
        this.showLoader=false
      },1500)
  },
  pushRoute(values){
        const query = {
         colors: values.colors,
         sizes: values.sizes,
         tags: values.tags,
         min_price: values.price.min,
         max_price: values.price.max,
         page:values.page
        };
        window.history.pushState(
        {},
        "",
        this.$pushState("/shop/", values.collections, query)
      );
  },
  async input(val){
    if(val.name){
      var object={}
      object.collections=[]
      object.colors=[]
      object.sizes=[]
      object.tags=[]
      object.price={}
      object.price.min=null
      object.price.max=null
      if(val.name=="Low Price") {
          object.sortPrice=1
      }
      if(val.name=="High Price") {
          object.sortPrice=-1
      }
      if(val.name=="Low Rated") {
          object.sort_review=1
      }
      if(val.name=="High Rated") {
          object.sort_review=-1
      }
      if(val.name=="Latest") {
          object.createdAt=1
      }
      if(val.name=="Oldest") {
          object.createdAt=-1
      }
      this.showLoader=true
      this.dataFilterPaginate=object
      await this.getProducts(object)
    }
  }
},
}
</script>

<style lang="scss" scoped>
  @media (max-width:450px){
    .shop{
      .mobile_shop{
        margin: 58px 0 54px 0;
      }
    }
  }
.global{
    background: #eeeded;
}
.card{
    height: 250px;

}
.global-anim{
    width: 250px;
    background: linear-gradient(to right,#eeeded,#ffff,#eeeded);
    animation: anim 1s infinite;
}
.anim{
    height: 250px;

}
.name{
margin-top: 15px;
}
@keyframes anim{
    0%{
        left: -100%;
        opacity: 1;
    }
    98%{
      left: 100%;
    }
    99%{
      opacity: 0;
    }
    100%{
        left: -100%;
    }
}
.retate{
  transform: rotate(-90deg);
}
.loader {
  width: 100%;
  height: 100vh;
  margin: 0;
  background-color: #ffffff9c;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  div {
  width: 8vmax;
  height: 8vmax;
  border-right: 4px solid #262525;
  border-radius: 100%;
  animation: spinRight 800ms linear infinite;

  &:before, &:after {
    content: '';
    width: 6vmax;
    height: 6vmax;
    display: block;
    position: absolute;
    top: calc(50% - 3vmax);
    left: calc(50% - 3vmax);
    border-left: 3px solid #262525;
    border-radius: 100%;
    animation: spinLeft 800ms linear infinite;
  }

  &:after {
    width: 4vmax;
    height: 4vmax;
    top: calc(50% - 2vmax);
    left: calc(50% - 2vmax);
    border: 0;
    border-right: 2px solid #262525;
    animation: none;
  }
}

@keyframes spinLeft {
  from {transform:rotate(0deg);}
  to {transform:rotate(720deg);}
}

@keyframes spinRight {
  from {transform:rotate(360deg);}
  to {transform:rotate(0deg);}
}
}
.active-sidebar{
  left: 0 !important;
}
@media (max-width:750px) {
    .modal {
    transition: all 0.5s;
  }
  .hide-sidebar{
    position: fixed;
    top: 0;
    bottom: 0;
    background: #ffffff;
    left: -100%;
    z-index: 8;
    width: 250px !important;
  }
  .product{
    margin: 0;
  }
}
</style>
