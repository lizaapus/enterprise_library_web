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
            <div class="companyItemDiv" @dblclick="detailPage(item)">
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
import { truncate } from "fs";
export default {
  data() {
    return {
      flag: false
    };
  },
  async created() {
    try {
      //进入页面判断是否存在缓存
      var sessionObj = sessionStorage.getItem("queryParmas");
      if (sessionObj) {
        //alert(this.$store.state.selectedSection);
        var queryParmas = JSON.parse(sessionObj);
        this.$store.state.selectedSection = queryParmas.sectionName;
        this.$store.state.selectedMode = queryParmas.modeName;
        this.$store.state.startIndex = parseInt(queryParmas.startIndex);
        this.$store.state.endIndex = parseInt(queryParmas.endIndex);
        this.$store.state.currentPage = parseInt(queryParmas.currentPage);
        this.$store.state.totalItemNum = parseInt(queryParmas.totalItemNum);
        this.$store.state.pageSize = parseInt(queryParmas.pageSize);
        this.$store.commit("setData2", this);
      } else {
        if (
          this.$store.state.selectedSection == "" &&
          this.$store.state.selectedMode == ""
        ) {
          this.$store.commit("setCompanyList", {
            path: this.$route.path,
            ref: this
          });
        } else {
          this.$store.commit("setData2", this);
        }
      }
      var queryParmas = {
        sectionName: this.$store.state.selectedSection,
        modeName: this.$store.state.selectedMode,
        startIndex: this.$store.state.startIndex,
        endIndex: this.$store.state.endIndex,
        currentPage: this.$store.state.currentPage,
        totalItemNum: this.$store.state.totalItemNum,
        pageSize: this.$store.state.pageSize
      };
      sessionStorage.queryParmas = JSON.stringify(queryParmas);
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

      var queryParmas = {
        sectionName: "",
        modeName: "",
        startIndex: this.$store.state.startIndex,
        endIndex: this.$store.state.endIndex,
        currentPage: this.$store.state.currentPage,
        totalItemNum: this.$store.state.totalItemNum,
        pageSize: this.$store.state.pageSize
      };
      sessionStorage.queryParmas = JSON.stringify(queryParmas);
    },
    handleSizeChange(val) {
      this.$store.commit("handleSizeChange", { val: val, ref: this });
      var queryParmas = {
        sectionName: this.$store.state.selectedSection,
        modeName: this.$store.state.selectedMode,
        startIndex: this.$store.state.startIndex,
        endIndex: this.$store.state.endIndex,
        currentPage: this.$store.state.currentPage,
        totalItemNum: this.$store.state.totalItemNum,
        pageSize: this.$store.state.pageSize
      };
      sessionStorage.queryParmas = JSON.stringify(queryParmas);
    },
    handleCurrentChange(val) {
      this.$store.commit("handleCurrentChange", { val: val, ref: this });
      var queryParmas = {
        sectionName: this.$store.state.selectedSection,
        modeName: this.$store.state.selectedMode,
        startIndex: this.$store.state.startIndex,
        endIndex: this.$store.state.endIndex,
        currentPage: this.$store.state.currentPage,
        totalItemNum: this.$store.state.totalItemNum,
        pageSize: this.$store.state.pageSize
      };
      sessionStorage.queryParmas = JSON.stringify(queryParmas);
    },
    detailPage(item) {
      this.$store.commit("setSelectedItem", item);
      this.$router.push({
        name: "detail",
        params: {
          companyID: item.path
        }
      });
      var queryParmas = {
        sectionName: this.$store.state.selectedSection,
        modeName: this.$store.state.selectedMode,
        startIndex: this.$store.state.startIndex,
        endIndex: this.$store.state.endIndex,
        currentPage: this.$store.state.currentPage,
        totalItemNum: this.$store.state.totalItemNum,
        pageSize: this.$store.state.pageSize
      };
      sessionStorage.queryParmas = JSON.stringify(queryParmas);
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


