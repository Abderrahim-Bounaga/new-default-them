<template >
  <span   :class=" `icon mx-1  icon-${name}`" :style="style"></span>
</template>

<script>
export default {
  data() {
    return {
      style:null,
      filter:null,
      iconColor:null
    }
  },
  props:{
    color:String,
    name:String
  },
  mounted() {
       this.style= this.$icons.getNewColor(this.color)
  }
}
</script>

<style scoped>
.icon{
  display: inline-table;

}
</style>
