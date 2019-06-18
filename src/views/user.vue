<template>
  <div class="login">
    <div class="left"></div>
    <div>
      <ul class="nav">
        <li>
          <el-button type="primary" plain @click="login">登录</el-button>
        </li>
        <li>
          <el-button type="primary" plain @click="register">注册</el-button>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push({
        name: "login"
      });
    },
    register() {
      this.$router.push({
        name: "register"
      });
    }
  }
};
</script>

<style scoped>
.login {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 920px;
  box-align: center;
  box-orient: vertical;
  background-image: url(../img/login-bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  float: left;
}

.content {
  float: left;
  background-color: white;
  font-weight: 400;
  margin-left: 50%;
  margin-top: -4px;
}
.nav {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: inline-block;
  /* border: 1px solid #ccc; */
  margin-left: 50%;
  margin-top: 12%;
  /* background-color: white; */
  border-radius: 4%;
}
.nav li {
  display: inline-block;
  float: left;
}
.nav li:hover {
  /* background-color: #eee; */
}
.nav li span {
  display: block;
  color: #333;
  text-decoration: none;
  padding: 8px 16px;
}
/* .nav li span.active {
  background-color: #eee;
} */
</style>




