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
          <div class="image__lazy">
            <table>
              <ul>
                <li v-for="item in $store.state.selectedItem.products">
                  <div class="wrap">
                    <a>
                      <el-image :key="item.imgurl" :src="item.imgurl" :fit="fill" alt lazy></el-image>
                      <p>
                        <b v-text="item.title"></b>
                      </p>
                    </a>
                  </div>
                </li>
              </ul>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //isShowSection: false//面包屑
    };
  },
  mounted: function() {
    //面包屑
    // if (
    //   this.$store.state.selectedSection + this.$store.state.selectedMode ==
    //   ""
    // ) {
    //   this.isShowSection = false;
    // } else this.isShowSection = true;
    // let compy = this.$store.state.companyList.filter(
    //   item => item.path == this.$route.params.companyID
    // )[0];
    // this.companyName = compy.companyName;
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
  margin-bottom: 40px;
}

.image__lazy {
  height: 360px;
  overflow: auto;
  display: block;
}
.image__lazy li {
  list-style: none;
  float: left;
  margin-right: 10px;
}

.wrap {
  width: 220px;
  height: 330px;
  position: relative;
  overflow: hidden;
  font-family: arial, sans-serif;
  border: 0;
  margin: 0 10px;
  float: left;
  display: inline;
}
.wrap a {
  display: block;
  width: 220px;
  height: 270px;
  text-decoration: none;
  color: #000;
}

.wrap p {
  display: block;
  width: 220px;
  height: 270px;
  position: absolute;
  left: 0;
  top: 270px;
  z-index: 1;
  background: transparent;
  font-size: 12px;
  color: #fff;
  padding: 0;
  margin: 0;
  line-height: 16px;
  -webkit-transition: all 0.6s ease-in-out;
}
.wrap p b {
  display: block;
  font-size: 16px;
  color: darkslategrey;
  text-align: center;
  margin: 0;
  padding: 0;
  line-height: 30px;
}
.wrap a:hover {
  direction: ltr;
}
.wrap a:hover i {
  top: 0;
}
.wrap a:hover p {
  top: 250px;
}
.clear {
  clear: left;
}
</style>


