<template>
  <div v-if="posts && settings" class="container my-10 ">
      <div class="my-5 zi-999 d-f ai-c jc-sb" v-if="numberItemScreen">
        <si-button icon="filter" :background="['#ffff']" class="d-n sm-d-b"   @click="showMenuFilter()"  />
        <si-select @input="input" :options="options" placeholder="Filter By" class="my-2 lg-col-4" label="name" code="id" :write="true" :stopBlured="true"   />
        <si-productGrid @viewItem="viewItem" :defaultActive="numberItemScreen" />
      </div>
      <div class="d-f fw-w" >
           <si-post class=" md-col-4 sm-col-4 sx-col-6 ssx-col-12"
            :showImage="settings.blog_sections.show_image"
             :showPublisherName="settings.blog_sections.show_name"
             :showPublisherDate="settings.blog_sections.show_date"
             :showTitle="settings.blog_sections.show_title"
             :showDiscriptions="settings.blog_sections.show_description"
            :class="`${screen}-col-${numberItem}`"  v-for="(blog, index) in posts.data" :key="index+'_h'" :item="blog" />
      </div>
  </div>
</template>

<script>
export default {
  props:{
    posts:{type:Object},
    settings:{type:Object}
  },
  data() {
    return {
      options:[],
      numberItem:4,
      numberItemScreen:null,
      screen:null,
      showSidebar:false
    }
  },
  async mounted() {
     if (window.innerWidth > 900) {
        this.screen='lg'
        this.numberItemScreen=3
    } else {
        if(window.innerWidth > 750 && window.innerWidth<900){ this.screen='md';this.numberItemScreen=4}
        else if(window.innerWidth > 450 && window.innerWidth<750){this.screen='sm' ;this.numberItemScreen=4}
        else if(window.innerWidth > 380 && window.innerWidth<450){this.screen='sx' ;this.numberItemScreen=6}
        else {this.screen='ssx';this.numberItemScreen=6}
      }
      var filterKey={}
      Object.keys(this.settings.blog_sections.top_bar.sort_by).forEach(key=>{
      if(this.settings.blog_sections.top_bar.sort_by[key]){
        filterKey._id=key+'_strn'
      filterKey.name=this.settings.blog_sections.top_bar.sort_text[key]
      this.options.push(filterKey)
      filterKey={}
    }
  })
  },
  methods: {
    showMenuFilter(){
      this.$store.state.showSideBarBlog=!this.$store.state.showSideBarBlog
    },
    input(values){
      var object={}
      if(values.name=="Latest") {
          object.createdAt=1
      }
      if(values.name=="Oldest") {
          object.createdAt=-1
      }
      this.getPosts(object)
    },
    viewItem(val){
      this.numberItem=val
    },
  async getPosts(values){
    this.$emit('valueSortBy',values)
  }
  },

}
</script>

<style>

</style>
