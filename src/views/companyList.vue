<template>
  <div class="mainDiv">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <span @click="setCompanyList">首页</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span v-text="$store.state.selectedSection+$store.state.selectedMode"></span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <table class="contentTable">
        <td>
          <tr v-for="item in $store.state.companyList">
            <div class="companyItemDiv" @click="detailPage(item)">
              <div class="imgC">
                <a :href="item.companyUrl" target="_blank">
                  <img :src="item.companyImgUrl">
                </a>
              </div>
              <div class="detailC">
                <p>
                  <a :href="item.companyUrl" v-text="item.companyName" target="_blank"></a>
                </p>
                <p>
                  经营方式：
                  <span v-text="item.modeName"></span>
                </p>
                <p>
                  所在地：
                  <span v-text="item.sectionName"></span>
                </p>
              </div>
              <!-- <span v-text="item.companyName"></span> -->
            </div>
          </tr>
        </td>
      </table>
    </div>

    <footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="$store.state.currentPage"
        :page-sizes="$store.state.pageSizes"
        :page-size="$store.state.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="$store.state.totalItemNum"
      ></el-pagination>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    };
  },
  async created() {
    try {
      // alert(this.$route.path);
      this.$store.commit("setCompanyList", {
        path: this.$route.path,
        ref: this
      });
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    setCompanyList() {
      this.$router.push({
        name: "home"
      });
      this.flag = false;
      this.$store.commit("setCompanyList", {
        path: this.$route.path,
        ref: this
      });
    },
    handleSizeChange(val) {
      this.$store.commit("handleSizeChange", { val: val, ref: this });
    },
    handleCurrentChange(val) {
      this.$store.commit("handleCurrentChange", { val: val, ref: this });
    },
    detailPage(item) {
      this.$store.commit("setSelectedItem", item);
      this.$router.push({
        name: "detail",
        params: {
          companyID: item.path
        }
      });
    }
  }
};
</script>
<style scoped>
.mainDiv {
  width: 100%;
  height: 100%;
  margin-left: 50px;
}
.contentTable {
}
.block {
  flood-opacity: 0%;
  margin-bottom: 30px;
  /* height: 1000px;
  float: left;
  vertical-align: bottom; */
}
.imgC {
  float: left;
}
.detailC {
  float: left;
}
</style>


