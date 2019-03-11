<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-row>
        <el-button @click="handleToGoodsAdd">增加</el-button>
        <el-button @click="handleDelete(idsStr)">删除</el-button>
      </el-row>
      <div>
        <el-input placeholder="请输入内容" class="input-with-select" v-model="searchValue">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>
    <!-- 展示内容 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      class="mt20 mb20"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- 标题 -->
      <el-table-column label="标题" width="280">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl" class="goods-img">
            <span>{{ scope.row.title }}</span>
          </el-row>
        </template>
      </el-table-column>
      <!-- 内型 -->
      <el-table-column label="内型" width="180" prop="categoryname"></el-table-column>
      <el-table-column label="价格" width="180">
        <!-- 自定义模板, slot-scope属性可以获取当前每一行数据，数据是一个对象，scoped.row可获取该对象-->
        <template slot-scope="scope">
          <span>{{scope.row.market_price}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- 当前页数current-page
    每页显示个数选择器page-sizes
    每页显示条目个数 page-size-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      // 当前的页面
      pageIndex: 1,
      // 当前显示的条数
      pageSize: 5,
      // 搜索条件
      searchValue: "",
      // 数据总条数
      totalCount: 0,
      // 保存要删除的商品
      idsStr: ""
      //编辑商品的id、
    };
  },
  // 请求商品数据
  mounted() {
    this.getList();
  },

  methods: {
    // 封装 分页数据请求
    getList() {
      this.$axios
        .get(
          `/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${
            this.pageSize
          }&searchvalue=${this.searchValue}`
        ) // 获取数据 然后执行
        .then(res => {
          // 获取返回的数据
          const { data } = res;
          // console.log(data);
          // 表格的数据
          this.tableData = data.message;
          // 修改总条数
          this.totalCount = data.totalcount;
        });
    },
    //编辑
    handleEdit(index, row) {
      // console.log(row.id);
      this.$router.push(`goods-edit/${row.id}`);
    },
    // 删除
    handleDelete(idsStr) {
      // console.log(idsStr);
      this.$axios.get(`/admin/goods/del/${idsStr}`).then(res => {
        const { message, status } = res.data;
        if (status === 0) {
          this.$message({
            message: message,
            type: "success"
          });
          this.getList();
        }
      });
    },
    // 分页 每页几条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // 当前页数
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    handleSelectionChange(data) {
      const ids = data.map(v => {
        return v.id;
      });
      const arr = ids.join(",");
      this.idsStr = arr;
    },
    handleToGoodsAdd() {
      this.$router.push("/admin/goods-add");
    },
    handleSearch() {
      this.pageIndex = 1;
      this.getList();
    }
  }
};
</script>

<style scoped>
.goods-img {
  width: 64px;
  height: 64px;
  display: block;
  margin-right: 10px;
  flex-shrink: 0;
}
</style>
