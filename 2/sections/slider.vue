<template>
    <section  class="sx-pt-12"  v-if="settings && slide_size && slide_length>0 ">
      <div v-if="!config.show" :class="{'container':!config.fullScreen}">
        <div class="home o-h p-r"  id="home" :style="`height:${slide_size}px`">
          <!-- <nuxt-link :to="config.slide_click.click?config.slide_click.link:''"> -->
            <div class="slidder">
                  <div
                    class="slidde w-f d-n "
                    v-for="(slide,index) in Object.keys(config.items)" :key="index"
                    :style="`background:url(${config.items[slide].image ? config.items[slide].image.src:'' });background-size: 100% 100% !important;height:${slide_size}px`"
                  >
                    <div class="container d-f ai-c " :class="config.items[slide].content_position=='left'?'jc-fs':config.items[slide].content_position=='center'?'jc-c':'jc-fe'">
                      <div class="caption" :class="config.items[slide].content_position=='center'?'d-f ai-c fd-c  jc-c':''">
                        <h1  :style="`color:${config.items[slide].title_color}`" v-if="config.items[slide].show_title" >{{config.items[slide].title}}</h1>
                        <p :style="`color:${config.items[slide].description_color}`" v-if="config.items[slide].show_description">{{config.items[slide].description}}</p>
                        <nuxt-link class="w-f" :to="config.items[slide].button.link" :class="config.items[slide].content_position=='center'?'d-f ai-c fd-c  jc-c':''">
                          <si-button class="py-3 w-f ta-c d-f fd-c ai-c jc-c p-r t-1 w-f button_slider" v-if="config.items[slide].button.show_button" :text="config.items[slide].button.button_text" :type="config.items[slide].button.type" :color="config.items[slide].button.color" :background="config.items[slide].button.background"   />
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
            </div>
            <div class="controls" v-if="config.show_nextprev">
                    <si-button aria-label="Prev" color="#111" @click="prev()"  iconColor="#111" icon="next" class="my-auto prev p-a l-0 z-999 b-t t-1/3 d-f ai-c"  />
                    <si-button aria-label="Next"  color="#111"  @click="next()" iconColor="#111" icon="next" class="my-auto next p-a r-0 z-999 b-t t-1/3 d-f ai-c"  />
            </div>
            <div class="indicator" v-if="config.show_pagenation">
              <div class="increment"   v-for="(cercle,index) in slide_length " :key="cercle+11" @click="getImgcercl(index)" :class="{'active':index==0}"  ></div>
            </div>
            <!-- </nuxt-link > -->
        </div>
      </div>
    </section>
</template>

<script>
export default {
  props:{
    config:{type:Object}
  },
  data() {
    return {
      index:0,
      slides:null,
      timeOut:null,
      settings:null,
      slide_length:0,
      slide_size:null
    }
  },
  async fetch(){
    this.settings= await this.$settings()
    this.slide_length=Object.keys(this.config.items).length
  },
  async mounted() {
    this.settings= await this.$settings()
      this.onResize()
    this.slide_length=Object.keys(this.config.items).length
    this.$nextTick(()=>{
      if(this.slide_length>0 && !this.config.show ){
        this.slides = document.querySelectorAll(".slidde");
        this.circle = document.querySelectorAll(".increment");
        this.nextSlide()
        this.autoPlay()
       this.timeOut=setInterval(this.autoPlay,4000);
      }
    })
  },
  methods: {
    changeSlide(){
      this.$nextTick(()=>{
        for(let i=0; i<this.slide_length; i++){
           this.slides[i].classList.remove("active");
           if(this.circle.length!=0)this.circle[i].classList.remove("active");
        }
        this.slides[this.index].classList.add("active");
        if(this.circle.length!=0) this.circle[this.index].classList.add("active");

      })
   },
      nextSlide(){
      if(this.index==this.slide_length-1){
      	this.index=0;
      }
      else{
      	this.index++;
      }
      this.changeSlide();
   },
    autoPlay(){
      this.nextSlide();
  },
  prev(){
    if(this.index==0){
      this.index=this.slide_length-1
    }else this.index--;
      clearInterval(this.timeOut)
      this.changeSlide();
      this.timeOut=setInterval(this.autoPlay,4000);
  },
  next(){
      clearInterval(this.timeOut)
      this.nextSlide()
      this.timeOut=setInterval(this.autoPlay,4000);
  },
  getImgcercl(index){
        this.index=index
      clearInterval(this.timeOut)
      this.changeSlide();
      this.timeOut=setInterval(this.autoPlay,4000);
  },
  onResize() {
      if (window.innerWidth > 750) {
        this.slide_size = this.config.desktop_height;
      } else {
        if(window.innerWidth > 500 && window.innerWidth<750)
        this.slide_size = this.config.tablet_height;
        else this.slide_size = this.config.mobile_height;
      }
  },
  },
}
</script>

