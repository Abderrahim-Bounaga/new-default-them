import Vue from 'vue'

Vue.filter('formatPrice', (value) => {
  return value.toFixed(2);
});
