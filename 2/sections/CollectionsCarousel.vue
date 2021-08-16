<template>
   <div class="container my-10 sm-my-5" v-if="collections && !config.show ">
      <si-slick  :ratio="config.ratio"   :slidesToShow="slidesToShow" :speed="config.speed" :autoPlay="config.autoPlay" :background="config.background" :fit="config.fit" >
          <div class="width_carousel " v-for="(collection,index) in collections" :key="index*2">
            <div class="mx-3 br-6 p-r o-h d-f ai-c jc-c " >
              <nuxt-link :to="goTo(collection)" class="w-f h-f d-f" v-if="config.show_image">
                <si-image :ratio="config.ratio" :fit="config.fit" :src="collection.image && collection.image.src ? collection.image.src : $defaultImageCollection" :alt="collection.name || 'No name'"/>
                <div class="p-a w-f h-f l-0 r-0 b-0 t-0 mod"></div>
              </nuxt-link>
            </div>
             <nuxt-link :to="goTo(collection)" class="w-f h-f d-f ai-c jc-c mt-2" v-if="config.show_title">
               <si-button :text="collection.name" chek="eee" :fontSize="parseInt(config.buttons.font_size)" :fontWeight="config.buttons.bold" :type="config.buttons.type" :background="config.buttons.background" :color="config.buttons.color" />
             </nuxt-link>
          </div>
      </si-slick>
  </div>
</template>

<script>

export default {
  props:{
    config:{type:Object}
  },
 data() {
   return {
        slidesToShow:null,
        maxHeight:400,
        collections:null
   }
 },
 async fetch(){

 },
async mounted(){
       if(this.config.type=="last"){
         this.onResize()
         this.collections=(await this.$collections({
           limit: 10
         },true)).data
      }else{
        this.onResize()
        this.collections=this.config.items
        this.collections=this.config.collections
      }
},
methods:{
    onResize() {
      if (window.innerWidth > 750) {
        this.slidesToShow=this.config.slidesToShow_desktop
      } else {
        if(window.innerWidth > 500 && window.innerWidth<750) this.slidesToShow=this.config.slidesToShow_tablet
        else this.slidesToShow=this.config.slidesToShow_mobile
      }
  },
      goTo(collection){
      if (collection.childrens&&collection.childrens.length>0) return `/shop/${collection.slug}`;
      else return `/shop/${collection.slug}`;
    }
}
}
</script>

<style>

</style>
