<template>
  <div class="w-f p-r" v-if="options">
    <div
      v-if="show_options && withOptions"
      class="b-w  w-f p-a zi-999 b-n list "
      :class="optionsCopy ? 'list-show' : null"
      :style="listDirection=='top'?'bottom: 35px;border-top-left-radius:6px;border-top-right-radius: 6px;':'top: 35px;border-bottom-left-radius:6px;border-bottom-right-radius: 6px;'"
    >
      <ul v-if="optionsCopy.length > 0 && select">
        <li
          @mousedown="setSelectedOption(option)"
          v-for="(option, index) in optionsCopy"
          :key="index"
          class="px-3 py-3"
        >
          {{ option[label] }}
        </li>
      </ul>
      <span
        v-else
        class="d-f ai-c w-f empty_list_container jc-c"
        >{{ empty_message }}</span
      >
    </div>
    <div class="search_container">
      <slot name="header"></slot>
      <div id="autocomplete">{{ search_suggestion }}</div>
      <input
        class="p-3 input_field p-r"
        :name="label"
        type="text"
        :placeholder="placeholder"
        autocomplete="off"
        :value="value"
        @focus="focused"
        @input="updateValue($event)"
        @blur="blured"
        @keydown="removeSearch($event)"
        :readonly="write"
      />
      <svg
        v-if="withOptions"
        class="arrow_ico"
        :style="show_options ? 'transform: rotate(180deg)' : ''"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 451.847 451.847"
        xml:space="preserve"
      >
        <g>
          <path
            d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
              c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
              c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
            />
        </g>
      </svg>

      <svg
        v-if="value && clearable"
        :style="!withOptions ? 'right:8px;' : 'right: 34px;'"
        class="close_ico p-a"
        viewBox="0 0 365.696 365.696"
        xmlns="http://www.w3.org/2000/svg"
        @click="clearInput"
      >
        <path
          d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"
        />
      </svg>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options:{type:[Array,Object]},
    label: String,
    placeholder: { type: String, default: "label" },
    code: { type: [Number, String], default: "name" },
    clearable: { type: Boolean, default: true },
    empty_message: { type: String, default: "Sorry, no matching options" },
    withOptions: { type: Boolean, default: true },
    select: { type: Boolean, default: true },
    tab:{type:Boolean,default:false},
    write:{type:Boolean,default:false},
    listDirection:{type:String,default:'bottom'},
    stopBlured:{type:Boolean,default:false}

  },

  data() {
    return {
      show_options: false,
      value: "",
      optionsCopy: null,
      autocomplete: "option",
      search_suggestion: ""
    };
  },
 mounted() {
   this.optionsCopy = this.options;
  if (!this.label) throw "Label dosen't existe";
  },
  methods: {
    removeSearch(event) {
      if (event.target.value.length <= 1 && event.keyCode == 8) {
        this.search_suggestion = "";
      }
    },
    clearInput() {
      this.value = "";
      // this.setSelectedOption(null);
    },
    updateValue(event) {
      this.value = event.target.value;
      this.optionsCopy = this.options.filter(function({ name }) {
        return new RegExp("^" + event.target.value, "i").test(name);
      });
    },
    setSelectedOption(option) {
      if(!this.tab){if (option) this.value = option.name;}
      this.$emit("input", option);
    },
    focused() {
      this.show_options = true;
    },
    blured() {
        if(!this.stopBlured){
      this.show_options = false;
      if (this.select) {
        if(!this.tab){
          let sourceOption = this.optionsCopy.find(
            option => option.name.toUpperCase() == this.value.toUpperCase()
          );
          if (sourceOption) this.setSelectedOption(sourceOption);
          else this.value = "";
          this.optionsCopy = this.options;
        }else{
          if(this.value)this.setSelectedOption({name:this.value});
        }
      } else {
          this.$emit("input", { [this.label]: this.value });
      }
    }else{
      this.show_options = false;
    }
    }
  },
  watch: {
    options: function(options) {
      this.optionsCopy = options;
    }
  },


};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
}
.empty_list_container {
  padding: 0.5em 0;
  font-size: 12px;
  font-weight: bold;
}
.arrow_ico,
.coptionse_ico {
  position: absolute;
  width: 14px;
  right: 12px;
  top: 12px;
  fill: rgba(5, 5, 5, 0.70196);
  transition: all 0.2s;
}
.close_ico {
  right: 34px;
  width: 10px;
  top: 13px;
  cursor: pointer;
}


/*--------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------*/
.step_icon {
  border: 3px solid grey;
  border-radius: 50%;
  height: 40px;
  width: 40px;
}
.label-massge {
  color: #b2b2b2;
  font-size: 14px;
}
.search_container {
  position: relative;
}
#autocomplete {
  padding: 0.6rem;
  position: absolute;
  z-index: -1;
  font-size: 14px;
  left: 1px;
  top: 0px;
  border: 0;
}
.input_field {
  // border: 0;
  font-size: 14px;
  border: none;
  position: relative;
  padding: 0.6rem 1em;
  border-radius: 5px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  outline: none;
  width: 100%;
  border: 1px solid #00000033;

}
.hidden-Customer {
  opacity: 0;
  visibility: hidden;
}
.list {
  max-height: 235px;
  visibility: hidden;
  transition: all 0.4s;
  opacity: 1;
  overflow: hidden;
  border: 1px solid #00000033;

}
.list-show {
  visibility: visible;
  opacity: 1;
  z-index: 1;
}
.list ul {
  // padding: 4px 0;
  overflow: auto;
  max-height: 207px;
  height: 100%;
  width: 100%;

}
.list li {
  padding: 10px;
  transition: all 0.2s;
  cursor: pointer;
  font-size: 12px;
}
.list li:hover {
  background: #049ce2;
  color: #fff;
}
/* width */
.list ul::-webkit-scrollbar {
  width: 5px;
  border-radius: 10px;
}

/* Track */
.list ul::-webkit-scrollbar-track {
  background: #dadada;
  border-radius: 10px;
}

/* Handle */
.list ul::-webkit-scrollbar-thumb {
  background: #a3a2a2;
  border-radius: 10px;
}

/* Handle on hover */
.list ul::-webkit-scrollbar-thumb:hover {
  background: #797878;
  border-radius: 10px;
}


</style>
