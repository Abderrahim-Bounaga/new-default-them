<template>
<div v-if="settings && !settings.sections.home_blog.show">
  <div v-if="settings.sections.home_blog.show_title"><h1 class="my-4 ta-c sm-fs-6">{{settings.sections.home_blog.title}}</h1></div>
  <div v-if="settings" class="container my-10 d-f fw-w">
     <div :class="settings.sections.home_blog.style=='small'?'lg-col-4 md-col-4 sm-col-6 ssx-col-12':settings.sections.home_blog.style=='medium'?'lg-col-6 md-col-6 sm-col-12 ssx-col-12':'lg-col-12'" v-for="(blog, index) in settings.sections.home_blog.items" :key="index">
            <si-post
             :showImage="settings.sections.home_blog.show_image"
             :showPublisherName="settings.sections.home_blog.show_name"
             :showPublisherDate="settings.sections.home_blog.show_date"
             :showTitle="settings.sections.home_blog.show_title"
             :showDiscriptions="settings.sections.home_blog.show_description"
              :item="blog"  />
      </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
      config: null,
  },
  data() {
    return {
      settings:null
    }
  },
  mounted() {
  },
 async fetch() {
    this.settings=await this.$settings()
 },
}
</script>

<style>

</style>
