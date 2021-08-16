<template>
  <div class="w-1/2 fw-w" v-if="settings">
    <div class="my-3 " v-for="(color, index) in colors" :key="index">
    <label class="px-1 d-f ai-c p-r c-p" :for="color.value1">
      <input
        class="w-5 h-5 d-n"
        type="checkbox"
        data="red"
        :checked="selected.includes(color.value1)"
        :id="color.value1"
        @change="change(color.value1)"
      />
        <span v-show="settings.shop_sections.side_bar.colors.show_color" class="w-5 h-5 mx-1 d-b br-f color dotColor"  :style="selected.includes(color.value1)?`background:${color.value2}`:`border: 1px solid ${color.value2}`" ></span>
        <span class="name" :style="selected.includes(color.value1)?`color:black; font-weight: 600;`:``" v-show="settings.shop_sections.side_bar.colors.show_text_color"> {{ color.value1 }} </span>
    </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    checked: { type: Boolean, dafault: false },
    colors: [Array, Object], // await this.$filters()
    selectedUrl:[Array,String ] // Fetching data from url
    },
  data() {
    return {
      selected:[],
      settings:null
    };
  },
 async mounted() {
        this.settings= await this.$settings()
        this.selected=this.selectedUrl
  },
  methods: {
    change(value) {
      var color=this.selected.findIndex(el=> el==value)
      if(color==-1) this.selected.push(value)
      else this.selected.splice(color,1)
      this.$emit("getColor", this.selected);
    },
  },
};
</script>

<style scoped>
.name{
  color:rgb(102, 101, 101);

}
.dotColor{
  box-shadow: 1px 1px 5px -2px #2b2a2a;
}
</style>
