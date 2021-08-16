<template>
  <div class="w-s my-10">
     <si-thank :settings="settings.thanks_sections" />
  </div>
</template>

<script>
export default {
  data(){
    return{
      settings:null
    }
  },
  async fetch(){
    this.settings=await this.$settings()
  },
  mounted() {
    fbPageView();
    snapPageView();
  },
}
</script>

<style>

</style>
