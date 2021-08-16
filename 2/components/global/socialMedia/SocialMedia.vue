<template>
  <div v-if="medias" class="d-f ai-c jc-sb " :class="{'fd-c':type=='column'}" >
   <a class="mx-1 my-1"  v-for="(media,index) in medias" :aria-label="media.name" :href="media.link" target="_blanck" :key="index">
      <si-button :aria-label="media.name" color="#0000FF" :class="fontSize"  :iconColor="iconColor" :background="background"  :icon="media.name" />
   </a>
  </div>
</template>

<script>
export default {
  props: {
    settings: Object, //settings.globale_sections.header_top.social_media OR settings.globale_sections.footer.social_media
    type:{type:String,default:"row"}, //style button row or culomn
    background:{type:Array,default:['#f0efef']}, //bacground button social media
    fontSize:{type:String,default:''},
    iconColor:{type:String,default:"#736666"},

  },

  data(){
    return{
      medias:[]
    }
  },
  mounted() {
     for (const [key, value] of Object.entries(this.settings.content)) {
       var obj={}
       obj.name=key
       obj.link=value
       if(this.settings['show_'+key]) this.medias.push(obj)
    }
  },
}
</script>

<style>
.d{
flex-direction: column;
}
</style>
