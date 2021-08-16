<template>
<div v-if="product && sections.upsells && sections.description " class=" w-f">
  <component class="my-5"  v-for="(section,index) in Object.keys(sections)" :key="index" :is='`si-${section}`' :config="sections[section]" ></component>
</div>
</template>

<script>
export default {
  props:{
    product:Object
  },
  data() {
    return {
      upsell:null,
      upsellProducts:null,
      discount:null,
      reviews:null,
       sections:{
         upsells:null,
         description:null,
         reviews:null
      },
      sectionMenu: [
        { text: "Product Description", slug: "desc" },
        { text: "Reviews", slug: "rate" },
      ],
    }
  },
  mounted() {
  },
  async fetch(){
    this.reviews = await this.$reviews({ "product._id": this.product._id });
     try {
       this.upsell = await this.$upsell({ "product._id": this.product._id, with: 1 });
     } catch (error) {
       console.log(error)
     }
    this.sections.upsells={}
    this.sections.description={}
    this.sections.reviews={}
    this.sections.description.product=this.product
    this.sections.description.title=this.sectionMenu[0]
    // this.sections.reviews.title=this.sectionMenu[1]
    this.sections.reviews.review=this.reviews

    if(this.upsell){
      this.sections.upsells.product=this.product
      this.sections.upsells.upsellProducts=this.upsell.products.filter(product => product._id!=this.product._id)
      this.sections.upsells.discount=this.upsell.discount
      this.sections.upsells.upsellId=this.upsell._id
    }
  },

}
</script>

<style>

</style>
