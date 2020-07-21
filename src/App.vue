<template>
  <div id="app">
    <div id="content">
      <router-view></router-view>
      <!-- <router-view name="content"></router-view>
      <router-view name="footer"></router-view>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  text-align: center;
}
#header {
  height: 20%;
}
#content {
  height: 60%;
}
#root {
  height: 20%;
}
</style>
