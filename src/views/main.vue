<template>
  <div id="main">
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
#main {
  margin: 0px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.headerC {
  height: 10%;
  width: 100%;
  float: left;
  font-size: 24px;
  font-weight: bolder;
  background-color: #323649;
  color: white;
}
.centerC {
  float: left;
  height: 80%;
  text-align: center;
}
.contentC {
  background-color: white;
  float: left;
}
.footerC {
  height: 10%;
  text-align: center;
  background-color: #323649;
  color: white;
}
</style>


