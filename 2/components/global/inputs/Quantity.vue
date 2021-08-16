<template>
<div class="d-f w-f" :id="randomid">
  <si-button text="⎯" @click="decrementQuatity" type="button" :class="size=='lg'?'btn-lg':size=='md'?'btn-md':size=='small'?'btn-small':size=='xs-small'?'btn-xs-small':''"  class="b-grey br-0"/>
  <label :for="'quantity'+randomid" class="labelQ d-f ai-c jc-c w-f f-1 o-h" :class="size=='lg'?'inpt-lg':size=='md'?'inpt-md':size=='small'?'inpt-small':size=='xs-small'?'inpt-xs-small':''" >
     <span class="p-a widthCaracter v-h o-0 " ref="inputwidth"> {{inputValue}} </span>
     <input :type="type" :id="'quantity'+randomid" @input="getValue()"  v-model="inputValue"  :value="inputValue" :style="{'background':background,'color':color,'width':widthInput+'px'}"   :readonly="tab" class=" quantity br-0 bs-n ta-c o-n  "/>
     <span class="mx-1 fs-3">{{unit}}</span>
  </label>
  <si-button text="+" @click="incrementQuatity"  type="button"  :class="size=='lg'?'btn-lg':size=='md'?'btn-md':size=='small'?'btn-small':size=='xs-small'?'btn-xs-small':''"  class="b-grey br-0"/>
</div>
</template>
<script>

export default {
props:{
  size:{type:String,default:'xs-small'},
  increment:{type:Number,default:1},
  defaultQuantity:{type:Number,default:1},
  max:{type:Number,default:100},
  min:{type:Number,default:1},
  tab:{type:Boolean,default:false},
  background:{type:String,default:"#fff"},
  color:{type:String,default:'#111'},
  unit:{type:String,default:null},
  showUnit:{type:Boolean,default:true},
  type:{type:String,default:'text'}
},
data() {
  return {
    randomid:'_'+Math.floor(Math.random()*10000),
    inputValue:null,
    valueunit:null,
    valueSpan:null,
    widthInput:null
  }
},
mounted(){
   this.inputValue=parseInt(this.defaultQuantity)
      this.$emit('quantity',this.defaultQuantity)

  this.getValue()
},
methods: {
  getValue(){
    this.$nextTick(()=>{
      if(this.$refs.inputwidth){
        this.widthInput=this.$refs.inputwidth.clientWidth
      }
   })
  },
  incrementQuatity(){
    if(this.inputValue<this.max){
      if(this.inputValue==''){
        this.inputValue=this.increment
      }else{
        this.inputValue =parseInt(this.inputValue) + this.increment
      }
      this.getValue()
      this.$emit('quantity',this.inputValue)
    }else this.inputValue=this.max
  },
  decrementQuatity(){
    if(this.inputValue>this.min){
     if(this.inputValue==''){
        this.inputValue=this.increment
      }else{
      this.inputValue-=this.increment
      }
      this.getValue()
      this.$emit('quantity',this.inputValue)
    }
  }
},
}
</script>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.labelQ{
  border: 1px solid #ccc;
}
.quantity{
  border: 0px solid #ccc !important;
  box-shadow: none !important;
}
.p-2 {
    padding: 0.5em!important;
}
.br-l-b-0{
  border-bottom-left-radius: 0px !important;
  border-top-left-radius: 0px !important;
}
.br-r-b-0{
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
.br-0{border-radius: 0 !important;}
.btn-xs-small{width: 25px !important;height: 20px !important;}
.btn-small{width: 30px !important;height: 30px !important;}
.btn-md{width: 45px !important;height: 35px !important;}
.btn-lg{width: 55px !important;height: 40px !important;}
.inpt-xs-small{width: 30px !important;height: 20px !important;}
.inpt-small{width: 40px !important;height: 30px !important;}
.inpt-md{width: 60px !important;}
.inpt-lg{width: 75px !important;height: 40px !important;}
</style>
