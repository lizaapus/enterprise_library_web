<template>
  <div class="nav-left">
    <el-collapse v-model="activeNames" @change="handleChange" class="collapse">
      <el-collapse-item title="所在地" name="1">
        <el-row>
          <el-col :span="24">
            <div class="sectionDiv">
              <ul>
                <li v-for="section in $store.state.sectionList">
                  <div class="sectionDiv" @click="setSectionCompanyList(section)">
                      <span v-text="section.sectionName"></span>
                    </div>
                  <!-- <router-link
                    :to="{name:'compantList',params:{path:section.path,sectionName:section.sectionName}}"
                    class="linkStyle"
                  >
                    
                  </router-link> -->
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="经营方式" name="2">
        <el-row>
          <el-col :span="24">
            <div class="sectionModeDiv">
              <ul>
                 <li v-for="mode in $store.state.modeList">
                  <router-link
                    :to="{name:'modeList',params:{path:mode.path,modeName:mode.modeName}}"
                    class="linkStyle"
                  >
                    <div class="sectionDiv" @click="setModeCompanyList(mode)">
                      <span v-text="mode.modeName"></span>
                    </div>
                  </router-link>
                </li>
                <!-- <li v-for="mode in modes">
                  <router-link
                    :to="{name:'compantList',params:{path:mode.path,sectionName:mode.name}}"
                    class="linkStyle"
                  >
                    <div class="sectionDiv">
                      <span v-text="mode.name"></span>
                    </div>
                  </router-link>
                </li> -->
              </ul>
            </div>
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
    setSectionCompanyList(item) {
      this.$store.commit("setCompanySectionList", {sectionName:item.sectionName,ref:this});
    },
    setModeCompanyList(item){
      this.$store.commit('setCompanyModeList',{modeName:item.modeName,ref:this})
    }
  },
  async created() {
    try {
      //const result = await this.$http.get("/api/sectionData");
      this.$store.commit("setSectionList", this);
      this.$store.commit('setModeList',this);
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
  background-color: white;
  /* background-color: rgb(191, 216, 218); */
  color: black;
}
.nav-left ul {
  padding: 0px;
  margin-left: 10px;
}
.nav-left li {
  list-style: none;
  text-align: center;
  border-bottom-color: bisque;
  padding: 10px;
}

.sectionDiv ul li {
  list-style: none;
  width: 20%;
  /* border: 1px solid #e5e9f2; */
  height: auto;
  overflow: hidden;
  background-color: white;
  padding: 2px;
  float: left;
  cursor: pointer;
}

.sectionModeDiv ul li {
  list-style: none;
  width: 20%;
  /* border: 1px solid #e5e9f2; */
  height: 70px;
  width: 70px;
  overflow: hidden;
  background-color: white;
  padding: 2px;
  float: left;
  cursor: pointer;
}

.sectionDiv {
  list-style: none;
  float: left;

  border: 1px solid #d3dce6;
  margin: 5px;
  padding: 5px;
  background-color: #ffffff;
}
</style>
