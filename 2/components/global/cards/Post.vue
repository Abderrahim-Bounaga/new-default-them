<template>
  <div class="px-2 font o-h c-p d-f card" :class="type=='grid'?'fd-c':'fd-r'" v-if="item">
    <div  >
      <div class="o-h " v-if="showImage">
      <nuxt-link  class="o-h" :to="`/posts/${item.slug}`">
      <div class="img-post hover d-f ">
        <si-image class="" :src="item.image ? `${item.image.url}?width=${newWidth}`  : $defaultImageBlog " :alt="item.image && item.image.title ? item.image.title : 'No title'" :fit="fit" :ratio="ratio" />
      </div>
      </nuxt-link>
      </div>
      <div class="d-f ai-c fw-w jc-sb">
        <div class="ws-nw lg-col-6 sm-col-12" v-if="showPublisherName">
        <span >
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15.291px" height="15.291px" viewBox="0 0 548.291 548.291" style="enable-background:new 0 0 548.291 548.291;" xml:space="preserve"> <g> <path d="M433.805,273.091c0-11.53-8.812-17.625-24.388-17.625c-7.459,0-11.774,0.452-14.693,0.904v35.488h11.297 C424.1,291.857,433.805,284.393,433.805,273.091z"/> <path d="M150.362,278.744c0-14.005-9.719-22.375-26.882-22.375c-7.005,0-11.751,0.682-14.239,1.354v44.98 c2.934,0.683,6.551,0.903,11.53,0.903C139.083,303.606,150.362,294.34,150.362,278.744z"/> <path d="M486.201,196.121h-13.166v-63.525c0-0.399-0.062-0.795-0.115-1.2c-0.021-2.522-0.825-5-2.552-6.96L364.657,3.675 c-0.033-0.031-0.064-0.042-0.085-0.073c-0.63-0.704-1.364-1.292-2.143-1.796c-0.229-0.157-0.461-0.286-0.702-0.419 c-0.672-0.365-1.387-0.672-2.121-0.893c-0.2-0.052-0.379-0.134-0.577-0.188C358.23,0.118,357.401,0,356.562,0H96.757 C84.894,0,75.256,9.649,75.256,21.502v174.613H62.092c-16.971,0-30.732,13.756-30.732,30.73v159.81 c0,16.966,13.761,30.736,30.732,30.736h13.164V526.79c0,11.854,9.638,21.501,21.501,21.501h354.776 c11.853,0,21.501-9.647,21.501-21.501V417.392h13.166c16.966,0,30.729-13.764,30.729-30.731v-159.81 C516.93,209.877,503.167,196.121,486.201,196.121z M96.757,21.507h249.054v110.006c0,5.94,4.817,10.751,10.751,10.751h94.972 v53.861H96.757V21.507z M268.368,358.756c18.083,0,28.024-12.673,28.024-39.571v-87.667h34.357v85.421 c0,47.014-23.731,69.387-63.51,69.387c-38.413,0-61.022-21.24-61.022-69.839v-84.969h34.575v87.667 C240.785,345.406,250.735,358.756,268.368,358.756z M75.117,383.837V233.544c10.622-1.806,25.539-3.16,46.552-3.16 c21.249,0,36.386,4.073,46.557,12.202c9.716,7.686,16.27,20.347,16.27,35.255c0,14.92-4.968,27.569-14.008,36.163 c-11.751,11.092-29.148,16.048-49.491,16.048c-4.522,0-8.585-0.221-11.761-0.672v54.457H75.117L75.117,383.837z M451.534,520.968 H96.757V417.392h354.776V520.968z M457.78,371.632c-11.086,8.813-29.612,13.779-59.896,13.779c-16.955,0-29.607-1.122-37.297-2.257 V233.544c9.034-1.806,27.349-3.16,44.526-3.16c21.013,0,33.89,2.026,44.971,8.579c10.63,5.66,18.299,16.05,18.299,29.849 c0,13.553-7.905,26.206-25.071,32.524v0.473c17.397,4.736,30.27,17.849,30.27,37.508 C473.582,353.108,467.271,363.953,457.78,371.632z"/> <path d="M406.457,316.487h-11.743v42.94c3.392,0.451,7.464,0.451,13.328,0.451c15.597,0,29.392-5.869,29.392-21.921 C437.444,322.582,423.648,316.487,406.457,316.487z"/> </g> </svg>
        </span>
        <span class="publisher_name">
          <!-- {{item.publisher.firstname + " " + item.publisher.lastname}} -->
          hamza allaa
        </span>
        </div>
        <div class="ws-nw lg-col-6 sm-col-12" v-if="showPublisherDate">
        <span>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="calendar-alt"
              role="img"
              width="15"
              height="15"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"
              ></path>
            </svg>
        </span>
          <span>
            {{ item.createdAt ? item.createdAt.split("T")[0] : "none" }}
          </span>
        </div>
      </div>
    </div>
    <div class="my-3 item_description" :class="{'mx-2':type=='list'}">
        <nuxt-link class=" td-n" :to="`/posts/${item.slug}`" v-if="showTitle">
          <div class="item_title title">{{ item.title }}</div>
        </nuxt-link>
        <div class="item_resum item_title" v-if="showDiscriptions">
          {{ item.excerpt ? item.excerpt.slice(0, 50) : "" }}...
        </div>
  </div>
    <div>
  </div>
  </div>
</template>

<script>
export default {
props:{
  settings:{type:Object},
  item:{type:Object},
  ratio:{type:String,default:"1:1"},
  fit:{type:String ,default:"cover"},
  type:{type:String,default:"grid"},
  showPublisherName:{type:Boolean,default:true},
  showPublisherDate:{type:Boolean,default:true},
  showImage:{type:Boolean,default:true},
  showDiscriptions:{type:Boolean,default:true},
  showTitle:{type:Boolean,default:true}
  },
data() {
  return {
    src:"https://storeno.b-cdn.net/stores/1-2021/1611361118430.webp?width=NaN",
  }
},
mounted() {
},
computed: {
    newWidth: function () {
      return this.$screen_width / 3;
    },
}
}
</script>

<style lang="scss" scoped>
[src^="https://storeino.b-cdn.net/assets/no-image/no-image-post.svg"] {
    background-color: whitesmoke !important;
    padding: 25% !important;
    box-sizing: border-box !important;
}
.item_description{
  .item_title{
    font-size: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: -5px;
  }
}
.item_title{
  color: #333;
}
.title{
  font-weight: 600;
}
.card:hover{
  .title{
  color: var(--primary-color);
}
}
</style>
