<template>
  <div class="searchDiv">
    <el-form :inline="true" :model="formInline" class="searchfrom">
      <el-form-item label="公司名称:">
        <el-input
          v-model="$store.state.companyName"
          placeholder="关键字"
          style="width:200px"
          clearable
          @clear="onSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">查询</el-button>
      </el-form-item>
      <div class="tag-group">
        <el-tag
          v-for="tag in $store.state.searchDic"
          :key="tag.value"
          closable
          :disable-transitions="true"
          @close="handleClose(tag)"
          effect="dark"
          color="#67C23A"
        >{{tag.value}}</el-tag>
      </div>
    </el-form>
    <hr style="color:darkgrey">
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        companyName: "",
        region: ""
      }
    };
  },
  methods: {
    handleClose(tag) {
      //alert(tag);
      this.$store.commit("delSearchDic", { data: tag, ref: this });
    },
    onSubmit() {
      this.$store.commit("setData", this);
      //alert(this.$store.state.companyName);
      //console.log("submit!");
    }
  }
};
</script>

<style scoped>
.searchDiv {
  width: 70%;
  height: 100px;
  text-align: left;
  padding-left: 40px;
  font-weight: bold;
}
.searchfrom {
  height: 100px;
}
.tag-group {
  text-align: left;
}
.tag-group span {
  box-sizing: border-box;
  margin-left: 20px;
}
input {
  width: 200px;
}
</style>
