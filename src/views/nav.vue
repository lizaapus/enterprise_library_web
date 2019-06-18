<template>
  <!-- <div class="nav-left"> -->
  <section id="conter">
    <section id="help-left">
      <details class="menu" open>
        <summary>所在地区</summary>
        <ul>
          <li v-for="item in $store.state.sectionList">
            <div @click="setSectionCompanyList(item)" class="itemDiv">
              <span class="itemleft" v-text="item.sectionName"></span>
              <span class="itemright">20</span>
            </div>
          </li>
        </ul>
      </details>
      <details class="menu" open>
        <summary>经营方式</summary>
        <ul>
          <li v-for="item in $store.state.modeList">
            <div @click="setModeCompanyList(item)" class="itemDiv">
              <span v-text="item.modeName" class="itemleft"></span>
              <span class="itemright">20</span>
            </div>
          </li>
        </ul>
      </details>
    </section>
  </section>

  <!-- <el-collapse v-model="activeNames" @change="handleChange" class="collapse">
      <el-collapse-item title="所在地" name="1">
        <el-row>
          <el-col :span="24">
            <div>
              <el-table
                :data="$store.state.sectionList"
                style="width: 100%"
                :show-header="false"
                @row-click="setSectionCompanyList"
              >
                <el-table-column prop="sectionName"></el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="经营方式" name="2">
        <el-row>
          <el-col :span="24">
            <div>
              <el-table
                :data="$store.state.modeList"
                style="width: 100%"
                :show-header="false"
                @row-click="setModeCompanyList"
              >
                <el-table-column prop="modeName"></el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
  </el-collapse>-->
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1", "2"]
    };
  },

  methods: {
    handleChange(val) {
      console.log(val);
    },
    setSectionCompanyList(item) {
      // 命名的路由
      this.$store.commit("setCompanySectionList", {
        sectionName: item.sectionName,
        ref: this
      });

      this.$store.commit("addSearchDic", {
        key: "sectionName",
        value: item.sectionName
      });
      this.$router.push({
        name: "home",
        params: { sectionID: item.path }
      });
      // this.$router.push({
      //   name: "companyList",
      //   params: { sectionID: row.path }
      // });
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
    setModeCompanyList(row) {
      this.$store.commit("setCompanyModeList", {
        modeName: row.modeName,
        ref: this
      });
      this.$store.commit("addSearchDic", {
        key: "modeName",
        value: row.modeName
      });
      this.$router.push({
        name: "home",
        params: { sectionID: row.path }
      });
      // this.$router.push({
      //   name: "companyList",
      //   params: { sectionID: row.path }
      // });
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
  },
  async created() {
    try {
      //const result = await this.$http.get("/api/sectionData");
      this.$store.commit("setSectionList", this);
      this.$store.commit("setModeList", this);
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
<style >
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
#conter {
  padding: 0;
  margin: auto;
  margin-left: 60px;
}
#help-left {
  width: 260px;
  font-family: "microsoft YaHei";
  float: left;
}

.menu {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.menu:last-child {
  border-bottom: 1px solid #ccc;
}

.menu summary {
  height: 40px;
  line-height: 40px;
  text-indent: 10px;
  outline: none;
  font-size: 14px;
  font-weight: 700;
  border-top: 1px solid #ddd;
  background: #f1f1f1;
  color: red;
  cursor: pointer;
  letter-spacing: 2px;
}

.menu summary::-webkit-details-marker {
  display: none;
}
.menu summary:before {
  content: "+";
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  font-size: 18px;
  font-weight: 700;
  margin-left: -190px;
}

.menu[open] summary:before {
  content: "-";
}

.menu ul {
  padding: 10px 0;
}

.menu ul li {
  list-style: none;
  text-indent: 25px;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  font-size: 14px;
}

.menu ul li a {
  display: block;
  color: #666;
}

.menu ul li a:hover {
  text-decoration: underline;
}
.itemDiv {
  cursor: pointer;
  box-orient: horizontal;
  width: 240px;
}

.itemDiv:hover {
  /* background-color: antiquewhite; */
  color: red;
}
.itemleft {
  float: left;
}
.itemright {
  float: right;
}
</style>
