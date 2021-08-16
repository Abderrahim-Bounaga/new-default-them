<template>
  <div class="p-r" :class="!type ? 'foot':'normal'">
    <div
      class="w-f d-f fw-w ai-c menu_container"
      :class="{'ai-fs':!type}"
      v-if="
        headerMenu &&
        headerMenu &&
        headerMenu.items &&
        headerMenu.items.length > 0
      "
    >
      <div
        v-for="(item, index) in headerMenu.items"
        :key="index"
        class="menu_item"
        :class="!type ? 'w-f':''"
        @mouseover="overPrentItime(headerMenu.items, index)"
        @mouseleave="livePrentItime(headerMenu.items, index)"
        @click="showchilde(headerMenu.items, index)"
      >
          <div class="p-r parent-items" :style="!defaultChilde&&!type?'box-shadow: 1px 1px 2px 1px hsl(0deg 0% 80% / 30%);':''">
            <div class="show-more" :class="{'d-n':defaultChilde && !type}" v-if="item.childrens.length> 0" :style="item.childrens.length > 0 && item.active  ? `transform: rotate(90deg) !important ; border-left: 8px solid ${colorMenu};`:`border-left: 8px solid ${colorMenu};`"></div>
            <a class="m-0 td-n lien" v-if="checkUrl(item.url)" :href="item.url" :style="{'color':colorMenu}" :target="item.target">{{ item.text }}</a>
            <nuxt-link v-else class="lien" :to="item.url" :target="item.target" :style="{'color':colorMenu}">{{ item.text }}</nuxt-link>
            <div class=" p-a tr-1/2 desktop-show-more" v-if="item.childrens.length> 0" >
              <svg  :style="item.childrens.length > 0 && item.active  ? 'transform: rotate(90deg) !important ;':''" fill="#fffff" aria-hidden="true" class="tr-1/2 css-1afmozc e1qpnp323" viewBox="0 0 24 24" ><path stroke-width="2" d="M9 4l8 8-8 8" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" :stroke="color"></path></svg>
            </div>
          </div>
          <div
            v-if="item.childrens.length > 0 && item.active ||item.childrens.length > 0 && defaultChilde && !type "
            class=" p-a r-0 l-0 zi-999 childe-content"
          >
            <div class="d-b w-f">
              <ChilderMenu  :paddingChilde="paddingChilde" @blockParent="blockParent(...arguments)" :color="colorMenu" :defaultChilde="defaultChilde" :items="item.childrens" :type="type" class=" d-f comp-child" :style="defaultChilde && !type ?'background:transparent !important':''" />
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props:{
    headerMenu:{type:Object},
    type:{type:Boolean,default:true},
    defaultChilde:{type:Boolean,default:false},
    paddingChilde:{type:Boolean,default:false},
    color:{type:String}
  },
  components: {
    ChilderMenu: () =>import("./ChildeMenu")
  },

  data() {
    return {
      bollshowchilder:false,
      openlistmenu:0,
      objectitems:null,
      colorMenu:this.color
    } ;
  },
  mounted() {
    if(window.innerWidth < 750){
      this.colorMenu="#111111"
    }
  },
  methods: {
  checkUrl(url){
    if(url.includes('http')) return true
    else return false
    },
    overPrentItime(items, index) {
      if(this.type)if(window.innerWidth>768) this.$set(items[index], "active", true);
    },
    livePrentItime(items, index) {
      if(this.type) if(window.innerWidth>768) this.$set(items[index], "active", false);
    },
    blockParent(data){return data},
    showchilde(items, index){

      if(index!=this.openlistmenu){
         this.bollshowchilder=false
         if(this.objectitems!=null){
           this.$set(this.objectitems[this.openlistmenu], "active", false);
         }
      }
       this.bollshowchilder=!this.bollshowchilder
      if(this.bollshowchilder){
       if(this.type){
         if(window.innerWidth<768) this.$set(items[index], "active", true);
       }
       else this.$set(items[index], "active", true);
      }
      else{
       if(this.type){if(window.innerWidth<768) this.$set(items[index], "active", false);}
       else this.$set(items[index], "active", false);
      }
      this.openlistmenu=index
      this.objectitems=items
    }
  }
};
</script>

<style lang="scss" scoped>
*{
  margin: 0 !important ;
  padding: 0 !important ;
  box-sizing: border-box !important ;
}

.desktop-show-more{
   right: -14px !important ;
   top: 1px !important ;
   width: 10px !important ;
}
.childe-content {
  top: 38px !important ;
  height: 150px !important ;
}

.comp-child {
  background: #fff !important ;
  box-shadow: rgba(204, 204, 204, 0.193) 1px 7px 16px 3px !important ;
}

.menu_item {
  padding: 12px 1rem !important ;
}
a {
  text-decoration: none !important ;
}

.lien {
  letter-spacing: 2px !important ;
  text-decoration: none !important ;
  font-size: 14px !important ;
  font-weight: 600 !important ;

}
.lien:hover {
  color: var(--primary-color) !important ;
}

.lien:active {
  color: var(--primary-color) !important ;
}

@media only screen and(max-width:1172) {
  .menu_container {
    width: 100% !important ;
    justify-content: center !important ;
  }
}
@media screen and (max-width: 750px) {
  .normal{
  .desktop-show-more{
    display: none !important ;
  }
  .content-perent{
    position: block !important ;
  }
  .parent-items{
    padding: 0 9px !important ;
    box-shadow: 1px 1px 2px 1px #cccccc4d !important ;
    position: relative !important ;
}
.show-more{
      width: 0 !important ;
    height: 0 !important ;
    border-top: 4px solid transparent !important ;
    border-bottom: 4px solid transparent !important ;
    position: absolute !important ;
    right: 10px !important ;
    top: 42% !important ;
    transition: all .5s !important ;
}
.comp-child{
  margin-top: 5px !important ;
  box-shadow: none !important ;

  background: #f2f1f154 !important ;
  display:block !important ;
}
.menu_item{
  width: 100%  !important ;
  padding: 3px 1rem !important ;
}
  .menu_container {
    flex-direction: column !important ;
    line-height: 3 !important ;
    border-top: 1px solid rgba(204, 204, 204, 0.371) !important ;
    border-bottom: 1px solid rgba(204, 204, 204, 0.371)  !important ;
    padding: 40px 0 !important ;
  }
  .childe-content{
    position: static !important ;
    top: 0 !important ;
    height: 100% !important ;
  }

  }
}
  .childe-content {
    color: rgb(82, 82, 82) !important ;
  }
  .foot{
     .desktop-show-more{
    display: none !important ;
  }
  .content-perent{
    position: block !important ;
  }
  .parent-items{
    padding: 0 9px !important ;
    position: relative !important ;
}
.show-more{
      width: 0 !important ;
    height: 0 !important ;
    border-top: 4px solid transparent !important ;
    border-left: 8px solid rgb(255, 255, 255) !important ;
    border-bottom: 4px solid transparent !important ;
    position: absolute !important ;
    right: 10px !important ;
    top: 42% !important ;
    transition: all .5s !important ;
}

.comp-child{
  margin-top: 5px !important ;
  box-shadow: none !important ;

  background: #97C8EE !important ;
  display:block !important ;
}
.menu_item{
  padding: 3px 0rem !important ;
}
  .menu_container {
    flex-direction: column !important ;
    line-height: 3 !important ;
  }
  .childe-content{
    position: static !important ;
    top: 0 !important ;
    height: 100% !important ;
  }
  }
</style>
