<template>
  <div class="px-2 my-7 h-f" v-if="filters&& directions">
     <range
        v-if="filters.prices"
        :min="filters.prices.min"
        :max="filters.prices.max"
        :lval="price.min"
        :rval="price.max"
        @handleRange="getPrice"
        :directions="directions"
      />
  </div>
</template>

<script>
import range from './range'
export default {
  data() {
    return {
      price:{
        max:null,
        min:null
      }
    }
  },
  props: {
    filters: [Array, Object], // await this.$filters()
    directions:String,
    selectedUrl:[Object] // Fetching data from url
  },
components:{
  range
},
fetch() {
  this.price.min=parseInt(this.selectedUrl.min)
  this.price.max= parseInt(this.selectedUrl.max)
},methods: {
  getPrice(val) {
     this.price.max = val.max;
     this.price.min = val.min;
     this.$emit("getPrice", this.price);
   },
},
}
</script>

<style>

</style>
