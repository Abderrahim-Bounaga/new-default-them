<template>
  <div class="loading h-f">
    <span class="loading-icon"></span>
  </div>
</template>

<script>
export default {
  // mounted() {
  // },

  props: ["isLoading"],
};
</script>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-icon {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 2px solid var(--primary-color);
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  line-height: 56px;
  box-sizing: border-box;
  border-radius: 50%;
  background-color: #fff;
  outline: none;
  transition: all ease 0.5s;
  border-left-color: #fff;
}
.loading-icon {
  animation: rotation 1s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
