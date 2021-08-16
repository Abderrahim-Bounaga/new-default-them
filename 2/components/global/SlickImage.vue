<template>
  <div class="wapper-slick w-f">
      <div class=" mov p-r" :style="{'background':background}" @mousedown="mousedown($event)" @mouseleave="mouseLive()" @mouseup="mouseup()"  @mousemove="mouseover($event)">
      <div class="o-h p-r " :class="{'tr-1/2':!over}" :style="{'left':this.leftMov+'px','width':widthContentCard+'%'}" >
      <div class="py-3 d-f ai-c ">
        <div :class="[hidefarstLastArry?'d-n':'','widthCard-'+slidesToShow]" v-for="(image,index) in setting.images" :key="index+1000" :style="{'width':widthCard+'%','max-height':maxHeight+'px'}">
         <div class="mx-3 br-6 p-r o-h d-f ai-c jc-c " :class="{'content':shadow}">
          <si-image :ratio="ratio" :fit="fit" :src="image" ait="Slick image"  />
          <div class="p-a w-f h-f l-0 r-0 b-0 t-0 mod"></div>
         </div>
        </div>
        <div  :class="'widthCard-'+slidesToShow"  v-for="(image,i) in setting.images" :key="i+2000" :style="{'width':widthCard +'%','max-height':maxHeight+'px'}">
          <div class="mx-3 br-6 d-f o-h ai-c jc-c p-r " :class="{'content':shadow}">
          <si-image :ratio="ratio" :fit="fit" :src="image" ait="slick image"  />
          <div class="p-a w-f h-f l-0 r-0 b-0 t-0 mod"></div>
          </div>
        </div>
        <div   :class="[hidefarstLastArry?'d-n':'','widthCard-'+slidesToShow]" v-for="(image,j) in setting.images" :key="j+3000" :style="{'width':widthCard + '%','max-height':maxHeight+'px'}">
          <div class="mx-3 br-6 o-h d-f ai-c jc-c p-r " :class="{'content':shadow}">
          <si-image :ratio="ratio" :fit="fit" :src="image" ait="slick image"  />
          <div class="p-a w-f h-f l-0 r-0 b-0 t-0 mod"></div>
          </div>
        </div>
      </div>
      </div>
      <div class=" zi-999 p-a w-f h-f l-0 r-0 b-0 t-0 d-n" :class="{'d-b':showModel}"></div>
        <si-button @click="next()" color="#111"  iconColor="#111" icon="next" class="my-auto z-999 b-t p-a l-0 v-h o-0 prev t-1/3 d-f ai-c" :class="{'v-v o-1':play}" />
        <si-button @click="prev()" color="#111"  iconColor="#111" icon="next" class="my-auto z-999 b-t p-a r-0 v-h o-0 next t-1/3 d-f ai-c" :class="{'v-v o-1':play}" />
    </div>
  </div>

</template>

<script>
export default {
  props:{
    setting:Object,
    slidesToShow: { type: Number }, //number of items in screen
    speed:{type:Number ,default:2000}, //Movement speed
    autoPlay:{type:Boolean,default:true}, //stop start play moving
    ratio:{type:String,default:"1:1"},
    maxHeight:{type:[Number,String],default:300},
    background:{type:String,default:"#e6e3e3aa"},
    fit:{type:String,default:'cover'},
    shadow:{type:Boolean,default:false} //box shadow cader image
  },
data() {
  return {
      over:false,
      position:null,
      leftMov:0,
      showModel:false,
      lastPosition:0,
      play:false,
      widthCard:null,
      sizeArrayImage:0,
      cleartimeout:null,
      widthContentCard:null,
      numberMov:null,
      hidefarstLastArry:false,
  }
},
mounted() {
  //number of items in screen
  this.widthCard=(100/(this.setting.images.length*3))
  this.widthContentCard=(100/this.slidesToShow)*this.setting.images.length*3


  this.$nextTick(()=>{
    var  card=document.querySelector('.wapper-slick')
    //Item moving number
     this.numberMov=window.getComputedStyle(document.querySelector(`.widthCard-${this.slidesToShow}`)).width
     this.numberMov=this.numberMov.substring(0,this.numberMov.length-2)
    this.sizeArrayImage=parseInt(this.numberMov)*this.setting.images.length
    //Stop moving  all elements when they  are smaller than screen width
     if(this.sizeArrayImage>card.offsetWidth) {
       this.leftMov=-this.sizeArrayImage
        this.playMoving()
    }else this.hidefarstLastArry=true

  })
},
methods: {
   mousedown(e){
     if(!this.hidefarstLastArry){
       this.over=true
       this.position=e.x
     }
    },
    mouseup(){
      if(!this.hidefarstLastArry){
        this.showModel=false
        if(this.leftMov>0){
          this.leftMov=0
          this.lastPosition=0
        }
        else{
          this.lastPosition=this.leftMov
        }
        this.over=false
      }
    },
    mouseLive(){
      if(!this.hidefarstLastArry){
        this.showModel=false
          clearTimeout(this.cleartimeout)
             this.play=false
           this.cleartimeout=setTimeout(()=>{
             this.playMoving()
           },this.speed)
        if(this.leftMov>0){
          this.leftMov=0
          this.lastPosition=0
        }
        else{
          this.lastPosition=this.leftMov
        }
        this.over=false
      }
    },
    mouseover(e){
       if(!this.hidefarstLastArry){
         this.play=true
         if(this.over){
           this.showModel=true
           this.leftMov=this.lastPosition+(e.x-this.position)
           if(this.leftMov<-this.sizeArrayImage*2)this.leftMov=-this.sizeArrayImage
            if(this.leftMov>-this.sizeArrayImage)this.leftMov=-this.sizeArrayImage*2
         }
       }
    },
    playMoving(){
      if(this.autoPlay) {
        if(!this.hidefarstLastArry){
          if(!this.play){
             this.leftMov-=this.numberMov
            this.cleartimeout= setTimeout(()=>{
              this.playMoving()
              if(this.leftMov<-this.sizeArrayImage*2)this.leftMov=-this.sizeArrayImage
              if(this.leftMov>-this.sizeArrayImage)this.leftMov=-this.sizeArrayImage*2
           },this.speed)
          }
        }
      }
  }
},
}
</script>

<style lang="scss" scoped>
.content{
  box-shadow: 1px 1px 12px -2px #ccc;
}
.mov{
  width: 100%;
  cursor: pointer;
  overflow: hidden;
}

.mod{
  z-index: 9;
}
.d-b{
  display: block !important;
}
.card-c{
  height: 260px;
  position:relative;
  width: 100%;
  display:flex;
  overflow: hidden;
}
.crd{
  width: 25%;
  height: 225px;
  background: red;
}
.next{
  width: 40px;
  height: 40px;
  top: 50%;
  bottom: 50%;
  transform: rotate(-90deg);

}
.prev{
    width: 40px;
  height: 40px;
  top: 50%;
  bottom: 50%;
  transform: rotate(90deg);

}
</style>
