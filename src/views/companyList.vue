<template>
  <div class="mainDiv">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <span v-text="$route.params.sectionName"></span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <table class="contentTable">
        <td>
          <tr v-for="item in $store.state.companyList">
            <div class="companyItemDiv">
              <span v-text="item.companyName"></span>
            </div>
          </tr>
        </td>
      </table>
    </div>

    <div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="$store.state.currentPage"
          :page-sizes="$store.state.pageSizes"
          :page-size="$store.state.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="$store.state.totalItemNum"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    try {
      this.$store.commit("setCompanyList", this);
    } catch (e) {
      console.log(e);
    }
  },
   methods: {
      handleSizeChange(val) {
        this.$store.commit("handleSizeChange", {val:val,ref:this});
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.$store.commit("handleCurrentChange", {val:val,ref:this});
      }
    },
};
</script>
<style scoped>
</style>


