<template>
<div class="h-0 d-ib w-f p-r image_str" :style="{'padding-bottom':paddingBottom+'% !important'}">
  <img :src="src" class="p-a t-0 b-0 r-0 l-0 w-f h-f " :style="{'object-fit':fit}"  :alt="alt">
</div>
</template>

<script>
export default {
  props:{
    src:{type:String,default:"https://arabista.net/wp-content/themes/superfine/assets/images/blog/no-img.jpg"},
    alt:{type:String, required:true },
    ratio:{type:String,default:"1:1"},
    fit:{type:String,default:'cover'},
  },
  data() {
    return {
      paddingBottom:null
    }
  },
  mounted() {
    this.calculSizeImage()
  },
  methods: {
    calculSizeImage(){
      var sizeRatio=this.ratio.split(':')
      this.paddingBottom=(parseInt(sizeRatio[1])*100)/parseInt(sizeRatio[0])
    }
  },

}
</script>

<style>

</style>
