<template>
  <div v-if="settings">
    
    <Nuxt />

  </div>
</template>
<script>
export default {
  data() {
    return {

      settings:null,

    }
  },

   async fetch() {
    this.settings = await this.$settings();
   },
  methods: {
   
  },
}
</script>
