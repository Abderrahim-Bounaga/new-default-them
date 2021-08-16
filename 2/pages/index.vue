<template>
<div v-if="settings">
  <div v-for="(section,index) in Object.keys(settings.sections)" :key="index">
       <component  :is="`si-${section.split('__')[0]}`" v-if="settings.sections[section]" :config="settings.sections[section]"  ></component>
  </div>
</div>
</template>

<script>
export default {
   layout:'default',
  data() {
    return {
      settings:null,
      blogs: [],
      shopSettings:null,
      sectionHome:{}
    }
  },
  async fetch() {
    this.settings = await this.$settings();
    this.shopSettings = this.settings.shop_sections.shop_sidebar;
  },
  mounted() {
    fbPageView();
    snapPageView();
  },
  methods:{
    reformSection(){
      Object
    },
  }
}
</script>

<style lang="scss" scoped>
[src^="https://storeino.b-cdn.net/assets/no-image/no-image-post.svg"] {
    background-color: whitesmoke !important;
    padding: 25% !important;
    box-sizing: border-box !important;
}
.image{
  width: 300px;
  height: 300px;
  position: relative  !important;
}
.ig{
  width:300px;
  height: 300px;
}
.mrg{
  margin:200px 20px !important;
}

</style>
