<template>
  <div  class="d-f ai-c jc-sb" :class="{'fd-c':type=='column'}" v-if="settings && settings.show_share_buttons">
               <a aria-label="Share to facebook" class="my-1 " :href="`https://www.facebook.com/sharer.php?u=${storUrl}`" target="_blank"   v-if="
                  settings.show_share_buttons &&
                    settings.show_share_fb
                ">
                <si-button :background="background" :iconColor="!settings.global_colors.active?settings.colors.color_fb:settings.global_colors.color"   icon="facebook" />
              </a>
              <!-- //tweeter/// -->

              <a aria-label="Share to twitter" class="my-1 " :href="`https://twitter.com/intent/tweet?url=${storUrl}&text=${blog.title}`" target="_blank" v-if="
                  settings.show_share_buttons &&
                    settings.show_share_twt
                ">
                <si-button :background="background" :iconColor="!settings.global_colors.active?settings.colors.color_twt:settings.global_colors.color"   icon="twitter" />
              </a>
              <!-- //linkedin/// -->
             <a aria-label="Share to linkedin" class="my-1 " :href="`https://www.linkedin.com/sharing/share-offsite/?url=${storUrl}&title=${blog.title}`" target="_blank"
              v-if="
                  settings.show_share_buttons &&
                    settings.show_share_lkdn
                ">
                 <si-button :background="background" :iconColor="!settings.global_colors.active?settings.colors.color_lkdn:settings.global_colors.color"   icon="linkedin" />
             </a>
              <!-- //email/// -->
              <a aria-label="Share to mail" class="my-1 " :href="`mailto:{email_address}?subject=${blog.title}&body=${storUrl}`" target="_blank"  v-if="
                  settings.show_share_buttons &&
                    settings.show_share_email
                ">
                <si-button :background="background" :iconColor="!settings.global_colors.active?settings.colors.color_email:settings.global_colors.color"   icon="email" />
              </a>
              <!-- pinterest -->
              <a aria-label="Share to pinterest" class="my-1 " :href="`https://pinterest.com/pin/create/bookmarklet/?media=${blog.image && blog.image.url ? blog.image.url : $defaultImageBlog}&url=${storUrl}&description=${blog.title}`" target="_blank" v-if="
                  settings.show_share_buttons &&
                    settings.show_share_button_pinterest
                ">
                <si-button :background="background" :iconColor="!settings.global_colors.active?settings.colors.color_pntrst:settings.global_colors.color"   icon="pinterest" />

              </a>
              <!-- Whatsapp -->
              <a class="my-1" aria-label="Share to whatsapp" :href="`https://wa.me/?text=${blog.title} ${storUrl}`" target="_blank" v-if="
                  settings.show_share_buttons &&
                    settings.show_share_whatsapp
                ">
                <si-button :background="background" :iconColor="!settings.global_colors.active?settings.colors.color_wtsp:settings.global_colors.color"   icon="Whatsapp" />
              </a>
    </div>
</template>

<script>
export default {
  props:{
    settings:{type:Object},
    blog:{type:Object},
    type:{type:String,default:"row"},
    background:{type:Array}
  },

data() {
  return {
    storUrl:null,
  }
},
  mounted() {
    this.storUrl=window.location.href
  }
}
</script>
