<template>
  <div>
    <el-row type="flex" class="header" justify="space-between" align="middle">
      <i class="el-icon-back" @click="handleToggle"></i>
      <div>vue123</div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleToggle: function() {
      this.$emit("onChange");
    }
  }
};
</script>

<style scoped>
.header {
  height: 60px;
}
.el-icon-back {
  cursor: pointer;
}
</style>
