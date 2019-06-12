<template>
  <div class="detailC">
    <!-- <div class="Breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <span @click="setCompanyList">首页</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="isShowSection" :to="{ path: '/' }">
          <span
            v-text="$store.state.selectedSection+$store.state.selectedMode"
            @click="setSectionList"
          ></span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span v-text="companyName"></span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>-->
    <div class="contentC">
      <el-button type="success" class="goback" icon="el-icon-arrow-left" @click="goback">返回列表页</el-button>
      <div>
        <h2 v-text="$store.state.selectedItem.companyName"></h2>
        <div>
          <table width="930" style="border:1px solid #999999;margin:0 auto;margin-top:10px;">
            <tr>
              <td class="oddtd">公司全称:</td>
              <td class="eventd" v-text="$store.state.selectedItem.companyName"></td>
              <td class="oddtd">地址：</td>
              <td class="eventd" v-text="$store.state.selectedItem.address"></td>
            </tr>
            <tr>
              <td class="oddtd">联系人：</td>
              <td class="eventd" v-text="$store.state.selectedItem.Contacts"></td>
              <td class="oddtd">电话：</td>
              <td class="eventd" v-text="$store.state.selectedItem.telephone"></td>
            </tr>
            <tr>
              <td class="oddtd">手机：</td>
              <td class="eventd" v-text="$store.state.selectedItem.cellphone"></td>
              <td class="oddtd">邮箱：</td>
              <td class="eventd" v-text="$store.state.selectedItem.email"></td>
            </tr>
            <tr>
              <td class="oddtd">传真：</td>
              <td class="eventd" v-text="$store.state.selectedItem.fax"></td>
              <td class="oddtd">经营类型：</td>
              <td class="eventd" v-text="$store.state.selectedItem.modeName"></td>
            </tr>
          </table>
        </div>

        <h4>公司简介</h4>
        <p v-text="$store.state.selectedItem.conpanyDescribe"></p>
        <h4>产品列表</h4>
        <div>
          <ul>
            <li v-for="item in $store.state.selectedItem.products">
              <span v-text="item.title"></span>
            </li>
          </ul>
        </div>
        <h4>主营产品</h4>
        <div class="carousel">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in $store.state.selectedItem.products" :key="item">
              <div>
                <img :src="item.imgurl" :alt="item.title">
                <h5>{{ item.title }}</h5>
              </div>
            </el-carousel-item>
          </el-carousel>
          <!-- <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in $store.state.selectedItem.products" :key="item">
              <div class="medium">
                <img :src="item.imgurl" :alt="item.title">
                <h5>{{ item.title }}</h5>
              </div>
            </el-carousel-item>
          </el-carousel>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowSection: false,
      companyName: ""
    };
  },
  mounted: function() {
    if (
      this.$store.state.selectedSection + this.$store.state.selectedMode ==
      ""
    ) {
      this.isShowSection = false;
    } else this.isShowSection = true;
    let compy = this.$store.state.companyList.filter(
      item => item.path == this.$route.params.companyID
    )[0];
    this.companyName = compy.companyName;
  },
  methods: {
    setCompanyList() {
      this.$router.push({
        name: "home"
      });
      this.$store.commit("setCompanyList", {
        path: this.$route.path,
        ref: this
      });
    },
    setSectionList() {
      this.$router.push({
        name: "home"
      });
      this.$store.commit("setSectionlist", {
        path:
          this.$store.state.selectedSection + this.$store.state.selectedMode,
        ref: this
      });
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.detailC {
  min-height: 700px;
  width: 100%;
  text-align: center;
}
.contentC {
  width: 60%;
  padding-left: 20%;
  padding-right: 20%;
  text-align: left;
}
h2 {
  text-align: center;
}
.oddtd {
  width: 70px;
  font-weight: bold;
  font-size: 14px;
  text-align: right;
}
.eventd {
  width: 360px;
  font-size: 14px;
}
.carousel {
  text-align: center;
}
.carousel img {
  padding-top: 30px;
}
.el-carousel__item div {
  display: box;
  box-align: center;
  box-orient: vertical;
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item h5 {
  text-align: center;
  color: black;
  font-size: 18px;
  opacity: 0.75;
  line-height: -200px;
  font-size: 18px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>


