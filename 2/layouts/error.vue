<template>
  <div v-if="settings" >
    <si-error  :settings="settings.error_sections?settings.error_sections.error_404:null" />
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error', // you can set a custom layout for the error page
      data() {
    return {
      page: "404",
      settings: null,
    };
  },
   async fetch() {
    if (this.error.statusCode > 400 && this.error.statusCode < 500) {
      this.page = "404";
    } else {
      this.page = "500";
    }
    this.settings = (await this.$settings())
  },
  }
</script>
