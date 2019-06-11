<template>
  <div class="searchDiv">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">查询</el-button>
      </el-form-item>
      <div class="tag-group">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
          effect="dark"
          color="#67C23A"
        >{{tag}}</el-tag>
      </div>
    </el-form>
    <hr style="color:darkgrey">
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    }
  }
};
</script>

<style scoped>
.searchDiv {
  width: 70%;
  text-align: left;
}
.tag-group {
  text-align: left;
}
.tag-group span {
  box-sizing: border-box;
  margin-left: 20px;
}
</style>
