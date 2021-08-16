<template>
    <input  class="p-3 input"  :type="type" @input="getValue" @blur="$emit('blur')"     />
</template>
<script>
export default {
  // v-on="inputListeners"
  props:{
    type:{ type:String,default:"text"},
      typeChek:{type:String,default:null}
  },
  data(){
    return{
      value:null
    }
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    getValue(){
      this.$emit('input')
    },
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
%input{
 border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 0 0 0 0 rgb(0 0 0 / 15%);
  box-shadow: 0 0 0 0 rgb(0 0 0 / 15%);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  outline: none;
}
%inputFocus{
  border: 1px solid #bfbdbd;
  box-shadow: 3px 2px 7px -2px #ccc;
}
%inputCheck{
   visibility: hidden;
    position: relative;
    cursor: pointer;
    width: 17px;
    height: 17px;
}
%inputChekBeffor{
  content: "";
  width: 17px;
  height: 17px;
  border: 1px solid #e4e4e4;
  visibility: visible;
  position: absolute;
}
input[type="text"]{
  @extend %input
}
input[type="text"]:focus{
  @extend %inputFocus
}
input[type="number"]{
  @extend %input
}
input[type="number"]:focus{
    @extend %inputFocus
}
input[type="checkbox"]{
    @extend %inputCheck
}
input[type="checkbox"]::before{
    @extend %inputChekBeffor;
  top: 0;
  border-radius: 2px;
  transition: all .3s;
}
input[type="checkbox"]:checked{
    &::after{
    width: 13px;
    height: 5px;
    border-color: var(--primary-color);
    bottom: 7px;
    left: 2px;
    transform: rotate(-45deg);
    opacity: 1;
}
  &::before{
  border-color: var(--primary-color);
  transform: rotate(90deg);
}
}
input[type="checkbox"]::after{
     content: "";
    width: 14px;
    height: 9px;
    border-bottom: 2px solid #5e5d5d;
    border-left: 2px solid #5e5d5d;
    bottom: -6px;
    visibility: visible;
    position: absolute;
    transition: all .1s;
    opacity: 0;
}
input[type="radio"]{
    @extend %inputCheck;
    width: 22px;
    height: 21px;
}
input[type="radio"]::before{
    @extend %inputChekBeffor;
  border-radius: 50%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
input[type="radio"]::after{
    content: "";
    width: 6px;
    height: 6px;
    background:var(--primary-color);
    visibility: visible;
    position: absolute;
    border-radius: 50%;
    transition: all 0.2s;
    opacity: 0;
   left: 51%;
    top: 50%;
    transform: translate(-50%,-50%);
}
input[type="radio"]:checked{
    &::after{
    width: 12px;
    height: 12px;
    border: none;
    background: var(--primary-color);
    left: 48%;
    top: 48%;
    transform: translate(-50%,-50%);
    opacity: 1;
  }
  &::before{
  border-color: var(--primary-color);
}
}
</style>
