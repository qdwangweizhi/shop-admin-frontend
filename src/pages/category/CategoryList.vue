<template>
  <div class="category">
    <el-row type="flex" justify="space-between" align="middle" class="mb20">
      <div>
        <!-- 跳转到新增商品 -->
        <el-button @click="handleCategoryAdd">新增</el-button>
      </div>
    </el-row>

    <el-row type="flex" justify="space-between" class="tree-header">
      <span>类别</span>
      <span>排序</span>
      <span>操作</span>
    </el-row>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-input size="mini" v-model="data.sort_id" @blur="handleEnter(data)"/>
        </span>
        <span>
          <el-button type="text" size="mini" @click="() => edit(node, data)">编辑</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.$axios({
      url: "/admin/category/getlist/goods",
      // 处理跨域
      withCredentials: true
    }).then(res => {
      // console.log(res.data);
      let message = res.data.message;

      // 重新排序
      message = message.sort((a, b) => {
        // 如果a的category_id大于B的，那么b数据就排到a的前面
        return a.category_id - b.category_id;
      });

      // 最终的数据要求为数组
      let arr = [];
      // 循环请求回来的数据

      message.forEach(v => {
        // 第一级的parent_id为0  把第一级给arr
        if (v.parent_id === 0) {
          arr.push({
            ...v,
            id: v.category_id,
            label: v.title
          });
        } else {
          // 如果不是顶级分类，通过递归函数去查找父级分类
          loop(arr, v);
        }
      });
      function loop(arr, v) {
        arr.forEach(res => {
          // 最重要的判断，判断item的id是否和父级的category_id相等，
          // 如果相等的话就把item加入到当前分类下children
          if (res.category_id === v.parent_id) {
            // 判断当前的分类是否有children属性
            if (!res.children) {
              //没有的话初始化为空数组
              res.children = [];
            }
            res.children.push({
              ...v,
              id: v.category_id,
              label: v.title
            });
            return;
          }
          //如果不满足上面条件，再次传入
          if (res.children) {
            loop(res.children, v);
          }
        });
      }
      this.data = arr;
      // console.log(this.data);
    });
  },

  methods: {
    edit(node, data) {
      console.log(node, data);
    },
    handleEnter(data) {
      this.$axios({
        method: "post",
        url: `/admin/category/edit/${data.id}`,
        data,
        withCredentials: true
      }).then(res => {
        const { status, message } = res.data;
        // console.log(res.data);
        if (status == 0) {
          this.$message({
            type: "success",
            message
          });
        }
      });
    },
    handleCategoryAdd() {
      this.$router.push("/admin/category-add");
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.tree-header {
  background: #fff;
  padding: 10px;
}
.category .el-input--mini .el-input__inner {
  width: 80px;
  height: 18px !important;
  line-height: 18px !important;
}
</style>