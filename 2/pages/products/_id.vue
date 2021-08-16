<template>
<div v-if="product  ">
  <productDetails  :product="product" />
    <div class="container" v-if="products">
    <si-relatedProducts  :settings="products" />
  </div>
  <hr style="border:1px solid rgb(241 241 241);">
  <div class="container d-f fw-w">
    <si-productDetailsSections  :product="product" />
   </div>
</div>
<div v-else-if="!error">
      <div class="h-s p-r">
       <si-loaderProductDetails class="container m_mobile" :showLoader="true" :numberItems="1" type="row" />
    </div>
</div>
<div v-else-if="settings">
  <si-error :settings="settings.error_sections.error_404" />
</div>
</template>

<script>
export default {
  data() {
    return {
      product:null,
      upsell:null,
      discount:null,
      upsellProducts:null,
      collections:[],
      products:null,
      error:false,
      settings:null
    }
  },
  components:{
     productDetails: () => import("@/sections/ProductDetails")
  },
  mounted() {
    fbPageView();
    snapPageView();
  },
  async fetch() {
    this.settings=await this.$settings()
     this.product = await this.$product({ slug: this.$route.params.id });
    if (this.product && this.product.collections.length != 0) {
      this.product.collections.forEach(col => {
        this.collections.push(col.slug);
      });
      this.products = await this.$products(
        {
          "collections.slug-in[]": this.collections,
          limit:10
        },
        true
      );
    }
    if(!this.product) this.error=true
  },
  methods:{
  }

}
</script>

<style>

</style>
