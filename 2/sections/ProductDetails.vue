<template>
  <div v-if="settings">
    <div class="container m_mobile">
      <div class="py-10 d-f fw-w">
        <div class="d-f p-r" :class="
            type == 'Vertical'
              ? 'fd-cr lg-col-5 sm-col-12'
              : 'p-r lg-col-6 sm-col-12 '
          ">
          <div class="mx-1 lg-col-12 d-f" v-if="imageProduct && type == 'Vertical'">
            <si-slick background="#ffffff" :slidesToShow="4">
              <div class="width_carousel" v-for="(image, index) in imageProduct.images" :key="index * 2">
                <div class="mx-3 br-6 p-r o-h d-f ai-c jc-c shdw" @click="getImage(image)">
                  <si-image ratio="2:1" fit="cover" :src="image" :alt="imageProduct.name || 'No Name'" />
                  <div class="p-a w-f h-f l-0 r-0 b-0 t-0 mod"></div>
                </div>
              </div>
            </si-slick>
          </div>
          <div class="
              px-2
              mx-2
              lg-col-2
              mh-f
              o-h
              p-a
              l-0
              t-0
              b-0
              o-a
              image-hrzontal
            " v-else-if="imageProduct">
            <si-image v-for="image in imageProduct.images" :key="image" :src="image" :alt="image.title || 'No name'" />
          </div>
          <div class="lg-col-10 p-r" :class="type == 'Vertical' ? 'lg-col-12  ' : 'ml-100'">
            <div class="image w-f h-f p-a l-0 t-0 b-0 r-0 image-product" :class="{ 'v-h': !zoomed }" :style="{
                backgroundImage:
                  'url(\'' +
                  (product.images[0].src
                    ? product.images[0].src
                    : $defaultImageProduct) +
                  '\')',
                backgroundPosition: backgroundPosition,
              }" @mousemove="mouseMove" @mouseleave="mouseLeave"></div>
            <div @mouseenter="activeZoom" :class="{ 'v-h': zoomed }">
              <si-image fit="contain" class="c-p image-product" :ratio="type == 'Vertical' ? '3:2' : '1:1'" :src="product.images[0] && product.images[0].src ? product.images[0].src: $defaultImageProduct" :alt="product.images[0] && product.images[0].title ? product.images[0].title: 'No name'" />
            </div>
          </div>
          <si-button v-if="wishlist" @click="addWishlist(product)" :class="{ active: wishlist }" icon="wishlist_filled"
            iconColor="#E50B00" :background="['transparent']" class="zi-999 fs-4 p-a r-0 t-0 wich" />
          <si-button aria-label="Wishlist" v-if="!wishlist" @click="addWishlist(product)" icon="wishlist_vide" iconColor="#E50B00"
            :background="['transparent']" class="zi-999 fs-4 p-a r-0 t-0 wich" />
        </div>
        <div :class="
            type == 'Vertical' ? 'lg-col-7 sm-col-12' : 'lg-col-6 sm-col-12'
          ">
          <div class="px-3">
            <h1 class="p-title">{{ product.name }}</h1>
            <div v-if="price && settings.product_details_sections.show_price" class="my-2">
              <div class="d-f">
                <div>
                  <b class="fs-5">{{ price.salePrice | formatPrice }} </b><span class="fs-5"> {{ $currency() }} </span>
                </div>
                <div class="mx-2 color-red" v-if="price.comparePrice > price.salePrice">
                  <span class="td-lt fs-5">{{ price.comparePrice | formatPrice }} </span><span class="fs-5"> {{
                    $currency() }}</span>
                </div>
              </div>
            </div>
            <div class="py-2">
              <p>{{ product.description }}</p>
            </div>
            <si-productVariant @priceVariant="priceVariant" type="product" v-if="Colors || Sizes" :product="product"
              :Colors="Colors" :Sizes="Sizes" />
            <app-loader placement="BEFORE_ADD_TO_CART" />
            <div class="w-f" v-if="!outstock">
              <div class="my-2 d-f ai-c w-1/2">
                <si-quantity v-if="settings.product_details_sections.show_quantity"
                  :tab="!settings.product_details_sections.quantity_writable" type="number" size="md"
                  @quantity="quantity" :max="product.quantity.instock" :min="product.quantity.min"
                  :unit="product.quantity.unit" :defaultQuantity="product.quantity.default"
                  :increment="product.quantity.increment" />
              </div>
              <div>
                <a href="/checkout/" v-if="
                    settings.product_details_sections.show_add_to_cart &&
                    settings.product_details_sections.add_to_cart_to_checkout
                  ">
                  <si-button @click="addToCart()" :text="settings.buttons.add_to_cart.text" color="#fff"
                    :background="[settings.buttons.add_to_cart.background]" class="p-4 w-f" />
                </a>
                <div v-else>
                  <si-addToCartAnimation v-if="
                      settings.product_details_sections.show_add_to_cart &&
                      settings.product_details_sections.show_animation_cart
                    " class="my-2" :text="settings.buttons.add_to_cart.text" @click="addToCart()" type="border"
                    color="#fff" :background="[settings.buttons.add_to_cart.background]" />
                  <si-button v-if="
                      settings.product_details_sections.show_add_to_cart &&
                      !settings.product_details_sections.show_animation_cart
                    " @click="addToCart()" :text="settings.buttons.add_to_cart.text" color="#fff"
                    :background="[settings.buttons.add_to_cart.background]" class="p-4 w-f" />
                </div>
                <app-loader placement="AFTER_ADD_TO_CART" />
                <div v-if="buynowApps.length > 0">
                  <app-loader v-if="!outstock" :placement="'REPLACE_BUYNOW'" />
                </div>
                <a v-else href="/checkout/">
                  <si-button @click="addToCart()" :text="settings.buttons.buy_bow.text" color="#fff"
                    :background="['#80B82D']" class="p-4 my-2 w-f" />
                </a>
                <app-loader placement="AFTER_BUYNOW" />
              </div>
            </div>
            <div v-else>
              <si-button :disabled="outstock" text="Out of stock" type="border" color="#ffffff" :background="['red']"
                class=" py-2 w-f ta-c d-f fd-c ai-c jc-c p-r t-1 fs-4 show-addtocart" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      product: Object, //send requst id product $UpSell
      type: { type: String, default: 'Vertical' },
    },
    data() {
      return {
        buynowApps: [],
        backgroundPosition: null,
        zoomed: false,
        Colors: null,
        Sizes: null,
        settings: null,
        getPriceVariant: null,
        upsell: null,
        discount: null,
        upsellProducts: null,
        imageProduct: null,
        variant: null,
        qty: null,
        wishlist: false,
        increment: 0,
        wishlistProduct: null,
        outstock: false,
      }
    },
    mounted() {
      this.getwishlist()
      if (this.product.images.length > 0) {
        var images = []
        this.product.images.forEach((ele) => {
          images.push(ele.src)
        })
        this.imageProduct = {}
        this.imageProduct.images = images
      }
      this.chekOutOfStock()
    },
    async fetch() {
      this.settings = await this.$settings()
      this.buynowApps = (await this.$apps()).data.filter((a) => a.placement == 'REPLACE_BUYNOW')
      if (this.product.options && this.product.options.length > 0) {
        await this.product.options.forEach((ele) => {
          if (ele.key == 'color') this.Colors = ele
          if (ele.key == 'size') this.Sizes = ele
        })
      }
      var images = []
      this.product.images.forEach((ele) => {
        images.push(ele.src)
      })
      this.imageProduct = {}
      this.imageProduct.images = images
    },
    computed: {
      price: {
        get: function () {
          if (this.product.type == 'simple') return this.product.price
          if (this.product.type == 'variable' && this.getPriceVariant) {
            return this.getPriceVariant
          }
        },
      },
    },
    methods: {
      chekOutOfStock(value = null) {
        if (value) {
          if (
            this.product.outStock.disabled == false &&
            value.quantity.instock <= 0
          )
            this.outstock = true
          else this.outstock = false
        } else {
          if (
            this.product.outStock.disabled == false &&
            this.product.quantity.instock <= 0
          )
            this.outstock = true
          else this.outstock = false
        }
      },
      async getwishlist() {
        this.increment++
        this.wishlistProduct = await this.$storeWishlist()
        if (this.wishlistProduct.products.length <= 0 && this.increment <= 2) {
          setTimeout(() => {
            this.getwishlist()
          }, 500)
        } else {
          if (this.wishlistProduct.products.length > 0) {
            const index = this.wishlistProduct.products.findIndex(
              (ele) => ele._id == this.product._id
            )
            if (index != -1) this.wishlist = true
          }
        }
      },
      addWishlist(product) {
        this.wishlist = !this.wishlist
        if (this.wishlist) {
          this.$utils.call('ADD_TO_CART', {
            product: product,
            quantity: this.qty,
            target: 'wishlist',
          })
        } else {
          this.$utils.call('REMOVE_CART', {
            product: product,
            target: 'wishlist',
          })
        }
      },
      getImage(img) {
        this.product.images[0].src = img
      },
      quantity(val) {
        this.qty = val
      },
      addToCart() {
        if (!this.qty) this.qty = this.product.quantity.default
        this.$utils.call('ADD_TO_CART', {
          product: this.product,
          variant: this.variant,
          quantity: this.qty,
        })
      },
      priceVariant(variant) {
        this.chekOutOfStock(variant)
        this.$store.state.GET_VARIANT = variant
        this.variant = variant
        this.getPriceVariant = variant.price
      },
      activeZoom() {
        this.zoomed = true
      },
      mouseMove(e) {
        this.zoomed = true
        const image = document.querySelector('.image')
        let width = image.offsetWidth
        let height = image.offsetHeight
        let mouseX = e.offsetX
        let mouseY = e.offsetY
        let bgPosX = (mouseX / width) * 100
        let bgPosY = (mouseY / height) * 100
        this.backgroundPosition = `${bgPosX}% ${bgPosY}%`
      },
      mouseLeave() {
        this.zoomed = false
        this.backgroundPosition = 'center'
      },
    },
  }
</script>

<style lang="scss" scoped>
  .active {
    animation: wishlistanimation 0.3s;
  }

  @keyframes wishlistanimation {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(1.1);
    }
  }

  .shdw {
    box-shadow: 2px 2px 3px -1px #ccc;
  }

  .image-product {
    border: 1px solid #ccc;
  }

  .image {
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

  .image:hover {
    background-size: 250%;
  }

  .color-red {
    color: red;
  }

  .p-title {
    color: #333333;
  }

  .md-t {
    margin-top: 20px;
  }

  .ml-100 {
    margin-left: 120px;
  }

  .image-hrzontal::-webkit-scrollbar {
    width: 5px;
    border-radius: 10px;
  }

  /* Track */
  .image-hrzontal::-webkit-scrollbar-track {
    background: #dadada;
    border-radius: 10px;
  }

  /* Handle */
  .image-hrzontal::-webkit-scrollbar-thumb {
    background: rgb(163, 162, 162);
    border-radius: 10px;
  }

  /* Handle on hover */
  .image-hrzontal::-webkit-scrollbar-thumb:hover {
    background: rgb(121, 120, 120);
    border-radius: 10px;
  }
</style>
