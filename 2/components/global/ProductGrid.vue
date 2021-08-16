<template>
  <div class="d-f">
    <div class="w-3 mx-2 d-f fw-w c-p" @click="getitems('two')" :class="{'active':chekItem.twoItem}" >
      <span class="bar" v-for="index in 6" :key="index+'2'" ></span>
    </div>
    <div class="w-4 mx-2 fw-w d-f c-p" @click="getitems('three')" :class="{'active':chekItem.threeItem}" v-if="showGrid==3 || showGrid==4">
      <span class="bar" v-for="index in 9" :key="index+'3'"></span>
    </div>
    <div class="w-5 mx-2 d-f fw-w c-p" @click="getitems('four')" :class="{'active':chekItem.fourItem}" v-if="showGrid==3" >
      <span class=" bar" v-for="index in 12" :key="index+'4'"></span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    defaultActive:{type:Number,default:4}
  },
data() {
  return {
    chekItem:{
      twoItem:false,
      threeItem:false,
      fourItem:false
    },
    numberItem:null,
    showGrid:null
  }
},
mounted() {
  this.showGrid=this.defaultActive
  if(this.defaultActive==3){this.chekItem.fourItem=true}
  if(this.defaultActive==4){this.chekItem.threeItem=true}
  if(this.defaultActive==6){this.chekItem.twoItem=true}
      this.$emit('viewItem',this.defaultActive)
},
methods: {
  getitems(val){
    if(val=="two"){
      this.chekItem.twoItem=true
      this.chekItem.threeItem=false
      this.chekItem.fourItem=false
      this.numberItem=6
      this.$emit('viewItem',this.numberItem)
    }
    if(val=="three"){
      this.chekItem.twoItem=false
      this.chekItem.threeItem=true
      this.chekItem.fourItem=false
      this.numberItem=4
      this.$emit('viewItem',this.numberItem)
    }
    if(val=="four"){
      this.chekItem.twoItem=false
      this.chekItem.threeItem=false
      this.chekItem.fourItem=true
      this.numberItem=3
      this.$emit('viewItem',this.numberItem)
    }
  }
},
}
</script>

<style scoped>
.bar{
    width: 3px;
    height: 4px;
  background: #ccc;
  margin-left: 1px;
  margin-right: 1px;
  margin-bottom: 1px;
}
.active span{
  background: rgb(100, 99, 99);
}
</style>
