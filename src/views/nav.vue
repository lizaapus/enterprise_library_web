<template>
  <div class="nav-left">
    <el-collapse v-model="activeNames" @change="handleChange" class="collapse">
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
            <!-- <div class="sectionDiv">
              <ul>
                <li v-for="section in $store.state.sectionList">
                  <div class="sectionDiv" @click="setSectionCompanyList(section)">
                    <span v-text="section.sectionName"></span>
                  </div>
                  <router-link
                    :to="{name:'compantList',params:{path:section.path,sectionName:section.sectionName}}"
                    class="linkStyle"
                  >
                    
                  </router-link>
                </li>
              </ul>
            </div>-->
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

            <!-- <div class="sectionModeDiv">
              <ul>
                <li v-for="mode in $store.state.modeList">
                  <div class="sectionDiv" @click="setModeCompanyList(mode)">
                    <span v-text="mode.modeName"></span>
                  </div>
                  <router-link
                    :to="{name:'modeList',params:{path:mode.path,modeName:mode.modeName}}"
                    class="linkStyle"
                  >
                    <div class="sectionDiv" @click="setModeCompanyList(mode)">
                      <span v-text="mode.modeName"></span>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>-->
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1"]
    };
  },

  methods: {
    handleChange(val) {
      console.log(val);
    },
    setSectionCompanyList(row, event, column) {
      // 命名的路由
      this.$store.commit("setCompanySectionList", {
        sectionName: row.sectionName,
        ref: this
      });

      this.$router.push({
        name: "companyList",
        params: { sectionID: row.path }
      });
    },
    setModeCompanyList(row, event, column) {
      this.$store.commit("setCompanyModeList", {
        modeName: row.modeName,
        ref: this
      });
      this.$router.push({
        name: "companyList",
        params: { sectionID: row.path }
      });
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
<style scoped>
.nav-left {
  height: 100%;
  width: 100%;
  float: left;
  background-color: yellow;
  /* background-color: rgb(191, 216, 218); */
  color: black;
}
.nav-left ul {
  padding: 0px;
  margin-left: 10px;
  float: left;
}
.nav-left li {
  list-style: none;
  text-align: center;
  border-bottom-color: bisque;
  padding: 10px;
  float: left;
}
</style>
