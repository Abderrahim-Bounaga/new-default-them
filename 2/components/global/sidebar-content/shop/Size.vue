<template>
<div class="d-f">
   <label class="my-2 d-f ai-c c-p" :for="index" v-for="(size, index) in sizes"  :key="index">
      <input
        type="checkbox"
        name="size"
        class="w-5 h-5 d-n"
        :id="index"
        :checked="selected.includes(size.value1)"
        :value="size"
        @change="change(size.value1)"
      />
      <span class="w-5 h-5 mx-2 d-b br-f br-gry container-clone" :style="selected.includes(size.value1)?`background:var(--primary-color);border-color:var(--primary-color);`:``"  ></span>
      <span class="ct-text c-grey" :style="selected.includes(size.value1)?`color:black; font-weight: 600;`:``">{{ size.value1 }}</span>

    </label>
</div>
</template>

<script>
export default {
  props: {
    sizes: Array, //await this.$filters() ==> .sizes
    checked: { type: Boolean, dafault: false },
    selectedUrl:[Array,Object] // Fetching data from url

  },
  data() {
    return {
      selected: [],
    };
  },
  mounted() {
    this.selected=this.selectedUrl
  },
  methods: {
    change(size) {
       var index=this.selected.findIndex(el=> el==size)
      if(index==-1) this.selected.push(size)
      else this.selected.splice(index,1)
      this.$emit("getSize", this.selected);
    },
  },
}
</script>
<style>
</style>

<style scoped>

.container-clone{
  border: 1px solid #e4e4e4;
}
.name{
  color:rgb(102, 101, 101);
}
.dotColor{
  box-shadow: 1px 1px 5px -2px #2b2a2a;
}
.chek{
  width: 16px;
  height: 16px;
}
.ct-text{
  color:rgb(84, 84, 84);
}
</style>
