<template>
  <div v-if="settings">
    <component :is="'script'">
      var style=document.createElement('style');
      style.innerHTML=`{{style}}`;
      document.head.appendChild(style)
    </component>
    <div class="h-s p-r zi-99 b-w" v-if="showLoader">
      <si-loaderGlobal class="container " />
    </div>
    <si-header :config="settings.globale_sections" />
    <div class="container d-f">
      <div class="modal zi-6" :class="{ 'modal-close': $store.state.showSideBarBlog }" @click="hideMenuFilter()"></div>
      <si-sideBarBlog v-if="settings.blog_sections.side_bar.show_side_bar"
        class="px-4 sx-pt-12 lg-col-3 tr-1/2 hide-sidebar" :class="{'active-sidebar':$store.state.showSideBarBlog}"
        @getchekList="getchekList" :selectedUrl="selectedUrl" />
      <Nuxt :class="settings.blog_sections.side_bar.show_side_bar?'lg-col-9 sm-col-12':'lg-col-12'" />
    </div>
    <si-footer :settings="settings.globale_sections.footer" />
  </div>
</template>

<script>
  export default {
    // layout:'default',
    data() {
      return {
        r: 0,
        g: 0,
        b: 0,
        settings: null,
        themeColor: null,
        style: null,
        selectedUrl: [],
        test: 'hamza',
        showLoader: true

      }
    },
    head() {
      return this.seo();
    },
    mounted() {
      if (this.selectedUrl.length > 0) this.getPosts(this.selectedUrl)
    },
    async fetch() {
      this.settings = await this.$settings();
      this.themeColor = this.hexToRgb(this.settings.style.primary_color);
      this.style = `:root{--primary-color:rgba(${this.themeColor["r"]},${this.themeColor["g"]},${this.themeColor["b"]},1);font-size:${this.settings.style.content_size}px;--footer-background:${this.settings.style.footer_background};--footer-color:${this.settings.globale_sections.footer.color};--header-background:${this.settings.style.header_background}; --header-color:${this.settings.style.header_color};--secondary-color:${this.settings.style.secondary_color};--reviews-color:${this.settings.style.reviews_stars_color};--addtocart-primary-color:${this.settings.buttons.add_to_cart.background};--addtocart-secondary-color:${this.settings.buttons.add_to_cart.color};--buynow-primary-color:${this.settings.buttons.buy_bow.background};--buynow-secondary-color:${this.settings.buttons.buy_bow.color};--price-primary-color:${this.settings.style.sale_price_color};--price-secondary-color:${this.settings.style.compare_price_color};direction:${this.settings.style.direction};font-family:${this.settings.style.font_family}}`;
      let params = this.$route.params;
      var slug = []
      if (params.filter) slug = params.filter.split('+')
      this.selectedUrl = slug
      if (this.settings) {
        this.showLoader = false
      }
    },
    methods: {
      hideMenuFilter() {
        this.$store.state.showSideBarBlog = !this.$store.state.showSideBarBlog
      },
      hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          }
          : { r: 1, g: 1, b: 1 };
      },
      seo() {
        let headTags = {
          title: this.settings ? this.settings.store_name : "",
          link: []
        };
        if (this.settings && this.settings.style.font_family && !['Arial', 'Sans-serif', 'serif'].includes(this.settings.style.font_family)) {
          headTags.link.push({
            rel: "stylesheet",
            href: `https://fonts.googleapis.com/css2?family=${this.settings.style.font_family}:wght@200;300;500;600;700;900&display=swap`,
          })
        }
        return headTags;
      },
      getchekList(val) {
        this.pushRoute(val)
        this.getPosts(val)
      },
      pushRoute(val) {
        this.$router.push('/blog/test1+test2+test3')
        // this.$nextTick(()=>{
        //     window.history.pushState(
        //       {},
        //       "",
        //       this.$pushState("/blog/", val, {})
        //     );
        // })
      },
      async getPosts(val) {
        const event = new CustomEvent("post_filter", {
          detail: {
            _slug: val
          }
        })
        window.dispatchEvent(event)
      }
    }
  }
</script>

<style coped>
  .active-sidebar {
    left: 0 !important;
  }

  @media (max-width:750px) {
    .modal {
      transition: all 0.5s;
    }

    .hide-sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      background: #ffffff;
      left: -100%;
      z-index: 8;
      width: 250px !important;
    }
  }
</style>
