<template>
  <div v-if="settings">
    <component :is="'script'">
      var style=document.createElement('style');
      style.innerHTML=`{{style}}`;
      document.head.appendChild(style)
      </component>
    <div class="h-s p-r zi-99 b-w"  v-if="showLoader"  >
       <si-loaderGlobal class="container " />
    </div>
    <si-header :config="settings.globale_sections" />
    <Nuxt />
    <div >
       <si-footer :settings="settings.globale_sections.footer" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      r: 0,
      g: 0,
      b: 0,
      settings:null,
      themeColor:null,
      style:null,
      showLoader:true
    }
  },
  head() {
    return this.seo();
  },
 async mounted() {
   this.$utils.call('PAGE_VIEW', { detail: { path_name: this.$route.name }});
    await  this.$utils.call('INIT_CART')
    this.$utils.call('INIT_WISHLIST',{target:'wishlist'})
    if(this.settings){
      this.showLoader=false
    }
 },
   async fetch() {
    this.settings = await this.$settings();
    const apps = await this.$apps({ isActive: true, 'placement-ne': 'NONE' });
    this.themeColor = this.hexToRgb(this.settings.style.primary_color);
    this.style = `:root{--primary-color:rgba(${this.themeColor["r"]},${this.themeColor["g"]},${this.themeColor["b"]},1);font-size:${this.settings.style.content_size}px;--footer-background:${this.settings.style.footer_background};--footer-color:${this.settings.globale_sections.footer.color};--header-background:${this.settings.style.header_background}; --header-color:${this.settings.style.header_color};--secondary-color:${this.settings.style.secondary_color};--reviews-color:${this.settings.style.reviews_stars_color};--addtocart-primary-color:${this.settings.buttons.add_to_cart.background};--addtocart-secondary-color:${this.settings.buttons.add_to_cart.color};--buynow-primary-color:${this.settings.buttons.buy_bow.background};--buynow-secondary-color:${this.settings.buttons.buy_bow.color};--price-primary-color:${this.settings.style.sale_price_color};--price-secondary-color:${this.settings.style.compare_price_color};direction:${this.settings.style.direction};font-family:${this.settings.style.font_family}}`;
 },
  methods: {
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
            htmlAttrs:{dir:this.settings && this.settings.style.direction?this.settings.style.direction:'ltr'},
             meta: [
            {
              hid: "description", name: "description", content: this.settings ? this.settings.store_description : "description"
            },
            {
              hid: "robots", name: "robots", content: this.settings && this.settings.store_indexing ? "index" : "noindex"
            },
            {
              hid: "og:title",   property: "og:title",  content: this.settings ? this.settings.store_name : ""
            },
            {
              hid: "og:site_name", property: "og:site_name", content: this.settings ? this.settings.store_name : ""
            },
            {
              hid: "og:type", property: "og:type", content: "article"
            },

            {
              hid: "og:description", property: "og:description",content: this.settings ? this.settings.store_description : "description..."
            },
            {
              name: "theme-color", content: this.settings ? this.settings.style.primary_color : "#333"
            },
            {
              hid: "currency", name: "currency", content: this.$currency()
            },
          ],
          link: [
              this.settings && this.settings.store_favicon ? {  hid: "icon", rel: "icon", href:  this.settings && this.settings.store_favicon  ? this.settings.store_favicon.src  : ""}
                                                          : {hid: "icon",rel: "icon", type: "image/x-icon",href: "/favicon.ico"},
          {
            rel: "manifest",href: `/manifest.json?name=${this.settings ? this.settings.store_name : "" }&favicon=${ this.settings && this.settings.store_favicon && this.settings.store_favicon.src  ? this.settings.store_favicon.src: "" }&color=${this.settings ? this.settings.style.primary_color.substr(1, 8) : "ffffff" }`
          }
        ],
        script:[]
         };
      if(this.settings&&this.settings.store_og_image&&this.settings.store_og_image.src) headTags.meta.push(     {hid: "og:image", property: "og:image", content:this.settings.store_og_image.src })
      if( this.settings&&this.settings.style.font_family&&!['Arial','Sans-serif','serif'].includes(this.settings.style.font_family)){
       headTags.link.push( {
            rel: "stylesheet",
            href: `https://fonts.googleapis.com/css2?family=${this.settings.style.font_family}:wght@200;300;500;600;700;900&display=swap`,
        })
      }
      if (this.settings && this.settings.google_ads&&this.settings.google_ads.id) {
        headTags.script.push({
          src: `https://www.googletagmanager.com/gtag/js?id=${this.settings.google_ads.id}`,
          type: "text/javascript",
          async: true
        });
      }
      if(this.settings && this.settings.google_analytics_id&&typeof(this.settings.google_analytics_id)!='object'){
        let google_analytics_id =  this.settings.google_analytics_id?String(this.settings.google_analytics_id).trim().replace(/[^\w\u0621-\u064A-]/gi, '-'):''
          headTags.script.push({
            src: `https://www.googletagmanager.com/gtag/js?id=${google_analytics_id}`,
            type: "text/javascript",
            async: true
          });
      }
       if (this.settings &&this.settings.meta_tags &&this.settings.meta_tags.length > 0) {
        for (let index = 0; index < this.settings.meta_tags.length; index++) {
          const meta_tag = this.settings.meta_tags[index];
          let tag = {};
          if (meta_tag.type == "name") {
            tag.name = meta_tag.name;
            tag.content = meta_tag.content;
          }
          if (meta_tag.type == "property") {
            tag.property = meta_tag.property;
            tag.content = meta_tag.content;
          }
          headTags.meta.push(tag);
        }
      }
      return headTags;
    }
  },
}
</script>
