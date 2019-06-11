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
      <table>
        <td>
          <tr class="trC" v-for="item in $store.state.companyList">
            <div class="companyItemDiv" @dblclick="detailPage(item)">
              <div class="imgC">
                <a :href="item.companyUrl" target="_blank">
                  <img :src="item.companyImgUrl">
                </a>
              </div>
              <div class="detaiC">
                <p class="detail1C">
                  <a :href="item.companyUrl" v-text="item.companyName" target="_blank"></a>
                </p>

                <p class="detail2C" v-text="item.conpanyDescribe"></p>
                <p class="detail3C">
                  <span class="detail4c">
                    经营方式：
                    <span v-text="item.modeName"></span>
                  </span>
                  <span class="detail4c">
                    所在地：
                    <span v-text="item.sectionName"></span>
                  </span>
                </p>
              </div>
              <!-- <div class="productListC">
                <div class="productC">
                  <p>
                    <a>
                      <img class="imgP" :src="item.companyImgUrl">
                    </a>
                  </p>
                  <p class="imgP2">产品1</p>
                </div>
                <div class="productC">
                  <p>
                    <a>
                      <img class="imgP" :src="item.companyImgUrl">
                    </a>
                  </p>
                  <p class="imgP2">产品2</p>
                </div>
                <div class="productC">
                  <p>
                    <a>
                      <img class="imgP" :src="item.companyImgUrl">
                    </a>
                  </p>
                  <p class="imgP2">产品3</p>
                </div>
                <div class="productC">
                  <p>
                    <a>
                      <img class="imgP" :src="item.companyImgUrl">
                    </a>
                  </p>
                  <p class="imgP2">产品4</p>
                </div>
              </div>-->
            </div>
          </tr>
        </td>
      </table>
    </div>
    <div>
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
  width: inherit;
  text-align: left;
  height: 100%;
  padding-left: 40px;
}
.companyItemDiv {
  margin-top: 10px;
  width: inherit;
}
.trC {
  margin-top: 10px;
  height: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.imgC {
  float: left;
  width: 100px;
  height: 100px;
  border: 1px solid darkgray;
  margin-bottom: 10px;
  margin-right: 10px;
}
.detaiC {
  margin-left: 10px;
  float: left;
  width: 80%;
}
.detaiC p {
  margin-bottom: 3px;
}
.detail1C {
  height: 21px;
  font-size: 18px;
  margin-top: 0px;
}
.detail2C {
  height: 40px;
  font-size: 16px;
  margin-top: 0px;
  color: gray;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.detail3C {
  height: 15px;
  font-size: 13px;
  font-weight: bold;
  text-align: left;
}
.detail4c {
  border: 1px grey solid;
  margin-right: 40px;
  padding: 2px;
}
.productC {
  float: left;
  height: 110px;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.productC ul {
  margin: 0px;
  padding: 0px;
  list-style: none;
}
.productC li {
  float: left;
  list-style: none;
}

.imgP {
  border: 1px grey solid;
  margin-top: -15px;
  margin-left: 10px;
  float: left;
  width: 70px;
  height: 70px;
}
.imgP2 {
  margin-top: -10px;
  margin-left: 30px;
  font-size: 14px;
}

.footer {
  text-align: left;
  padding-left: 30px;
}
</style>


