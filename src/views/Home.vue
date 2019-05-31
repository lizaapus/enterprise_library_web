<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="headerC">
      <p>企业信息库</p>
    </div>
    <div class="centerC">
      <div class="navC">
        <navleft></navleft>
      </div>
      <div class="comC">
        <companyList></companyList>
      </div>
    </div>

    <footer class="footerC"></footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import navleft from "@/views/nav.vue";
import companyList from "@/views/companyList.vue";
export default {
  name: "home",
  components: {
    HelloWorld,
    navleft,
    companyList
  }
};
</script>
<style>
.headerC {
  float: left;
  width: 100%;
  height: 10%;
}
.centerC {
  float: left;
  width: 100%;
  height: 80%;
}
.navC {
  float: left;
  height: 100%;
  width: 20%;
}
.comC {
  float: left;
  height: 100%;
  width: 60%;
}
.footerC {
  float: left;
  background-color: gray;
  height: 10%;
  width: 100%;
  background-color: black;
}
</style>

