<template>
  <div class="centerC">
    <div class="navC">
      <navleft></navleft>
    </div>
    <div class="comC">
      <searchDiv class="searchC"></searchDiv>
      <router-view class="listC"></router-view>
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
  margin-top: 10px;
  width: 100%;
  height: 100%;
  float: left;
}
.navC {
  float: left;
  height: 100%;
  width: 15%;
  margin-left: 15%;
}
.comC {
  float: left;
  min-height: 670px;
  margin-left: 0px;
  margin-right: 0px;
  height: 100%;
  width: 70%;
}
.searchC {
  float: left;
  margin-left: 0px;
  width: inherit;
}
.listC {
  float: left;
  margin-left: 0px;
  width: inherit;
}
</style>

