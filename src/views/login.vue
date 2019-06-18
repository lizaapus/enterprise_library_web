<template>
  <div class="loginR">
    <!-- <img src="@/img/s.gif" alt> -->
    <h2>用户登录</h2>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      :size="medium"
    >
      <el-form-item label="用户名：" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        checkPass: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    async submitForm(formName) {
      let flag = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          flag = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      if (flag) {
        try {
          const result = await this.$http.get("/api/login", {
            params: {
              username: this.ruleForm.username,
              password: this.ruleForm.checkPass
            }
          });
          if (result.code == "0") {
            this.$store.commit("settoken", result.token);
            window.localStorage.setItem("token", result.token);

            this.$router.push({
              name: "home"
            });
          } else {
            this.$message({
              showClose: true,
              message: result.message,
              type: "error"
            });
          }
        } catch (err) {
          //console.log(err);
          this.$message({
            showClose: true,
            message: result.message,
            type: "error"
          });
        }
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.loginR {
  float: left;
  height: 280px;
  width: 400px;
  background-color: white;
  font-weight: 400;
  margin: 0;
  padding: 0;
  padding-right: 30px;
}
.loginR h2 {
  margin: 25px;
}
</style>