<style scoped>
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

.container {
  max-width: 1300px;
  width: 100%;
  padding: 0 80px;
  margin: auto;
}
.home {
  background: #fbfbfd;
}
.home .slidde {
  animation: slide 3s ease;
}
.home .slidde.active {
  display: flex;
}
@keyframes slide {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.home .caption h1 {
  font-size: 42px;
  margin: 0;
}

.home .slidde.active .caption h1 {
  opacity: 0;
  animation: captionText 0.3s ease forwards;
  animation-delay: 1s;
}
.home .caption p {
  font-size: 25px;
  margin: 15px 0 30px;
}

.home .slidde.active .caption p {
  opacity: 0;
  animation: captionText 0.5s ease forwards;
  animation-delay: 1.2s;
}
.button_slider{
  max-width: 200px;
  animation: btn_slider 2s ease forwards;
}

@keyframes btn_slider {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  70%{
        opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes captionText {
  0% {
    opacity: 0;
    transform: translateY(-80px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
.home .controls img {
  width: 60%;
  height: 60%;
}
.home .indicator {
  position: absolute;
  left: 50%;
  bottom: 30px;
  z-index: 2;
  transform: translateX(-50%);
}

.increment {
  display: inline-block !important;
  width: 15px !important ;
  height: 15px !important ;
  background-color: #ffffff !important ;
  border-radius: 50% !important ;
  text-align: center !important ;
  line-height: 25px !important ;
  margin: 0 3px !important ;
  cursor: pointer !important ;
}
.increment.active {
  background-color: #247cff !important;
}






@media (max-width: 1000px) {
  .caption {
    padding: 0 0 0 20px;
  }
}
@media (max-width: 900px) {

  .home .slidde {
    height: 10vh;
  }
  .container {
    padding: 0 40px;
    margin: auto;
  }
}

@media (max-width: 870px) {
  .home .caption h1 {
    font-size: 37px;
  }
  .home .caption p {
    font-size: 22px;
  }
  .home .slidde {
    height: 75vh;
  }
}
@media (max-width: 800px) {
  .home .slidde {
    height: 70vh;
  }
}
@media (max-width: 590px) {

  .home .caption h1 {
    font-size: 33px;
  }
  .home .caption p {
    font-size: 23px;
  }
  .home .slidde {
    height: 60vh;
  }
}

@media (max-width: 565px) {
  .home .slidde {
    height: 68vh;
  }
  .home .caption h1 {
    font-size: 30px;
  }
  .home .caption p {
    font-size: 20px;
  }
}
@media (max-width: 500px) {
  .home .slidde {
    height: 60vh;
  }
  .home .caption h1 {
    font-size: 28px;
  }
  .home .caption p {
    font-size: 19px;
  }
}
@media (max-width: 450px) {
  .button_slider{
    max-width: 100px;
    font-size: 10px;
  }
  .home {
    height: 45vh !important;
    background-size: 100% 80%;
  }
  .container {
    padding: 0 17px;
    margin: auto;
  }
  .home .slidde {
    height: 45vh;
  }
  .home .caption h1 {
    font-size: 23px;
  }
  .home .caption p {
    font-size: 15px;
    margin: 13px 0 15px;
  }
  .caption {
    padding: 0 0 0 20px;
  }
  .home .controls .prev,
  .home .controls .next {
    width: 30px;
    line-height: 33px;
    height: 35px;
  }
}

</style>
