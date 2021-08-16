<template>
<button :disabled="disabled" class="button p-2 d-f ai-c c-p br-3 b-n o-n btn py-3 w-f ta-c my-2 d-f fd-c ai-c jc-c p-r t-1 show-addtocart" :class="{'loading':lunchAnimtion}" :style="style" @click="addtocart()">
    <span class="fw-500 d-b p-r" :style="{'color': textcolor,'font-size':fontSize+'px','font-weight':fontWeight}">{{text}}</span>
    <div class="cart">
        <svg viewBox="0 0 36 26">
            <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
            <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
        </svg>
    </div>
</button>
</template>

<script>
export default {
    data() {
    return {
      textcolor:null,
      lunchAnimtion:false
    }
  },
    props:{
    type:{type:String,default:"border"},
    text:{ type:String,default:"add to cart" },
    background:{type:Array,default:()=>['#2196F3']},
    color:{type:String,default:"#ffffff"},
    textAling: {type: String, default:"center"},
    disabled:{type:Boolean,default:false},
    fontSize:{type:Number,default:16},
    fontWeight:{type:Number,default:400}

  },
    computed: {
    style:function(){
      if(this.background && this.background.length>0){
        if(this.background.length==1)
        {
          if(this.type=="border"){
            this.textcolor=this.background[0]
            return {'border':`2px solid ${this.background[0]}`,'--background':`${this.color}`,'--cart':`${this.background[0]}`,'--tick':`${this.color}`}
          }
           else{
             this.textcolor=this.color
             return {'--background':`${this.background[0]}`,'--cart':`${this.color}`,'--tick':`${this.background[0]}`}
           }
        }
       else{
          if(this.type=="border"){
            this.textcolor=this.background[0]
             return {'border':`2px solid`,'border-image-slice':`1`,'border-width':`2px`,'border-image-source': `linear-gradient(45deg, ${this.background.join(',')});`}
          }else{
            this.textcolor=this.color
            return {'background':`linear-gradient(45deg, ${this.background.join(',')})`}
          }
        }
      }
    }
  },
  mounted(){
  },
  methods:{
    addtocart(){
      this.$emit('click')
      if(!this.lunchAnimtion){
        this.lunchAnimtion=true
          setTimeout(() => this.lunchAnimtion=false, 2500);
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.button {
    // --background: #362A89;
    // --text: #fff;
    --cart: #fff;
    --tick: var(--background);
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    color: var(--text);
    background: var(--background);
    transform: scale(var(--scale, 1));
    transition: transform .4s cubic-bezier(.36, 1.01, .32, 1.27);
    &:active {
        --scale: .95;
    }
    span {
        font-size: 14px;
        padding-left: 24px;
        margin-left: -8px;
        transform: translateY(0px);
        transition: transform .3s ease;
        // &:before,
        // &:after {
        //     content: '';
        //     width: var(--w, 2px);
        //     height: var(--h, 14px);
        //     border-radius: 1px;
        //     position: absolute;
        //     left: var(--l, 8px);
        //     top: var(--t, 6px);
        //     background: currentColor;
        //     transform: scale(.75) rotate(var(--icon-r, 0deg)) translateY(var(--icon-y, 0px));
        //     transition: transform .65s ease .05s;
        // }
        &:after {
            content: "";
            width: 2px;
            height: 14px;
            border-radius: 1px;
            position: absolute;
            left: 8px;
            top: 0px;
            background: currentColor;
            transform: scale(.75) rotate( 90deg) translateY(var(--icon-y, 0px));
            transition: transform .65s ease .05s;
        }
        &:before {
            content: "";
            width: 2px;
            height: 14px;
            border-radius: 1px;
            position: absolute;
            left: 8px;
            top: 0px;
            background: currentColor;
            transform: scale(.75) rotate( 0deg) translateY(var(--icon-y, 0px));
            transition: transform .65s ease .05s;
        }
        // &:after {
        //     --w: 14px;
        //     --h: 2px;
        //     --l: 2px;
        //     --t: 12px;
        // }
    }
    .cart {
        position: absolute;
        left: -10px;
        top: 50%;
        margin: -13px 0 0 -18px;
        transform-origin: 12px 23px;
        transform: rotate(-18deg);
        &:before,
        &:after {
            content: '';
            position: absolute;
        }
        &:before {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            box-shadow: inset 0 0 0 2px var(--cart);
            bottom: 0;
            left: 9px;
            filter: drop-shadow(11px 0 0 var(--cart));
        }
        &:after {
            width: 16px;
            height: 9px;
            background: var(--cart);
            left: 9px;
            bottom: 7px;
            transform-origin: 50% 100%;
            transform: perspective(4px) rotateX(-6deg) scaleY(var(--fill, 0));
            transition: transform 1.2s ease var(--fill-d);
        }
        svg {
            z-index: 1;
            width: 36px;
            height: 26px;
            display: block;
            position: relative;
            fill: none;
            stroke: var(--cart);
            stroke-width: 2px;
            stroke-linecap: round;
            stroke-linejoin: round;
            polyline {
                &:last-child {
                    stroke: var(--tick);
                    stroke-dasharray: 10px;
                    stroke-dashoffset: var(--offset, 10px);
                    transition: stroke-dashoffset .4s ease var(--offset-d);
                }
            }
        }
    }
    &.loading {
        --scale: .95;
        --span-y: -32px;
        --span-ym: 32px;
        --icon-r: 180deg;
        --fill: 1;
        --fill-d: .8s;
        --offset: 0;
        --offset-d: 1.73s;
         span {
           &:after {
            transform: scale(.75) rotate( 180deg) translateY(var(--icon-y, 0px));
           }
           &:before {
            transform: scale(.75) rotate( 90deg) translateY(var(--icon-y, 0px));
           }
         }
        .cart {
            animation: cart 2.1s linear forwards .2s;
        }
        span{
            animation: text 2.3s linear forwards .2s;
        }
    }
}

@keyframes text {
  0%{
       transform: translateY(0px);
  }
  10%{
       transform: translateY(var(--span-y, 0));
  }
  15%{
       opacity: 0;
  }
  20%, 30%,60%,70%,80%{
       transform: translateY(var(--span-ym, 0));
       opacity: 0;
  }
  86%{
       transform: rotate(0deg)  translateY(var(--span-ym, 0));
       opacity: 1;
  }
  90%{
       opacity: 1;
  }
   100%{
       transform: none;
  }
}
@keyframes cart {
  12.5%{
   transform: rotate(-18deg);
  }
      25%,
    45%,
    55%,
    75% {
    left: 50%;
     transform:rotate(0deg);
    }
    50% {
        transform: scale(.9);
    }
    87.5% {
      left: 49%;
     transform:rotate(-18deg) ;
     }
  100%{
    left: 130%;
   transform: rotate(0deg);
  }
}

html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
}

* {
    box-sizing: inherit;
    &:before,
    &:after {
        box-sizing: inherit;
    }
}

// Center & dribbble
body {
    min-height: 100vh;
    display: flex;
    font-family: 'Inter UI', 'Inter', Arial;
    justify-content: center;
    align-items: center;
    background: #ECEFFC;
    .dribbble {
        position: fixed;
        display: block;
        right: 20px;
        bottom: 20px;
        img {
            display: block;
            height: 28px;
        }
    }
    .twitter {
        position: fixed;
        display: block;
        right: 64px;
        bottom: 14px;
        svg {
            width: 32px;
            height: 32px;
            fill: #1da1f2;
        }
    }
}

</style>
