<template>
  <div class="centerC">
    <div class="navC">
      <navleft></navleft>
    </div>
    <div class="comC">
      <searchDiv class="searchC"></searchDiv>
      <!-- <companyList class="listC"></companyList> -->
      <!-- <router-view class="listC"></router-view> -->
      <div class="mainDiv">
        <div>
          <table>
            <td>
              <div v-if="$store.state.totalItemNum === 0" class="tipC">未检索到数据</div>
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
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import navleft from "@/views/nav.vue";
import searchDiv from "@/views/search.vue";
import companyList from "@/views/companyList.vue";
export default {
  name: "home",
  components: {
    navleft,
    searchDiv
  },
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
        var queryParmas = JSON.parse(sessionObj);
        this.$store.state.selectedSection = queryParmas.sectionName;
        this.$store.state.selectedMode = queryParmas.modeName;
        this.$store.state.companyName = queryParmas.companyName;
        this.$store.state.searchDic = JSON.parse(queryParmas.searchDic);
        this.$store.state.startIndex = parseInt(queryParmas.startIndex);
        this.$store.state.endIndex = parseInt(queryParmas.endIndex);
        this.$store.state.currentPage = parseInt(queryParmas.currentPage);
        this.$store.state.totalItemNum = parseInt(queryParmas.totalItemNum);
        this.$store.state.pageSize = parseInt(queryParmas.pageSize);
        this.$store.commit("setData2", this);
      } else {
        if (
          this.$store.state.selectedSection == "" &&
          this.$store.state.selectedMode == "" &&
          this.$store.state.companyName == ""
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
        companyName: this.$store.state.companyName,
        searchDic: JSON.stringify(this.$store.state.searchDic),
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
        companyName: this.$store.state.companyName,
        searchDic: JSON.stringify(this.$store.state.searchDic),
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
        companyName: this.$store.state.companyName,
        searchDic: JSON.stringify(this.$store.state.searchDic),
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
        companyName: this.$store.state.companyName,
        searchDic: JSON.stringify(this.$store.state.searchDic),
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
        companyName: this.$store.state.companyName,
        searchDic: JSON.stringify(this.$store.state.searchDic),
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
  padding: 0px;
}
.comC {
  float: left;
  min-height: 700px;
  margin-left: 0px;
  margin-right: 0px;
  height: 100%;
  width: 70%;
}
.searchC {
  float: left;
  margin-left: 0px;
  width: inherit;
  height: 100px;
}
.listC {
  float: left;
  margin-left: 0px;
  width: inherit;
  height: auto;
}

.mainDiv {
  float: left;
  width: inherit;
  text-align: left;
  height: 100%;
  padding-left: 40px;
  box-orient: vertical;
}
.mainDiv table {
  min-height: 500px;
}
.tipC {
  margin-top: 20px;
  float: left;
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
  height: 40 px;
  font-size: 15px;
  margin-top: 2px;
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
  float: left;
  text-align: left;
  padding-left: 30px;
  box-align: end;
}
</style>

