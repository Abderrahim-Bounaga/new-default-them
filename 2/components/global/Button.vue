<template>
          <button :disabled="disabled" class="p-2 d-f ai-c c-p br-3 b-n o-n btn" :style="style" @click="$emit('click')"  >
              <icon v-if="!iconAfter && icon" :name="icon"  :color="iconColor || textcolor" />
              <span v-if="text" class=" w-f" :class="{'button-text':icon}"  :style="{'color': textcolor,'font-size':fontSize+'px','font-weight':fontWeight}">{{text}}</span>
              <Icon v-if="iconAfter" :name="icon"  :color="iconColor || textcolor" />
          </button>
</template>

<script>
import icon from './Icon'
export default {
  components:{
    icon
  },
  data() {
    return {
      textcolor:null
    }
  },
  props:{
    type:{type:String,default:"filled"},
    text:{ type:String,default:null },
    icon:{ type:String ,default:null},
    background:{type:Array},
    iconAfter:{type:Boolean,default:false},
    color:{type:String},
    iconColor: {type: String, default: null},
    textAling: {type: String, default: null},
    disabled:{type:Boolean,default:false},
    fontWeight:{type:Number,default:400},
    fontSize:{type:Number,default:16},
    chek:{type:String}
  },
  mounted(){
    if(this.chek=='test') console.log(this.type)
  },
  computed: {
    style:function(){
      if(this.background && this.background.length>0){
        if(this.background.length==1){
          if(this.type=="border"){
            this.textcolor=this.background[0]
            return {'border':`2px solid ${this.background[0]}`,'background':`${this.color}`}
          }
           else{
             this.textcolor=this.color
             return {'background':`${this.background[0]}`}
           }
        }
        else{
          if(this.type=="border"){
            this.textcolor=this.background[0]
             return {'border':`2px solid`,'border-image-slice':`1`,'border-width':`2px`,'border-image-source': `linear-gradient(45deg, ${this.background.join(',')});`}
          }else{
            this.textcolor=this.color
            return {'background':`linear-gradient(45deg, ${this.background.join(',')})`}
          }
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.button-text{
  width: 55%;
}
</style>
