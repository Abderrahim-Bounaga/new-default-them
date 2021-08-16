<template>
   <div class="imge-empty  lg-col-6 md-col-7 sm-col-10 sx-col-12 h-1/2 d-f fd-c ai-c jc-c m-auto"  v-if="settings">
        <img
        class=" w-1/3 p-r"
          src="https://storeno.b-cdn.net/stores/3-2021/1614778448307.png"
          alt="Empty Cart"
        />
        <h2 class="my-3 lg-col-7 md-col-8 sm-col-9 sx-col-12 ta-c">{{settings.title}}</h2>
        <p class="my-3 lg-col-7 md-col-8 sm-col-9 sx-col-12 ta-c">{{settings.message}}</p>
        <nuxt-link :to="settings.button.link">
          <si-button  :text="settings.button.text" :type="settings.button.type" :color="settings.button.color" :background="settings.button.background"  class="py-3 ta-c d-f fd-c ai-c jc-c p-r t-1 " />
        </nuxt-link>
   </div>
</template>

<script>
export default {
  props:{
    settings:{type:Object}
  },
  mounted(){
  }
}
</script>

<style scoped>

 .imge-empty img {
  opacity: 0.7;
  animation: HUHU infinite 2s ease-in-out;
}
@keyframes HUHU {
  50% {
    transform: translateY(10px);
  }
}
</style>
