<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属父内">
      <el-select v-model="form.category_id" placeholder="请选择所属内别">
        <el-option-group v-for="(item,index) in categorys" :key="index" :label="item.title">
          <el-option
            v-for="(subItem, subIndex) in item.group"
            :key="subIndex"
            :label="subItem.title"
            :value="subItem.category_id"
          ></el-option>
        </el-option-group>
      </el-select>
    </el-form-item>

    <el-form-item label="排序数字">
      <el-input v-model="form.sort_id" class="inputWidth"></el-input>
    </el-form-item>

    <el-form-item label="类别名称">
      <el-input v-model="form.title" class="inputWidth"></el-input>
    </el-form-item>

    <el-form-item label="类别级别">
      <el-input v-model="form.class_layer" class="inputWidth"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="$router.back()">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        category_id: "", //所属父内
        title: "", //类别名称
        class_layer: "", //类别级别
        sort_id: "" //排序数字
      }, // 分类数据
      categorys: []
    };
  },
  // 分类数据
  mounted() {
    this.$axios({
      method: "get",
      url: `/admin/category/getlist/goods`
    }).then(res => {
      console.log(res.data);
      const { message } = res.data;
      // this.categorys = message;
      let options = [];

      message.forEach(v => {
        if (v.parent_id == 0) {
          v.group = [];
          options.push(v);
        } else {
          options.forEach(item => {
            if (v.parent_id == item.category_id) {
              item.group.push(v);
            }
          });
        }
      });
      this.categorys = options;
    });
  },

  methods: {
    //提交
    onSubmit() {
      this.$axios({
        method: "post",
        url: `/admin/category/add/goods`,
        data: this.form,
        // 处理跨域
        withCredentials: true
      }).then(res => {
        const { status, message } = res.data;
        if (status == 0) {
          this.$message({
            message: message,
            type: "success"
          });
          setTimeout(() => {
            this.$router.replace("/admin/goods-list");
          }, 1000);
        } else {
          this.$message.error("异常信息");
        }
      });
    }
  }
};
</script>
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.inputWidth {
  width: 300px;
}
</style>

