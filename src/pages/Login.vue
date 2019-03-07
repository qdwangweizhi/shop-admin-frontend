<template>
  <div class="login-from">
    <div class="login-form-header">登录</div>
    <el-form :model="formData" status-icon label-width="100px">
      <el-form-item label="账号">
        <el-input v-model="formData.uname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.upwd" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">提交</el-button>
        <el-button @click="resetData('formData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        uname: "admin",
        upwd: "123456"
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$axios({
        url: "/admin/account/login",
        method: "POST",
        data: this.formData
        // 处理跨域
        // withCredentials: true
      }).then(res => {
        console.log(res.data);
        const { status, message } = res.data;
        if (status == 1) {
          this.$message.error(message);
        } else {
          this.$message({
            message: "登录成功",
            type: "success"
          });
          // 退回上一页
          setTimeout(() => {
            this.$router.back();
          }, 1000);
        }
      });
    },

    // 点击重置
    resetData(formName) {
      this.formData = {
        uname: "",
        upwd: ""
      };
    }
  }
};
</script>
   
<style>
.login-from {
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -200px 0 0 -250px;
}
.login-form-header {
  color: #66b1ff;
  text-align: center;
  line-height: 2;
  margin-bottom: 20px;
  padding-left: 60px;
}
</style>
