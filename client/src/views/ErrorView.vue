<template>
  <div class="error-screen">
    <div class="error-container center text-center">
      <div><h2 class="tenant text--xl">{{ code }}</h2></div>
      <div><span>{{ message }}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorView",
  props: {
    code: Number,
    message: String
  }
};
</script>
<style lang="scss">
.error-screen {
  position: fixed;
  width: 100%;
  height: 100%;
}

.error-container {
  position: absolute;
  margin:auto;
}
</style>
