<template>
  <div class="main h-f w-f p-r" v-if="directions">
    <div class="bar p-a o-n br-3 " :style="directions=='ltr'?`left:${left}%;width:${trackWidth}%`:`right:${left}%;width:${trackWidth}%`"></div>
    <label for="minprice"></label>
    <input
      type="range"
      name="minprice"
      id="minprice"
      :min="min"
      :max="max"
      :value="leftVal"
      class="range w-f br-3 o-n p-a"
      @input="moveLeft"
      @mouseup="getVal"
    />

    <label for="maxprice"></label>
    <input
      type="range"
      name="price"
      id="maxprice"
      :min="min"
      :max="max"
      :value="right"
      class="range w-f br-3 o-n p-a"
      @input="moveRight"
      @mouseup="getVal"
    />
    <div class="cloneRang w-f br-3 p-a"></div>
    <div class="input-container d-f ai-c jc-sb">
      <div class="w-1/2 d-f fw-n">
        <span > {{ $currency() }}</span>
      <label for="minimum"></label>
      <input
        type="text"
        id="minimum"
        name="minimum"
        :value="leftVal"
        class="mx-1"
        disabled
      />
      </div>
      <div class="w-1/2 d-f fd-rr ">
       <span class="mx-1"> {{ $currency() }}</span>
      <label for="maximum"></label>
      <input type="text" class="price" style="  text-align: end;" id="maximum" name="maximum" :value="right" disabled />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { max: Number, min: Number, lval: Number, rval: Number,directions:String },
  data() {
    return {
      left: 0,
      right: 200,
      trackWidth: 100,
      leftVal: 0,
    };
  },
  mounted() {
    this.lval ? (this.leftVal = this.lval) : (this.leftVal = 0);
    this.rval ? (this.right = this.rval) : (this.right = this.max);
    this.trackWidth =
      ((this.right - this.leftVal) / (this.max - this.min)) * 100;
    this.left = (1 - (this.max - this.leftVal) / (this.max - this.min)) * 100;

  },
  computed: {
  },
  methods: {
    getVal() {
      this.$emit("handleRange", { max: this.right, min: this.leftVal });
    },
    moveLeft(event) {
      this.leftVal = parseInt(event.target.value);
      if (this.leftVal >= this.right) {
        event.target.value = this.right;
        this.leftVal = this.right - 1;
      }
      this.left =
        (1 - (this.max - event.target.value) / (this.max - this.min)) * 100;
      this.trackWidth =
        ((this.right - event.target.value) / (this.max - this.min)) * 100;
    },
    moveRight(event) {
      this.right = parseInt(event.target.value);
      if (this.right <= this.leftVal) {
        event.target.value = this.leftVal;
        this.right = this.leftVal + 1;
      }
      this.trackWidth =
        ((parseInt(event.target.value) - this.leftVal) /
          (this.max - this.min)) *
        100;
    },
  },
};
</script>

<style scoped>
/* :root{
  --primary-color:green;
} */
.main {
  background-color: #ffffff;

}
.bar {
  height: 8px;
  background: var(--primary-color);
  bottom: 37px !important;
  z-index: 2;
}
.range {
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 8px;
  bottom: 37px  !important;
}
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  height: 17px;
  width: 17px;
  border-radius: 50%;
  z-index: 3;
  cursor: pointer;
  background: var(--primary-color);
  box-shadow: 0px 1px 10px 2px rgba(0, 0, 0, 0.2);
}

.cloneRang {
  /* border: 1px solid; */
  background-color: #ebebeb;
  height: 8px;
  bottom: 37px !important;
}

input[type="text"],
span {
  font-size: 16px;
  color: #333;
  max-width: 79%;
  border: none;
  display: inline-block;
  outline: none;
}
input[type="text"]:disabled {
  background-color: #ffffff;
}
.anim{
  width: 6px;
  height: 6px;
  background: #333;
}
</style>
