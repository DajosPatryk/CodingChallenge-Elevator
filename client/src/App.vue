<template>
  <div id="app-container">
    <router-view class="tenant component-content" />
  </div>
</template>
<script>
export default {
};
</script>
<style lang="scss">
@import "style/appStyling.scss";

#app {
  position: fixed;
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.component-content {
  position: relative;
  height: 100%;
}

#app-container {
  height: 100vh;
  overflow-y: hidden;
}
</style>
