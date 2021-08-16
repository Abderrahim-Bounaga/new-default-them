<template>
   <div v-if="products.length>0">
    </div>
</template>

<script>
export default {
  props:{
    upsells:{type:Object}
  },
  data(){
    return{
      products:[]
    }
  },
  mounted(){
    if(this.upsells.data){
      this.upsells.data.forEach(upsell => {
        if(upsell.products.length>0){
          upsell.products.forEach(product=>{
            this.products.push(product)
          })
        }
      });
    }
  }
}
</script>

<style>

</style>
