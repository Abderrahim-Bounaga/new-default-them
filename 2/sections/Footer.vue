<template>
  <div class="pt-10 w-f fot  " :style="background" v-if="settings && !settings.show">
    <app-loader placement="BEFORE_FOOTER"/>
    <div class="container" >
      <div class="d-f fw-w">
        <div v-if="settings.about.show_about" class="px-4" :class="settings.about.size=='1/1'?'lg-col-12':settings.about.size=='1/2'?'lg-col-6 md-col-12':settings.about.size=='1/3'?'lg-col-5 md-col-6 sm-col-12':settings.about.size=='1/4'?'lg-col-3 md-col-4 sm-col-6 sx-col-12':''">
          <h2 class="f-c" >{{settings.about.title}}</h2>
          <si-logo ratio="2:1" class="logo" :src="settings.about.content.logo ? settings.about.content.logo.src : 'https://storeno.b-cdn.net/stores/7-2021/1626690015596.png'" />
          <p class="f-c" v-html="settings.about.content.text"></p>
        </div>
        <div v-if="settings.menu.show && settings.menu.item" class="px-2" :class="settings.menu.size=='1/1'?'lg-col-12':settings.menu.size=='1/2'?'lg-col-6 md-col-12':settings.menu.size=='1/3'?'lg-col-3 md-col-4 sm-col-6 sx-col-12':settings.menu.size=='1/4'?'lg-col-2 md-col-3 sm-col-6 sx-col-12':''">
          <h2 class="f-c">{{settings.menu.title}}</h2>
            <si-menu :color="settings.color"   :headerMenu="settings.menu.item" :type="false" :defaultChilde="false" :paddingChilde="true" />
        </div>
        <div v-if="settings.second_menu.show && settings.second_menu.item" class="px-2" :class="settings.second_menu.size=='1/1'?'lg-col-12':settings.second_menu.size=='1/2'?'lg-col-6  md-col-12':settings.second_menu.size=='1/3'?'lg-col-3  md-col-4 sm-col-6 sx-col-12':settings.second_menu.size=='1/4'?'lg-col-2 md-col-3 sm-col-6 sx-col-12':''">
          <h2 class="f-c">{{settings.second_menu.title}}</h2>
            <si-menu :color="settings.color"   :headerMenu="settings.second_menu.item" :type="false" :defaultChilde="false" :paddingChilde="true" />
        </div>
         <div class="px-4" :class="settings.contact.size=='1/1'?'lg-col-12':settings.contact.size=='1/2'?'lg-col-6 md-col-12':settings.contact.size=='1/3'?'lg-col-4 md-col-6 sm-col-12':settings.contact.size=='1/4'?'lg-col-3 md-col-4 sm-col-6 sx-col-12':''">
          <h2 class="f-c">{{settings.contact.title}}</h2>
          <div class="d-f ai-c">
            <span><svg version="1.1" id="Capa_1" fill="#ffffff" width="19" height="15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <path d="M464.927,300.429L427.155,206l37.772-94.429c1.849-4.622,1.284-9.859-1.506-13.98C460.63,93.469,455.977,91,451,91H276V56 c0-8.284-6.716-15-15-15H76V15c0-8.284-6.716-15-15-15S46,6.716,46,15c0,62.717,0,428.766,0,482c0,8.284,6.716,15,15,15 s15-6.716,15-15V271h120v35c0,8.189,6.673,15,15,15h240c4.978,0,9.63-2.469,12.421-6.591 C466.212,310.288,466.776,305.051,464.927,300.429z M246,241c-17.178,0-151.463,0-170,0V71h170C246,88.178,246,222.463,246,241z M247.213,291l24.391-24.391C274.47,263.745,276,259.804,276,256V121h152.845l-31.772,79.429c-1.43,3.576-1.43,7.566,0,11.143 L428.845,291H247.213z"/></svg></span>
            <span class="mx-2 f-c"> {{settings.contact.location}} </span>
          </div>
          <div class="d-f ai-c">
            <span><svg height="15" viewBox="0 0 512 512" fill="#ffffff" width="19" xmlns="http://www.w3.org/2000/svg">
            <g id="Smartphone"> <path d="m352 8h-192a40.045 40.045 0 0 0 -40 40v416a40.045 40.045 0 0 0 40 40h192a40.045 40.045 0 0 0 40-40v-416a40.045 40.045 0 0 0 -40-40zm-41.758 16-4.8 24h-98.883l-4.8-24zm65.758 440a24.027 24.027 0 0 1 -24 24h-192a24.027 24.027 0 0 1 -24-24v-416a24.027 24.027 0 0 1 24-24h25.441l6.714 33.569a8 8 0 0 0 7.845 6.431h112a8 8 0 0 0 7.845-6.431l6.714-33.569h25.441a24.027 24.027 0 0 1 24 24z"/> <path d="m208 456h-48a8 8 0 0 0 0 16h48a8 8 0 0 0 0-16z"/> <path d="m240 456h-8a8 8 0 0 0 0 16h8a8 8 0 0 0 0-16z"/> </g> </svg></span>
            <span class="mx-2 f-c"> {{settings.contact.phone}} </span>
          </div>
          <div class="d-f ai-c">
            <span><svg version="1.1" id="Capa_1" width="15" height="22" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
             <path d="M467,61H45C20.218,61,0,81.196,0,106v300c0,24.72,20.128,45,45,45h422c24.72,0,45-20.128,45-45V106 C512,81.28,491.872,61,467,61z M460.786,91L256.954,294.833L51.359,91H460.786z M30,399.788V112.069l144.479,143.24L30,399.788z M51.213,421l144.57-144.57l50.657,50.222c5.864,5.814,15.327,5.795,21.167-0.046L317,277.213L460.787,421H51.213z M482,399.787 L338.213,256L482,112.212V399.787z"/>  </svg></span>
            <span class="mx-2 f-c"> {{settings.contact.email}} </span>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-grad">
      <div class="container d-f fw-w ai-c jc-sb py-3  ">
        <div class="lg-col-4 sm-col-12">
          <si-socialMedia class="lg-col-6" v-if="settings.social_media.show_social_media" :settings="settings.social_media" :background="['transparent']" :iconColor="settings.social_media_color" fontSize="fs-2" />
        </div>
        <div class=" lg-col-4 sm-col-12 ">
          <p class="f-c ta-c">{{settings.copy_right.text}}</p>
        </div>
        <div class="lg-col-4 d-f ai-c jc-c fd-c">
          <div class="d-f ai-c jc-sa w-f fw-w ">
            <div class="  d-f lg-col-2 py-1 b-w  pay"  v-show="settings.payment_methods.show_cash_on_delivery">
              <si-image fit="contain" ratio="3:1"  src="https://storeino.b-cdn.net/assets/others/banktransfer.png" alt="Cash on delivery" />
            </div>
            <div class="  d-f lg-col-2 py-1 b-w  pay" v-show="settings.payment_methods.show_payPal">
               <si-image fit="contain" ratio="3:1"  src="https://storeino.b-cdn.net/assets/others/paypal.png" alt="PayPal" />
            </div>
            <div class="  d-f lg-col-2 py-1 b-w  pay" v-show="settings.payment_methods.show_cash_cashPlus">
              <si-image fit="contain" ratio="3:1"  src="https://storeno.b-cdn.net/stores/6-2021/1623317244191.png" alt="CashPlus" />
            </div>
            <div class="  d-f lg-col-2 py-1 b-w  pay" v-show="settings.payment_methods.show_cash_tashilat">
               <si-image fit="contain" ratio="3:1"  src="https://storeino.b-cdn.net/assets/others/tashilat.png" alt="Tashilat" />
            </div>
            <div class="  d-f lg-col-2 py-1 b-w  pay" v-show="settings.payment_methods.show_cash_amanty">
              <si-image fit="contain" ratio="3:1"  src="https://storeno.b-cdn.net/stores/6-2021/1623317136116.png" alt="Amanty" />
            </div>
            <div class="  d-f lg-col-2 py-1 b-w  pay" v-show="settings.payment_methods.show_cash_visa_mastercard">
              <si-image fit="contain" ratio="3:1"  src="https://storeino.b-cdn.net/assets/others/visa-and-mastercard.png" alt="Visa/Master Card" />
            </div>
          </div>
      </div>
      </div>
    </div>
      <app-loader placement="AFTER_FOOTER"/>
  </div>
