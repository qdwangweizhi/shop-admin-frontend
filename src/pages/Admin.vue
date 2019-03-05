<template>
  <div class="admin-form">
    <el-container>
      <!-- 左侧 -->
      <el-aside width="auto">
        <!-- 预留存放logo的位置 -->
        <div class="logo"></div>
        <app-aside :isCollapse="isCollapse"></app-aside>
      </el-aside>

      <el-container>
        <el-header>
          <app-header @onChange="changeCollapse"></app-header>
        </el-header>
        <el-main>
          <app-breadcrumb></app-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header";
import Aside from "../components/Aside";
import Breadcrumb from "../components/Breadcrumb";

export default {
  name: "admin-index",
  data() {
    return {
      isCollapse: false
    };
  },
  components: {
    "app-aside": Aside,
    "app-header": Header,
    "app-breadcrumb": Breadcrumb
  },
  methods: {
    changeCollapse: function() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style>
.logo {
  height: 60px;
  background: #454f5a;
}
.admin-form {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  display: flex;
  flex-direction: column;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.el-container {
  height: 100%;
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
