<template>
  <div class="h-s-2/3 d-f">
       <div class="  lg-col-6 md-col-7 sm-col-10 sx-col-12 h-1/2 d-f fd-c ai-c jc-c m-auto  " >
       <h1 class="err">404</h1>
        <h2 class=" lg-col-7 md-col-8 sm-col-9 sx-col-12 ta-c">{{settings.title}}</h2>
        <p class="my-1 lg-col-7 md-col-8 sm-col-9 sx-col-12 ta-c">{{settings.message}}</p>
        <nuxt-link to="/">
         <si-button  :text="settings.button.text" :type="settings.button.type" :color="settings.button.color" :background="settings.button.background"  class="py-3 ta-c d-f fd-c ai-c jc-c p-r t-1 " />
        </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    settings:{type:Object}
  },

}
</script>

<style scoped>
.err{
    color: var(--primary-color);
    font-size: 200px;
    font-weight: 500;
    line-height: 1.1em;
    letter-spacing: 10px;
}
</style>
