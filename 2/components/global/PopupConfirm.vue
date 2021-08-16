<template>
  <div v-if="settings">
    <div class="show-model p-f l-0 r-0 t-0 b-0 zi-6 " v-if="confirmpop" @click="closePop()"></div>
    <div class="b-w  zi-9 jqbox_innerhtml p-f br-3 " v-if="confirmpop">
      <div class="d-f px-5 ai-c jc-sb mt-5">
        <div class="lg-col-2">
           <si-image alt="Confirmation message" src="https://storeno.b-cdn.net/stores/8-2021/1628518652585.png" />
        </div>
        <div class="lg-col-9">
          <h2 class=""> {{settings.text.title}}</h2>
          <p>{{settings.text.message}}</p>
        </div>
      </div>
        <div class="w-f bar b-g"></div>
        <div class="py-2 px-5 d-f jc-sb ">
          <si-button :text="settings.buttons.confirm.text" :type="settings.buttons.confirm.type" class="px-3" :color="settings.buttons.confirm.color" :background="settings.buttons.confirm.background" @click="confimPop()"/>
          <si-button :text="settings.buttons.close.text" :type="settings.buttons.close.type" class="px-3" :color="settings.buttons.close.color" :background="settings.buttons.close.background" @click="closePop()"/>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    confirm:{type:Boolean,default:false},
    settings:{type:Object}
  },
  data(){
    return{
      confirmpop:false
    }
  },
  mounted(){
  },
  watch:{
    confirm:function(val){
      this.confirmpop=val
    }
  },
  methods:{
    closePop(){
      this.$emit('closePp','close')
    },
    confimPop(){
      this.$emit('closePp','confirm')
    }
  }
}
</script>

<style scoped>
.bar{
  height: 1px;
}
.jqbox_innerhtml {
  border-top: 6px solid var(--primary-color);
  width: 500px;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -250px;
}

.show-model{
  background: #11111162;
}
</style>
