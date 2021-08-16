<template>
  <div v-if="items">
      <div class="my-4 d-f ai-c " v-for="(item, index) in items.data" :key="index" >
          <si-input :id="item.slug" type="checkbox" @input="getValue(item.slug)"  v-model="value" :checked="selected.includes(item.slug)"  />
          <label :for="item.slug" class="mx-3 c-p c-grey">{{item.name}}</label>
     </div>
  </div>
</template>

<script>
export default {
props: {
  items: Object,    // await this.$collections()
  selectedUrl:Array  // Fetching data from url
 },
data() {
  return {
    selected:[],
    value:null
  }
},
mounted(){
  this.selected=this.selectedUrl
},
methods: {
   getValue(val){
     this.value=val
       var col=this.selected.findIndex(el=> el==val)
      if(col==-1) this.selected.push(val)
      else this.selected.splice(col,1)
     this.$emit('getchekList',this.selected)
  }
},
}
</script>

<style scoped>
</style>
