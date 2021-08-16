<template>
  <div class="p-r" v-if="collections && filters && selected && settings ">
   <div class="d-n sm-d-b p-a r-0 t-0 w-8 h-8 c-grey fs-5 d-f ai-c jc-c " @click="closeMenuFilter()">✖</div>
    <div >
      <si-block class="my-5 " v-if="settings.shop_sections.side_bar.collections.show_collections">
        <template v-slot:title>
        <h2 class="fw-600 fs-5">{{settings.shop_sections.side_bar.collections.title}}</h2>
      </template>
      <div class="mx-2 ">
        <si-chekList :selectedUrl="selectedUrl.collections" :items="collections" @getchekList="getchekList" />
      </div>
      </si-block>
      <si-block class="my-5 bt-gry" v-if="settings.shop_sections.side_bar.prices.show_price" >
        <template v-slot:title>
        <h2 class="fw-600 fs-5">{{settings.shop_sections.side_bar.prices.title}}</h2>
      </template>
      <div>
        <si-rangePrice @getPrice="getPrice" :selectedUrl="selectedUrl.price" :filters="filters" :directions="directions" />
      </div>
      </si-block>
      <si-block class="my-5 bt-gry" v-if="settings.shop_sections.side_bar.colors.show_color && filters.colors.length>0">
        <template v-slot:title>
        <h2 class="fw-600 fs-5">{{settings.shop_sections.side_bar.colors.title}}</h2>
      </template>
      <div>
        <si-color :selectedUrl="selectedUrl.colors" @getColor="getColor" :colors="filters.colors"/>
      </div>
      </si-block>
      <si-block class="my-5 bt-gry" v-if="settings.shop_sections.side_bar.sizes.show_size && filters.sizes.length>0 ">
        <template v-slot:title>
        <h2 class="fw-600 fs-5">{{settings.shop_sections.side_bar.size.title}}</h2>
      </template>
      <div>
        <si-size :selectedUrl="selectedUrl.sizes" @getSize="getSize" :sizes="filters.sizes"/>
      </div>
      </si-block>
      <si-block class="my-5 bt-gry" v-if="posts && settings.shop_sections.side_bar.blog.show_blog">
        <template v-slot:title>
        <h2 class="fw-600 fs-5">{{settings.shop_sections.side_bar.blog.title}}</h2>
        </template>
          <div>
            <si-slick  background="#fffff" :slidesToShow="1" :autoPlay="false"   :speed="3000">
              <si-post class="width_carousel "   v-for="(blog, index) in posts.data" :key="index+'_s'" :item="blog" />
            </si-slick>
          </div>
        </si-block>
    </div>
</div>
</template>

<script>
export default {
  props:{
    selectedUrl:{type:Object},
    settings:{type:Object}
  },
  data() {
    return {
      collections:null,
      posts:null,
      filters:null,
      directions:"ltr",
      selected:{
        collections:[],
        price:{
          min:null,
          max:null
        },
        colors:[],
        sizes:[],
        tags:[]
      }
    }
  },
 async mounted() {
     this.collections = await this.$collections();
     this.filters = await this.$filters();
  },
async fetch(){
    this.posts=await this.$pages({type:"POST"},true)
},
methods: {
  getchekList(val){
    this.selected.collections=val
    this.$emit('filter',this.selected)
    this.$emit('closeSidebar')
  },
  getPrice(val){
    this.selected.price.min=val.min ||val.min==0 ?val.min:null
     this.selected.price.max=val.max||val.max==0 ?val.max:null

     this.$emit('filter',this.selected)
    this.$emit('closeSidebar')
  },
  getColor(val){
    this.selected.colors=val
     this.$emit('filter',this.selected)
    this.$emit('closeSidebar')
  },
  getSize(val){
    this.selected.sizes=val
   this.$emit('filter',this.selected)
    this.$emit('closeSidebar')
  },
  closeMenuFilter(){
    this.$emit('closeSidebar')
  }
},
}
</script>

<style >
.bt-gry{
  border-top: 1px solid #ccc;
}

</style>
