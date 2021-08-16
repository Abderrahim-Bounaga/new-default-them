<template>
<div class="shadow w-f">
    <!-- <h1 class="my-2 ta-c">{{config.title.text}}</h1> -->
  <div v-if="config" class="w-f b-w  ">
    <div  class="mx-auto description" v-html="config.product.html">
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:{
    config:Object
  },
  mounted() {
    this.$nextTick(()=>{
      var image=document.querySelectorAll('img')
    })
  },
}
</script>

<style lang="scss" scoped>
.description{
  max-width: 1000px;
}
::v-deep img {
  max-width: 100% !important;
  max-height: 100% !important;
}
</style>
