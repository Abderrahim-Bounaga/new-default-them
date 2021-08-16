<template>
<div>
  <div class="w-f d-f  fw-w" v-if="config.upsellProducts">
    <si-upsell
      v-for="(upsell, index) in config.upsellProducts"
      :key="upsell._id + index"
      :product="upsell"
      :discount="config.discount"
      @addUppesllSimple="addUppesllSimple"
      @addUppesllVariant="addUppesllVariant"
      class=" lg-col-3 md-col-4 sm-col-6 sx-col-6 ssx-col-12"
    />
  </div>

</div>
</template>

<script>
export default {
  props: {
    config: { type: Object },
  },
  data(){
    return{
      variant:null,
      parentVariant:null
    }
  },
  mounted() {
  },
  methods:{
    addUppesllSimple(product,discount,qty){
      this.config.product.selected_variant=this.$store.state.GET_VARIANT
      this.$utils.call('ADD_TO_CART',{product:this.config.product,upsell:product,quantity:qty,discount:discount,upsellId:this.config.upsellId})
    },
    addUppesllVariant(product,discount,variant,qty){
      this.config.product.selected_variant=this.$store.state.GET_VARIANT
      this.$utils.call('ADD_TO_CART',{product:this.config.product,upsell:product,quantity:qty,discount:discount,variant:variant,upsellId:this.config.upsellId})
    }
  }
}
</script>

<style></style>
