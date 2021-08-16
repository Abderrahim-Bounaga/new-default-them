<template>
  <div  :class="!type ? 'foot':'normal'">
    <div v-for="(item, index) in items" :key="index">
      <div
        @mouseover="overPrentItime(items, index)"
        @mouseleave="livePrentItime(items, index)"
        @click.stop="showchilde(items, index)"
      >
        <div class="parent-chalider"  :style="!paddingChilde&&defaultChilde&&!type?'padding:0 10px !important ;':'padding:10px !important'" :class="[defaultChilde&&!type?'d-f ai-c':'', defaultChilde&&paddingChilde&&!type?'l--14':'']"  >
        <div class="w-1 h-1 mx-2 tr-1/4 list" v-if="defaultChilde&&!type" ></div>
          <div class="show-more" :class="{'d-n':defaultChilde && !type}" v-if="item.childrens.length> 0" :style="item.childrens.length > 0 && item.active  ? `transform: rotate(90deg) !important ; border-left: 8px solid ${color};`:`border-left: 8px solid ${color};`"></div>
          <a class="lien childe" :class="!type ? 'f-c':'child-c'"  v-if="checkUrl(item.url)" :href="item.url" :target="item.target">{{ item.text }}</a>
          <nuxt-link v-else class="lien childe" :class="!type ? 'f-c':'child-c'" :to="item.url" :target="item.target">{{ item.text }}</nuxt-link>
        <div class="desktop-show-more" v-if="item.childrens.length> 0">
          <svg :style="item.childrens.length > 0 && item.active  ? 'transform: rotate(90deg) !important ;':''" aria-hidden="true" class="css-1afmozc e1qpnp323" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M9 4l8 8-8 8" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
        </div>
        <div
          v-if="item.childrens.length > 0 && item.active ||item.childrens.length > 0 && defaultChilde && !type "
           :style="defaultChilde&&!type?'border:none!important;':''" class="contente-childer"
        >
          <ChilderMenu :defaultChilde="defaultChilde" :paddingChilde="paddingChilde" :items="item.childrens" :type="type"  class="compen-childer" :style="!paddingChilde?'margin-left:6px;':''"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChilderMenu",
  props:{
    items:{type:Array},
    type:{type:Boolean,default:false},
    defaultChilde:{type:Boolean,default:false},
    paddingChilde:{type:Boolean,default:false},
    color:{type:String}
  },
  data() {
    return {
      bollshowchilderr:false
    }
  },

  methods: {
    checkUrl(url){
    if(url.includes('http')) return true
    else return false
    },
    overPrentItime(items, index) {
     if(this.type) if(window.innerWidth>768) this.$set(items[index], "active", true);
    },
    livePrentItime(items, index) {
    if(this.type) if(window.innerWidth>768) this.$set(items[index], "active", false);
    },
    showchilde(items, index){
      this.$emit('blockParent',this.bollshowchilderr)
       this.bollshowchilderr=!this.bollshowchilderr
      if(this.bollshowchilderr){
       if(this.type){
         if(window.innerWidth<768) this.$set(items[index], "active", true);
       }
       else this.$set(items[index], "active", true);
      }
      else{
         if(this.type) {if(window.innerWidth<768) this.$set(items[index], "active", false);}
         else  this.$set(items[index], "active", false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.parent-chalider:hover .list{
  width: 10px  !important;
  background:var(--primary-color);

}
.list{
  background:#ccc;
}
.foot{
  .parent-chalider{
    border-top: 1px solid #f8f8f857;
    border-bottom: 1px solid #f8f8f857;
  }
}
.parent-chalider{
  position: relative !important ;
}
.desktop-show-more{
     position: absolute !important ;
     transition: all .5s !important ;
     right: -8px !important ;
     top: 10px !important ;
     width: 10px !important ;
    svg{
     transition: all .5s !important ;
    }
}
.child-c{
  color: rgb(102, 102, 102) !important ;
}
.lien {
  text-decoration: none !important ;
  white-space: 2px !important ;
}
.compen-childer {
  display: flex !important ;
}
.contente-childer {
  position: absolute !important ;
  box-shadow: rgba(204, 204, 204, 0.282) 4px 7px 11px -4px !important ;
  transition: opacity 0.5s ease, visibility 0.5s ease !important ;
  background: #fff !important ;
  width: 100% !important ;
  right: 0 !important ;
    border-top: 1px solid #cccccc69 !important ;
}
.parent-chalider{
  padding:10px 8px !important ;
}
.childe:hover{
  color: var(--primary-color) !important ;
}
@media screen and (max-width: 750px) {
  .normal{
    .desktop-show-more{
      display: none !important ;
    }
    .show-more{
        width: 0  !important;
      height: 0  !important;
      border-top: 4px solid transparent  !important;
      border-left: 8px solid #555  !important;
      border-bottom: 4px solid transparent  !important;
      position: absolute  !important;
      right: 10px  !important;
      top: 42%  !important;
      transition: all .5s  !important;
  }
      .parent-chalider{
      padding:0 10px !important ;
      position:relative !important ;
    }
    .contente-childer{
      position: static !important ;
      box-shadow: none !important ;
      background: none !important ;
    }
    .compen-childer {
         display:block !important ;
    }

    }

}
.foot{
  background-color: #7DC5DF  !important;
    .desktop-show-more{
      display: none !important ;
    }
    .show-more{
        width: 0  !important;
      height: 0  !important;
      border-top: 4px solid transparent  !important;
      border-left: 8px solid #ffffff  !important;
      border-bottom: 4px solid transparent  !important;
      position: absolute  !important;
      right: 10px  !important;
      top: 42%  !important;
      transition: all .5s  !important;
  }
      .parent-chalider{

      position:relative !important ;
    }
    .contente-childer{
      position: static !important ;
      box-shadow: none !important ;
      background: none !important ;
    }
    .compen-childer {
         display:block !important ;
    }

    }
    .l--14{
      left: -14px;
    }
</style>
