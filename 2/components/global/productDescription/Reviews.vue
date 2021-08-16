<template>
<div v-if="reviews" class="mt-80">
    <div class="p-3 mb-20 shadow br-3 w-f d-f fw-w" v-for="review in reviews" :key="review._id">
      <div class="d-f fd-c ai-c ta-c lg-col-3 b-right sm-col-12">
        <div class="br-f o-h acount d-f ai-c">
          <si-button icon="acount" />
        </div>
        <div>
        <h3 class="mx-2 name"> {{review.customer.firstname}} {{review.customer.lastname}}</h3>
        <div class="rating d-ib p-r"></div>
        <div class="c-grey">
          <span> {{ review.createdAt.split("T")[0] }}</span>
        </div>
        </div>
      </div>
      <div class="px-3 lg-col-9 sm-col-12">
        <div>
          <p class="c-grey">{{review.content}}</p>
        </div>
        <div class="my-2 d-f " v-if="numberItem">
          <si-slick  background="#fafafa" :slidesToShow="numberItem"  >
              <div class="width_carousel" v-for="(image,index) in review.images" :key="index*2">
                <div class="mx-3 br-6 p-r o-h d-f ai-c jc-c shdw" @click="showImage(image)" >
                    <si-image ratio="1:1" fit="cover" :src="image" alt="Carousel image" />
                    <div class="p-a w-f h-f l-0 r-0 b-0 t-0 mod"></div>
                </div>
              </div>
          </si-slick>
          <transition name="fade">
            <div class="p-f d-f ai-c jc-c t-0 zi-9 r-0 b-0 l-0 modal-container " @click="showImage()"  v-if="showModule">
              <div class="  m-auto show-image" >
                 <si-image ratio="2:1" class="br-3 o-h" fit="contain" :src="imageShow" alt="Slideshow image"  />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  props:{config:Object},
  data() {
    return {
      seting:{
        images:[
          'data:image/jpeg;base64,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',
          'data:image/jpeg;base64,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',
          'https://www.junglescout.com/wp-content/uploads/2020/06/homepage-laptop-floating-mockup.png',
          'https://content.fortune.com/wp-content/uploads/2018/04/iphone8_iphone8plus_product_red_front_back_041018-e1523280198726.jpg'
        ]
      },
      reviews:null,
      numberItem:null,
      showModule:false,
      imageShow:null
    }
  },
  mounted(){
    this.reviews=this.config.review.data
         if (window.innerWidth > 750) {
        this.numberItem = 9;
      } else {
        if(window.innerWidth > 500 && window.innerWidth<750)
        this.numberItem =4;
        else if(window.innerWidth > 450 && window.innerWidth<500)
         this.numberItem = 3;
         else this.numberItem = 2;
      }
  },
  methods:{
    showImage(image){
      this.imageShow=image
      this.showModule=!this.showModule
    }
  }
}
</script>

<style lang="scss" scoped>
.show-image{
  width: 70%;
}

@media (max-width:450px){
.show-image{
  width: 90%;
}
}

.modal-container{
  background: #0000001b;
   &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }
  &.fade-enter-active, &.fade-leave-active {
    transition: opacity .3s;
  }
}
.mb-20{
  margin-bottom: 30px;
}
.mt-80{
  margin-top: 80px;
}
.b-right{
  border-right: 1px solid #ccc;
}
@media (max-width:750px){
  .b-right{
  border-right: 0px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
}
.acount{
    width: 43px;
    height: 40px;
}
.name{
  color: #525151;
}
  .rating{
    font-size: 2rem;
  }
  .rating::before{
    content: "\1f7ca\1f7ca\1f7ca\1f7ca";
    color: #f2f2f2;
  }
  .rating::after{
    content: "\1f7ca\1f7ca\1f7ca\1f7ca";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 63%;
    overflow: hidden;
    color: #FFE793;
  }
  .c-grey{
    color: #aaa;
  }

</style>
