<template>
  <nuxt-link to="/" class="d-f ai-c" aria-label="Store Logo">
      <si-image :ratio="ratio" fit="contain" :src="src" alt="Store Logo" />
  </nuxt-link>
</template>

<script>
export default {
  props:{
    src:{type:String,default:"https://storeno.b-cdn.net/stores/7-2021/1626690015596.png"},
    ratio:{tyep:String,default:"1:1"}
  }
}
</script>

<style>

</style>
