<template>
  <div class="detailC">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <span @click="setCompanyList">首页</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="isShowSection" :to="{ path: '/' }">
          <span
            v-text="$store.state.selectedSection+$store.state.selectedMode"
            @click="setSectionList"
          ></span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span v-text="companyName"></span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <h2 v-text="$store.state.selectedItem.companyName"></h2>
      <p>
        <span>公司简介</span>
      </p>
      <p v-text="$store.state.selectedItem.conpanyDescribe"></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowSection: false,
      companyName: ""
    };
  },
  mounted: function() {
    if (
      this.$store.state.selectedSection + this.$store.state.selectedMode ==
      ""
    ) {
      this.isShowSection = false;
    } else this.isShowSection = true;
    let compy = this.$store.state.companyList.filter(
      item => item.path == this.$route.params.companyID
    )[0];
    this.companyName = compy.companyName;
  },
  methods: {
    setCompanyList() {
      this.$router.push({
        name: "home"
      });
      this.$store.commit("setCompanyList", {
        path: this.$route.path,
        ref: this
      });
    },
    setSectionList() {
      this.$router.push({
        name: "home"
      });
      this.$store.commit("setSectionlist", {
        path:
          this.$store.state.selectedSection + this.$store.state.selectedMode,
        ref: this
      });
    }
  }
};
</script>

