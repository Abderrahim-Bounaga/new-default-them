<template>
  <div  class="w-f sx-pt-12" v-if="settings">
    <div class="p-r o-h">
       <si-posts  class="p-0 w-f h-f" :posts="posts" @valueSortBy="valueSortBy"  :settings="settings"/>
       <si-loader :showLoader="showLoader"/>
    </div>
  </div>
</template>

<script>
export default {
  layout:'defaultBlog',
  data() {
    return {
      filters:null,
      filterPost:null,
      settings:null,
      showLoader:false,
      selectedUrl:[],
      posts:null
    }
  },
 async mounted() {
    this.showLoader=false
    window.addEventListener('post_filter',(e)=>{
      this.valueSortBy({slug:e.detail._slug})
    });
    fbPageView();
    snapPageView();
  },
   async fetch() {
     this.showLoader=true
      this.settings=await this.$settings()
    this.valueSortBy({})
    this.showLoader=false
  },
  methods: {
      async valueSortBy(values){
      this.showLoader=true
      this.posts=await this.$pages({
      limit:this.settings.blog_sections.max_items,
      type:"POST",
      'categories.slug-in[]':values.slug?values.slug:null,
      "sort":{
       "createdAt": values.createdAt?values.createdAt:undefined
     },
    },true)
      setTimeout(() => {this.showLoader=false}, 1000);
  },
  },
}
</script>

<style scoped>
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
</style>
