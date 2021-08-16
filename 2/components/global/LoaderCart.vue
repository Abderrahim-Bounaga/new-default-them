<template>
     <div class="b-w  p-a t-0 l-0 r-0" v-if="showLoader"  >
        <div class="d-f fw-w">
          <div class="w-f" v-for="i in numberItems" :key="i+'loading'">
            <div class="m-3 d-f jc-sb">
              <div class="global p-r o-h card br-10 lg-col-2" >
                  <div class="h-5 p-a tr-1/2 t-0 b-0 br-10 global-anim anim"></div>
              </div>
              <div class="lg-col-10 mx-3">
              <div class="h-5 global p-r o-h br-10 my-2 lg-col-6">
                  <div class="h-10 anim-pro t-0 b-0 global-anim tr-1/2 p-a"></div>
              </div>
              <div class="h-5 global p-r o-h br-10 name">
                  <div class="h-10 anim-pro global-anim tr-1/2 p-a t-0 b-0"></div>
              </div>
              <div class="h-5 global p-r o-h br-10 name">
                  <div class="h-10 anim-pro global-anim tr-1/2 p-a t-0 b-0"></div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props:{
    showLoader:{type:Boolean,default:false},
    numberItems:{type:Number,default:1}
  },
  mounted() {
  },

}
</script>


<style lang="scss" scoped>
.global{
    background: #eeeded;
}
.card{
    height: 100px;
}
.global-anim{
    width: 250px;
    background: linear-gradient(to right,#eeeded,#ffff,#eeeded);
    animation: anim 1s infinite;
}
.anim{
    height: 250px;

}
.name{
margin-top: 15px;
}
@keyframes anim{
    0%{
        left: -100%;
        opacity: 1;
    }
    98%{
      left: 100%;
    }
    99%{
      opacity: 0;
    }
    100%{
        left: -100%;
    }
}
.retate{
  transform: rotate(-90deg);
}
.loader {
  width: 100%;
  height: 100vh;
  margin: 0;
  background-color: #ffffff9c;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  div {
  width: 8vmax;
  height: 8vmax;
  border-right: 4px solid #262525;
  border-radius: 100%;
  animation: spinRight 800ms linear infinite;

  &:before, &:after {
    content: '';
    width: 6vmax;
    height: 6vmax;
    display: block;
    position: absolute;
    top: calc(50% - 3vmax);
    left: calc(50% - 3vmax);
    border-left: 3px solid #262525;
    border-radius: 100%;
    animation: spinLeft 800ms linear infinite;
  }

  &:after {
    width: 4vmax;
    height: 4vmax;
    top: calc(50% - 2vmax);
    left: calc(50% - 2vmax);
    border: 0;
    border-right: 2px solid #262525;
    animation: none;
  }
}

@keyframes spinLeft {
  from {transform:rotate(0deg);}
  to {transform:rotate(720deg);}
}

@keyframes spinRight {
  from {transform:rotate(360deg);}
  to {transform:rotate(0deg);}
}
}
</style>

