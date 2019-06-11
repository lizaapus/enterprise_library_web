<template>
  <div class="centerC">
    <div class="navC">
      <navleft></navleft>
    </div>
    <div class="comC">
      <searchDiv></searchDiv>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import navleft from "@/views/nav.vue";
import searchDiv from "@/views/search.vue";
//import companyList from "@/views/companyList.vue";
export default {
  name: "home",
  components: {
    navleft,
    searchDiv
  }
};
</script>
<style>
.centerC {
  margin-top: 20px;
  width: 100%;
  height: 100%;
  float: left;
}
.navC {
  float: left;
  height: 100%;
  width: 10%;
  margin-left: 5%;
}
.comC {
  float: left;
  min-height: 670px;
  height: 100%;
  width: 70%;
}
</style>

