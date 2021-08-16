<template>
  <div class="px-3 py-2 p-a d-f ai-c jc-sb icons br-7 tr-1/2" :style="showActions ? 'top:50%;opacity:1;':''" >
   <div class="d-f fd-c ai-c">
    <div class="p-2 action">
      <nuxt-link to="/">
        <div class="d-f ai-c jc-c icon-svg">
          <svg
            id="i-cart"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"

            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#353333"
            stroke-width="1"
          >
            <path d="M6 6 L30 6 27 19 9 19 M27 23 L10 23 5 2 2 2" />
            <circle cx="25" cy="27" r="2" />
            <circle cx="12" cy="27" r="2" />
          </svg>
        </div>
      </nuxt-link>
    </div>
   </div>
   <div class="d-f fd-c ai-c">
    <div class="p-2 action">
      <nuxt-link to="/">
        <div class="d-f ai-c jc-c icon-svg">
          <svg
            version="1.1"
            width="24px"
            class="love"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 50 50"
            style="enable-background: new 0 0 50 50"
            xml:space="preserve"
            fill="#353333"
            stroke-width="1"
          >
            <g id="Layer_1">
              <path
                d="M45.281,25.915c4.949-5.004,4.949-13.146,0-18.15C42.881,5.337,39.688,4,36.292,4c-0.001,0-0.001,0-0.001,0
              c-3.396,0-6.59,1.337-8.991,3.765L25,10.09l-2.3-2.325C20.299,5.337,17.106,4,13.709,4c-3.396,0-6.589,1.337-8.99,3.765
              c-4.949,5.004-4.949,13.146,0,18.15L25,46.422L45.281,25.915z M6.141,9.171C8.163,7.126,10.852,6,13.709,6
              c2.858,0,5.547,1.126,7.569,3.171L25,12.935l3.722-3.764C30.744,7.126,33.433,6,36.291,6c2.858,0,5.546,1.126,7.568,3.171
              c4.183,4.229,4.183,11.109,0,15.338L25,43.578L6.141,24.509C1.958,20.28,1.958,13.399,6.141,9.171z"
              />
            </g>
          </svg>
        </div>
      </nuxt-link>
    </div>
   </div>
   <div class="d-f fd-c ai-c">
    <div class="p-2 action">
      <nuxt-link to="/">
        <div class="d-f ai-c jc-c icon-svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#353333"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>
      </nuxt-link>
    </div>
   </div>
  </div>
</template>

<script>
export default {
  props:['showActions']
}
</script>
<style lang="scss" scoped>
.icons {
  background: #ffffffc7;
  width: 60%;
  left: 50%;
  top: 55%;
  opacity: 0;
  transform: translate(-50%, -50%);
  color: #353333;
}
.action{
  transition: all .3s;
  border-radius: 50%;
}
.action:hover{
  background: #80B82D;
  svg{
    stroke: #fff;
  }
  .love{fill: #fff;}
}
.icon-svg{

}
</style>
