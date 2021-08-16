<template>
  <div v-if="settings" class=" bg">
    <div class="container d-f fw-w ai-c jc-sb">
      <si-socialMedia v-if="settings.header_top.social_media.show_social_media"  fontSize="fs-2" :background="background" :settings="settings.header_top.social_media"   />
      <div :class="{'fw-b':settings.header_top.message_bold}" v-if="settings.header_top.show_message" v-html="settings.header_top.message"></div>

      <div class="d-f">
        <div class="d-f ai-c p-r c-p"  v-if="settings.header_top.show_language && language && $store.state._current_language.code">
          <div @click="showLang()">
           <span>
            {{language}}
           </span>
           <span class="mx-2" v-if="$store.state._current_language">
            {{$store.state._current_language.code}}
           </span>
          </div>
            <div class="p-a zi-9 langauge t-10  lang" v-if="storeLanguages && showLanguage">
              <div class="b-w  t-0  px-10 py-5 br-6" >
                <div class=" br-10 p-a r-3 c-p t-0" @click.stop="showLang()" >X</div>
                <ul>
                  <li class="ls-n" v-for="(lang,index) in storeLanguages.store_languages" :key="index" >
                    <label :for="'lang__'+index" class="d-f ai-c" >
                      <si-input :id="'lang__'+index" name="lang" @input="getLanguage(lang)"  type="radio" />
                      <span class="mx-2">{{lang.name}}</span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
        </div>
        <nuxt-link to='/account/orders' v-if="settings.header_top.show_account">
          <si-button  :background="background" text="Account" class=""  color="#323232"   iconColor="#323232" icon="acount" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    settings:{type:Object}
  },
  data() {
    return {
       background:["transparent"],
       language:null,
       storeLanguages:null,
       showLanguage:false
    }
  },
async mounted() {
  this.storeLanguages=await this.$settings()
  this.language=this.$store.state._current_language.name
},
async fetch(){

},
methods:{
  showLang(){
    this.showLanguage=!this.showLanguage
  },
  getLanguage(lang){
    console.log('test')
    this.language=lang.name
    this.$store.state._current_language.code=lang.code
    window.location=window.location.origin+`?lang=${lang.code}`
    this.showLanguage=!this.showLanguage
  }
}
}
</script>

<style lang="scss" scoped>
.bg{
  background: #f5f5f5f3 ;
}
.lang{
  left: -43px;
  box-shadow: 1px 1px 28px 1px #ececec;
}
.langauge{
  animation: showLangauge 0.3s  ;
}
.modal-container{
  background: #00000062;
   &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }
  &.fade-enter-active, &.fade-leave-active {
    transition: opacity .3s;
  }
}
@keyframes showLangauge {
  0%{
    top: -100px;
  }
  100%{
        top: 2.50em;
  }
}
</style>
