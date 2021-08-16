<template>
  <div :id="randomId" class="wapper-slick w-f">
      <div class=" mov p-r" :style="{'background':background}"  @mousedown="mousedown($event)" @mouseleave="mouseLive()" @mouseup="mouseup()"  @mousemove="mouseover($event)"   @touchend="mouseup('mobile')" @touchstart="mousedown($event.touches[0])" @touchmove="mouseover($event.touches[0])">
        <div class="o-h p-r " :class="[(!over?'tr-1/2':''),(contentCenter?'m-auto':'')]" :style="{'left':this.leftMov+'px','width':widthContentCard+'%'}"  >
          <div class="d-f ai-c " >
            <div class="py-3 d-f ai-c slide_width" :style="{'width':widthOneArray+'%'}" v-if="!hidefarstLastArry" >
              <slot ></slot>
            </div>
            <div class="py-3 d-f ai-c slide_width" :style="{'width':widthOneArray+'%'}" >
              <slot ></slot>
            </div>
            <div  class="py-3 d-f ai-c slide_width" :style="{'width':widthOneArray+'%'}" v-if="!hidefarstLastArry" >
              <slot ></slot>
            </div>
          </div>
        </div>
      <div class=" zi-999 p-a w-f h-f l-0 r-0 b-0 t-0 d-n" :class="{'d-b':showModel}"></div>
        <si-button @click="prev()" color="#111"  iconColor="#111" icon="next" class="my-auto zi-999 b-t p-a l-0 v-h o-0 prev t-1/3 d-f ai-c" :class="{'v-v o-1':play}" />
        <si-button @click="next()" color="#111"  iconColor="#111" icon="next" class="my-auto zi-999 b-t p-a r-0 v-h o-0 next t-1/3 d-f ai-c" :class="{'v-v o-1':play}" />
    </div>
  </div>

</template>

<script>
 export default {
   props:{
     setting:Object,
     slidesToShow: { type: Number,default:4 }, //number of items in screen
     speed:{type:Number ,default:2000}, //Movement speed
     autoPlay:{type:Boolean,default:true}, //stop start play moving
     ratio:{type:String,default:"1:1"},
      maxHeight:{type:[Number,String],default:300},
     background:{type:String,default:"#e6e3e3aa"},
    fit:{type:String,default:'cover'},
    shadow:{type:Boolean,default:false}, //box shadow cader image,
    contentCenter:{type:Boolean,default:false}
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
      widthOneArray:null,
      randomId:'_'+Math.floor(Math.random()*10000),
      cleartimeout:null,

  }
},
watch:{

},
mounted() {
    this.randomId='_'+Math.floor(Math.random()*10000)

   this.normale()
},
 methods: {
   normale(){
    this.$nextTick(()=>{
    //number of items in screen
      var content=document.querySelectorAll('#'+this.randomId+' .width_carousel')
      if(content.length==0){
       window.timeOut =  setTimeout(()=>{
          this.normale()
       },2000)
      }else{
         clearTimeout(window.timeOut);
        var numberItem=content.length
        this.widthCard=(100/(numberItem/3))
        content.forEach(ele=>{
          ele.style.width=this.widthCard+'%'
        })
        this.widthContentCard=(100/this.slidesToShow)*numberItem
        if((numberItem/3)>this.slidesToShow)this.widthOneArray=this.widthContentCard/3
        else {
          this.widthContentCard=this.widthContentCard/3
          this.widthOneArray=100
          this.hidefarstLastArry=true
        }
         var  card=document.querySelector('.wapper-slick')
        // //Item moving number
            setTimeout(()=>{
              content.forEach(ele=>{
                var item=window.getComputedStyle(ele).width
                this.numberMov=item.substring(0,item.length-2)
                this.sizeArrayImage+=parseInt(this.numberMov)
            })
                this.sizeArrayImage=this.sizeArrayImage/3
           //    Stop moving  all elements when they  are smaller than screen width
            if(this.sizeArrayImage>card.offsetWidth) {
              this.leftMov=-this.sizeArrayImage
                this.playMoving()
            }
        },1000)

        }
      })
   },
   next(){

      this.leftMov += parseInt(this.numberMov)
      if(this.leftMov<-this.sizeArrayImage*2)this.leftMov=-this.sizeArrayImage
      if(this.leftMov>-this.sizeArrayImage)this.leftMov=-this.sizeArrayImage*2
   },
   prev(){
      if(this.leftMov<-this.sizeArrayImage*2)this.leftMov=-this.sizeArrayImage
      if(this.leftMov>-this.sizeArrayImage)this.leftMov=-this.sizeArrayImage*2
           this.leftMov-=parseInt(this.numberMov)
   },
    mousedown(e){
     if(!this.hidefarstLastArry){
       this.over=true
       this.position=e.clientX
     }
     },
     mouseup(target){
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
      if(target=="mobile"){
          this.mouseLive()
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
           this.leftMov=this.lastPosition+(e.clientX-this.position)
           if(this.leftMov<-this.sizeArrayImage*2)this.leftMov=-this.sizeArrayImage
            if(this.leftMov>-this.sizeArrayImage)this.leftMov=-this.sizeArrayImage*2
         }
       }
    },
     playMoving(){
      if(this.autoPlay) {
        if(!this.hidefarstLastArry){
          if(!this.play){
           this.leftMov-=parseInt(this.numberMov)
            this.cleartimeout= setTimeout(()=>{
              this.playMoving()
                this.over=false
              if(this.leftMov<-this.sizeArrayImage*2){
                this.over=true
                this.leftMov=-this.sizeArrayImage
                // this.leftMov-=parseInt(this.numberMov)
              }
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
  top: 50%;
  bottom: 50%;
  transform: rotate(-90deg);

}
.prev{
  top: 50%;
  bottom: 50%;
  transform: rotate(90deg);

}
</style>
