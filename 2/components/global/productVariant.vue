<template>
  <div class="my-1" v-if=" variant">
    <div
      class="my-1 d-f ai-c "
      v-for="(item, index) in variant"
      :key="index + item._id"
    >
      <!-- <span class="mt-2">{{ item.name }}</span> -->
      <span v-for="index in item.values" :key="index._id" class="mx-2">
        <input
          type="radio"
          @change="changeVaraint(index._id, item.key )"
          :data="item.key=='color' ? '':index.value2"
          :value="index.value2"
          :checked="item.key=='color' ? selectedcolor==index.value2: selectedsize == index.value2"
          :style="item.key=='color' ? `--bg: ${index.value2};--data: ''`:`--bg: #949292;--color:${colorSize}`  "
          :class="item.key=='color' ? 'care':'size'"
          :name="item._id"
          :id="index._id"
        />
        <!-- `selected${item.key}==${index.value2}` -->
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
    discount: Object,
    varaintPrice: Object,
    type: String,
    colorSize:{type:String,default:'#111'}
  },
  data() {
    return {
      selectedcolor: null,
      selectedsize: null,
      selected: {},
      selectedValues: {},
      newPrice: null,
      currentVariant: null,
      price: null,
      variant: [],
    }
  },
  async mounted() {
    if (this.product && this.product.options && this.product.options.length > 0) {
      await this.product.options.forEach((ele) => {
        if (ele.key == 'color') this.variant.push(ele)
        if (ele.key == 'size') this.variant.push(ele)
      })
    }
    this.variant.forEach(item=>{
      if(item.key=='color'){
            this.selectedcolor = item.values[0].value2
            this.changeVaraint(item.values[0]._id, 'color')
      }
      if(item.key=='size'){
            this.selectedsize = item.values[0].value2
            this.changeVaraint(item.values[0]._id, 'size')
      }
    })
  },
  methods: {
    changeVaraint(val, name) {
      if (name == 'color') {
        this.selected.value1 = val
      }
      if (name == 'size') {
        this.selected.value2 = val
      }
      this.selectedValues = this.selected
      this.updateVariant()
    },
    updateVariant() {
      const variant = this.$getSelectedVariant(
        this.product.variants,
        this.selectedValues.value1,
        this.selectedValues.value2,
        this.selectedValues.value3
      )
      if (!variant) return

      this.currentVariant = variant
      this.price = this.currentVariant.price
      if (this.type == 'upsell') {
       this.newPrice=this.$utils.calcDiscount(this.price.salePrice,this.discount.type,this.discount.value,this.product.quantity.default)
        if (this.newPrice < 0) this.newPrice = 0
        this.varaintPrice.newPrice = this.newPrice
        this.varaintPrice.price = this.price.salePrice
        this.$emit('priceVariant', this.varaintPrice, variant)
      } else {
        this.$emit('priceVariant', variant)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
%inpuChek {
  width: 20px;
  height: 20px;
  position: relative;
  transition: all 0.3s;
  visibility: hidden;
  position: relative;
  cursor: pointer;
}
%inputAfter {
  content: attr(data);
  position: absolute;
  border: 2px solid var(--bg);
  width: 20px;
  height: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  visibility: visible;
  transition: all 0.3s;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color:var(--color);
}
.care {
  @extend %inpuChek;
}
.care::after {
  @extend %inputAfter;
  border-radius: 50%;
}
.care::before {
  content: '';
  position: absolute;
  border-bottom: 2px solid #fff;
  border-left: 2px solid #fff;
  width: 13px;
  height: 5px;
  bottom: 0;
  visibility: visible;
  transition: all 0.3s;
  opacity: 0;

}
.care:checked {
  &::before {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    opacity: 1;
    z-index: 2;
  }
  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
    background: var(--bg);
  }
}
.size {
  @extend %inpuChek;
}
.size::after {
  @extend %inputAfter;
  border: none;
}
.size::before {
  content: '';
  @extend %inputAfter;
}
.size:checked {
  &::after {
    color: #fff;
  }
  &::before {
    background: #2097f2;
    color: #fff;
    transform: translate(-50%, -50%) rotate(90deg);
    border-color: #2097f2;
  }
}
</style>
