<template>
        <div class="right_side br-3 p-r o-h" v-if="blog && settings">
        <div class="blog_title d-f jc-c fd-c ta-c fs-7">
          <div class="right-date"></div>
          <h2 class="lh-5" v-if="settings.blog_sections.post_details.show_title">{{ blog.title }}</h2>
          <div v-if="settings.blog_sections.post_details.show_name||settings.blog_sections.post_details.show_date">
            <div class="px-0 py-1 bar-date p-r d-f jc-c">
              <div class="d-f ai-c" v-if="settings.blog_sections.post_details.show_date">
                 <si-button icon="currency fs-2" :background="['#ffff']" />
                 <p class="py-0 fs-n fw-400 lh-7 fs-2 b-w  date-publish">
                    {{ getdatePblish }}
                 </p>
              </div>
              <div class="px-3 publisher_info d-f fs-2 b-w " v-if="settings.blog_sections.post_details.show_name">
                <si-button icon="acount" class="fs-2" :background="['#ffff']" />
                <span
                  class="publisher_name fw-500"
                  >{{
                    blog.publisher.firstname + " " + blog.publisher.lastname
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="my-5 blog_detail_container">
          <div class="px-10 blog_img w-f d-f fd-c ai-c jc-c" v-if="blog.image && blog.image.url && settings.blog_sections.post_details.show_image">
            <si-image :src="blog.image && blog.image.url ? blog.image.url : $defaultImage"
               :alt="blog.image && blog.image.alt ? blog.image.alt : 'Blog Image'" ratio="2:1"/>
          </div>
          <h3  class="my-3 ta-c c-grey" v-if="settings.blog_sections.post_details.show_description">
            {{blog.excerpt}}
          </h3>
          <div class="blog_content">
            <div v-html="blog.content"></div>
          </div>
          <div
            class="py-8 share d-f ai-c jc-c row"
          >
            <h2 class="mx-3">{{settings.blog_sections.post_details.share_buttons.title}}</h2>
            <div class="social_media">
                <si-buttonShare  :blog="blog" fontSize="fs-4" :background="['transparent']" :settings="settings.blog_sections.post_details.share_buttons"  />
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
data() {
  return {
    blog:null,
    settings:null
  }
},
async fetch(){
      this.settings=await this.$settings()
      this.blog = await this.$page({slug: this.$route.params.slug });
},
computed: {
    getdatePblish: function() {

      if (this.blog.createdAt) {
        return this.blog.createdAt.split("T")[0];
      }
    }

},
}
</script>

<style lang="scss" scoped>
.blog_footer_details.row {
  border-top: 1px solid #cccccc4f;
}

.right_side {
  box-shadow: 0 0 1px #d3d3d3;
  .blog_title {
    padding: 1rem 15px 0 15px;
    color: #110f0fc9;
    .bar-date {
      margin-top: 25px;
      &.bar-date::after {
      content: "";
      width: 72%;
      height: 1px;
      background: #efefef;
      position: absolute;
      top: 20px;
      z-index: -1;
      }
    }
  }
  .blog_img {
    margin-bottom: 40px;
  }
}

//right side

.blog_publisher {
  .publisher_info {
    margin-top: 10px;
    .publisher_name {
      margin: 10px 0 6px 0;
    }
  }
}


.blog_content {
  padding: 13px 9px;
}
 img {
  max-height: 100% !important;
  max-width: 100% !important;
}

</style>
