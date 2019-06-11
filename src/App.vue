<template>
  <div id="app">
    <div class="headerC">
      <headerDiv></headerDiv>
    </div>
    <div class="centerC">
      <router-view/>
    </div>
    <footer>
      <footerDiv></footerDiv>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import footerDiv from "@/views/footer.vue";
import headerDiv from "@/views/header.vue";
export default {
  name: "home",
  components: {
    headerDiv,
    footerDiv
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
.headerC {
  height: 10%;
  width: 100%;
  float: left;
  font-size: 24px;
  font-weight: bolder;
  background-color: #409eff;
  color: white;
}
.centerC {
  float: left;
  width: 100%;
  height: 80%;
  text-align: center;
}
.contentC {
  background-color: white;
  float: left;
}
.footerC {
  height: 10%;
  width: 100%;
  text-align: center;
  background-color: #409eff;
  color: white;
}
</style>

