<template>
    <div class="p-r" v-if="categories && settings" >
        <div class="d-n sm-d-b c-p p-a r-0 t-0 w-8 h-8 c-grey fs-5 d-f ai-c jc-c" @click="closeMenuFilter()">✖</div>
        <si-block class="my-5 " v-if="settings.blog_sections.side_bar.categories.show_categorie">
          <template v-slot:title>
            <h2 class="fw-600 fs-5">{{settings.blog_sections.side_bar.categories.title}}</h2>
          </template>
        <div class="mx-2 ">
          <chekList  :items="categories" :selectedUrl="selectedUrl"  @getchekList="getchekList" />
        </div>
        </si-block>

        <si-block class="my-5 bt-gry" v-if="settings && settings.blog_sections.side_bar.products.show_product" >
          <template v-slot:title>
          <h2 class="fw-600 fs-5">{{settings.blog_sections.side_bar.products.title}}</h2>
          </template>
            <div v-if="images">
              <si-slick  background="#fffff" :slidesToShow="1">
                <div class="width_carousel" v-for="(product,index) in settings.sections.featured_products.items" :key="index">
                  <div class="w-f h-f">
                    <si-product :showQuantity="false" :showBayNow="false" :item="product" />
                  </div>
                </div>
              </si-slick>
            </div>
        </si-block>
  </div>
</template>

<script>
export default {
  props:{selectedUrl:Array},
  data() {
    return {
      categories:null,
      settings:null,
      product:null,
      images:[
        "https://storeno.b-cdn.net/stores/6-2021/1622761318774.webp",
        "https://storeno.b-cdn.net/stores/6-2021/1622761354442.jpeg",
        "https://storeno.b-cdn.net/stores/6-2021/1622761407354.jpeg",
       "https://storeno.b-cdn.net/stores/6-2021/1622761460692.jpeg",
       "https://storeno.b-cdn.net/stores/6-2021/1622761500545.webp"
        ],
    }
  },
 async mounted(){
   this.settings= await this.$settings()
 },
  async fetch(){
    this.categories= await this.$categories()
  },
  methods: {
    getchekList(val){
     this.$emit('getchekList',val)
    },
    closeMenuFilter(){
       this.$store.state.showSideBarBlog=!this.$store.state.showSideBarBlog
    }
  },
}
</script>

<style >
.bt-gry{
  border-top: 1px solid #ccc;
}
</style>