</template>

<script>
export default {
 props:{
    settings:{type:Object}
  },
  data() {
    return {

    }
  },
  mounted() {
    var date=new Date();
    this.settings.copy_right.text=this.settings.copy_right.text.replace('__YEAR__',date.getFullYear())
  },
  computed:{
    background:function(){
      if(this.settings.background.background_image){
        return {'background-image':`linear-gradient(to right,#111111c2,#111111c1), url(${this.settings.background.image ? this.settings.background.image.src : ''})`,'background-size': `100% 100% !important`}
      }else{
        if(this.settings.background.background_color && this.settings.background.background_color.length>0){
        if(this.settings.background.background_color.length==1){
             return {'background':`${this.settings.background.background_color[0]}`}
        }
        else{
            return {'background':`linear-gradient(45deg, ${this.settings.background.background_color.join(',')})`}
        }
      }
      }
    }
  }
}
</script>

<style scoped>
.pay{
    border-radius: 3px;
}
.pt-10{
  padding-top: 10px;
}
.bg-grad{
  margin-top: 20px;
  background: #00000047;
}
.background{
 background-image:linear-gradient(to right,#111111c2,#111111c1), url(https://storeno.b-cdn.net/stores/6-2021/1622760224093.jpeg);
}
/* .pr-c {
    color: var(--primary_color);
} */
.logo{
  width: 150px;
}
</style>
