<template>
  <div class="container my-10" v-if="config && setting && !config.show ">
    <div><h1 class="my-4 ta-c sm-fs-6">{{config.title}}</h1></div>
        <si-slick  background="#fafafa" :contentCenter="true" :slidesToShow="4"  >
          <div class="width_carousel " v-for="(brand,index) in config.items" :key="index*2">
            <div class="mx-3 br-6 p-r o-h d-f ai-c jc-c ">
              <nuxt-link :to="`/shop/?brand[]=${brand._id}`" class="w-f h-f" :aria-label="brand.name || 'No name'">
                <si-image ratio="3:1" fit="contain" :alt="brand.name" :src="brand.imageSrc"  />
                <div class="p-a w-f h-f l-0 r-0 b-0 t-0 mod"></div>
              </nuxt-link>
            </div>
          </div>
      </si-slick>
  </div>
</template>

<script>
export default {
  props:{
    config:Object
  },
  data() {
    return {
      setting:null
    }
  },
  mounted(){
    this.setting={}
    this.setting.images=[]
    this.config.items.forEach(ele => {
      this.setting.images.push(ele.imageSrc)
    });

  }
}
</script>

<style>

</style>
